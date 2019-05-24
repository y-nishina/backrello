<template>
  <div class="signin">
    <el-row>
      <h2>ログイン</h2>
      <el-form :model="signinForm" label-width="150px" label-position="top">
        <el-form-item
          label="スペースキー"
          prop="spaceKey"
          :rules="[
            { required: true, message: 'スペースキーは必ず入力してください' }
          ]"
        >
          <el-input v-model="signinForm.spaceKey"></el-input>
        </el-form-item>
        <el-form-item
          label="APIキー"
          prop="apiKey"
          :rules="[
            { required: true, message: 'APIキーは必ず入力してください' }
          ]"
        >
          <el-input v-model="signinForm.apiKey"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="signin()">ログイン</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <div>
        スペースキーとAPIキーを入力してログインをおこないます
      </div>
      <div>
        ※スペースキーはbacklogのURL（https://XXX.backlog.jp/）のXXXの部分
      </div>
      <div>
        ※APIキーに関しては<a
          href="https://backlog.com/ja/help/usersguide/personal-settings/userguide2378/"
          target="_blank"
          >コチラ</a
        >
      </div>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      signinForm: {
        spaceKey: '',
        apiKey: ''
      }
    }
  },
  methods: {
    async signin() {
      const result = await this.doAuthentication(this.signinForm)
      if (result === true) {
        // ログインに成功したらメイン画面に遷移する
        this.$router.push({ path: '/', query: {} })
      }
    },
    ...mapActions(['doAuthentication'])
  }
}
</script>

<style lang="scss" scoped>
.signin {
  max-width: 680px;
  margin: auto;
}
</style>
