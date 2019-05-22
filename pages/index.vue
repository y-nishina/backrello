<template>
  <div class="main">
    <template v-if="loggedInFlag">
      <el-row>
        <el-col :span="4">
          <h2>課題一覧</h2>
        </el-col>
        <el-col :span="20">
          <el-form>
            <el-form-item label="プロジェクト">
              <el-select
                v-model="selectedProjectId"
                @change="onChangeSearchConditions"
              >
                <el-option
                  v-for="project in projectList"
                  :key="project.id"
                  :label="project.name"
                  :value="project.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <el-form label-position="top">
            <el-form-item label="カテゴリー">
              <el-select
                v-model="selectedCategoryIdList"
                multiple
                @change="onChangeSearchConditions"
              >
                <el-option label="未設定" value="-1"> </el-option>
                <el-option
                  v-for="category in categoryList"
                  :key="category.id"
                  :label="category.name"
                  :value="category.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4">
          <el-form label-position="top">
            <el-form-item label="マイルストーン">
              <el-select
                v-model="selectedMilestoneIdList"
                multiple
                @change="onChangeSearchConditions"
              >
                <el-option label="未設定" value="-1"> </el-option>
                <el-option
                  v-for="milestone in milestoneList"
                  :key="milestone.id"
                  :label="milestone.name"
                  :value="milestone.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4">
          <el-form label-position="top" :inline="true">
            <el-form-item label="担当者">
              <el-select
                v-model="selectedAssigneeIdList"
                multiple
                @change="onChangeSearchConditions"
              >
                <el-option label="未設定" value="-1"> </el-option>
                <el-option
                  v-for="assignee in assigneeList"
                  :key="assignee.id"
                  :label="assignee.name"
                  :value="assignee.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4">
          <el-form
            label-position="top"
            :inline="true"
            @submit.native.prevent="onChangeSearchConditions"
          >
            <el-form-item label="キーワード">
              <el-input v-model="inputKeyword" placeholder="キーワードを入力">
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <template v-for="status in statusList">
          <el-col :key="status.id" :span="20 / statusList.length">
            <Issues
              v-bind="{
                statusId: status.id,
                statusName: status.name,
                projectId: selectedProjectId,
                categoryIdList: selectedCategoryIdList,
                milestoneIdList: selectedMilestoneIdList,
                assigneeIdList: selectedAssigneeIdList,
                keyword: inputKeyword
              }"
              @update="updateStatusList()"
            ></Issues>
          </el-col>
        </template>
      </el-row>
    </template>
    <template v-else>
      <!-- TODO：未ログインの場合に一瞬チラッと見える画面をどうするか検討する -->
      &nbsp;
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Issues from '~/components/issues'
export default {
  components: {
    Issues
  },
  data() {
    return {
      loggedInFlag: false,
      statusList: [],
      projectList: [],
      selectedProjectId: null,
      categoryList: [],
      selectedCategoryIdList: [],
      milestoneList: [],
      selectedMilestoneIdList: [],
      assigneeList: [],
      selectedAssigneeIdList: [],
      inputKeyword: ''
    }
  },
  async beforeMount() {
    // sessionStorageにapiKeyが保存されているかどうかでログイン状態を判別
    this.loggedInFlag = !!sessionStorage.getItem('apiKey')
    if (!this.loggedInFlag) {
      // ログインしていなければログイン画面にリダイレクトする
      this.$router.push({ path: '/signin/', query: {} })
      return
    }
    // プロジェクト一覧を取得する
    this.projectList = await this.fetchProjects()
    // 一番上のプロジェクトをデフォルトで選択しておく
    if (this.projectList.length > 0) {
      this.selectedProjectId = this.projectList[0].id
    }

    // TODO allでまとめる
    // 状態一覧を取得する
    this.statusList = await this.fetchStatuses()

    // カテゴリー一覧を取得する
    this.categoryList = await this.fetchCategories({
      projectId: this.selectedProjectId
    })
    // マイルストーン一覧を取得する
    this.milestoneList = await this.fetchMilestones({
      projectId: this.selectedProjectId
    })
    // 担当者一覧を取得する
    this.assigneeList = await this.fetchAssignees({
      projectId: this.selectedProjectId
    })
  },
  methods: {
    async updateStatusList() {
      this.statusList = []
      this.statusList = await this.fetchStatuses()
    },
    onChangeSearchConditions() {
      this.updateStatusList()
    },
    ...mapActions([
      'fetchProjects',
      'fetchCategories',
      'fetchMilestones',
      'fetchAssignees'
    ]),
    ...mapActions('issues', ['fetchStatuses'])
  }
}
</script>

<style lang="scss" scoped>
.main {
  * {
    margin: 0;
  }
  .el-form--label-top /deep/ .el-form-item__label {
    padding: 0;
  }
}
</style>
