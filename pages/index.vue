<template>
  <div>
    <template v-if="loggedInFlag">
      メインのページ
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggedInFlag: false
    }
  },
  beforeMount() {
    // sessionStorageにapiKeyが保存されているかどうかでログイン状態を判別
    this.loggedInFlag = !!sessionStorage.getItem('apiKey')
    if (!this.loggedInFlag) {
      // ログインしていなければログイン画面にリダイレクトする
      this.$router.push({ path: '/signin/', query: {} })
    }
  }
}
</script>
