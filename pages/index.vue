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
          <el-form label-position="top" :inline="true">
            <el-form-item label="優先度">
              <el-select
                v-model="selectedPriorityIdList"
                multiple
                @change="onChangeSearchConditions"
              >
                <el-option
                  v-for="priority in priorityList"
                  :key="priority.id"
                  :label="priority.name"
                  :value="priority.id"
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
      <el-row class="boardArea">
        <template v-for="status in statusList">
          <el-col
            :key="status.id"
            :span="24 / statusList.length"
            class="issuesWrapper"
          >
            <Issues
              v-bind="{
                statusId: status.id,
                statusName: status.name,
                projectId: selectedProjectId,
                categoryIdList: selectedCategoryIdList,
                milestoneIdList: selectedMilestoneIdList,
                assigneeIdList: selectedAssigneeIdList,
                priorityIdList: selectedPriorityIdList,
                keyword: inputKeyword
              }"
              @update="updateStatusList()"
            ></Issues>
          </el-col>
        </template>
      </el-row>
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
      priorityList: [],
      selectedPriorityIdList: [],
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
    // 優先度一覧を取得する
    this.priorityList = await this.fetchPriorities()
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
      'fetchAssignees',
      'fetchPriorities'
    ]),
    ...mapActions('issues', ['fetchStatuses'])
  }
}
</script>

<style lang="scss" scoped>
.main {
  background-color: #4caf93;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  h2 {
    color: white;
  }
  .issuesWrapper {
    height: 100%;
  }
  .el-row {
    padding: 4px 8px;
    &.boardArea {
      padding: 8px;
      flex: 1;
      position: relative;
      overflow-y: auto;
    }
  }
  .el-form-item {
    margin: 0;
  }
  .el-form-item /deep/ .el-form-item__label {
    color: white;
    font-weight: bold;
  }
  .el-form--label-top /deep/ .el-form-item__label {
    padding: 0;
  }
}
</style>
