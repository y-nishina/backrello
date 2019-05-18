<template>
  <div>
    <template v-if="loggedInFlag">
      <h2>課題一覧</h2>
      <el-row :gutter="20">
        <template v-for="status in statusList">
          <el-col :key="status.id" :span="20 / statusList.length">
            <Issues v-bind="{ id: status.id, name: status.name }"></Issues>
          </el-col>
        </template>
      </el-row>
    </template>
    <template v-else>
      <!-- TODO：未ログインの場合に一瞬チラッと見える画面をどうするか検討する -->
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
      statusList: []
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

    // 状態一覧を取得する
    this.statusList = await this.fetchStatuses()
  },
  methods: {
    ...mapActions('issues', ['fetchStatuses'])
  }
}
</script>
