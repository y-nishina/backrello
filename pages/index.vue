<template>
  <div>
    メインのページ
  </div>
</template>

<script>
export default {
  beforeMount() {
    const apiKey = sessionStorage.getItem('apiKey')
    if (!apiKey) {
      // apiKeyがセッションストレージに保存されていなければログイン画面にリダイレクトする
      this.$router.push({ path: '/signin/', query: {} })
    }
  }
}
</script>
