<template>
  <div>
    <template v-if="loggedInFlag">
      <el-row>
        <el-col :span="4">
          <h2>課題一覧</h2>
        </el-col>
        <el-col :span="20">
          <el-form>
            <el-form-item label="プロジェクト">
              <el-select v-model="selectedProjectId">
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
      <el-row :gutter="20">
        <template v-for="status in statusList">
          <el-col :key="status.id" :span="20 / statusList.length">
            <Issues
              v-bind="{
                statusId: status.id,
                statusName: status.name,
                projectId: selectedProjectId
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
      selectedProjectId: null
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

    // 状態一覧を取得する
    this.statusList = await this.getStatusList()
  },
  methods: {
    async getStatusList() {
      const statusList = await this.fetchStatuses()
      return statusList
    },
    async updateStatusList() {
      this.statusList = []
      this.statusList = await this.getStatusList()
    },
    ...mapActions(['fetchProjects']),
    ...mapActions('issues', ['fetchStatuses'])
  }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
}
</style>
