<template>
  <div class="signin">
    <el-row>
      <h2>疑似ログイン画面</h2>
      <div>
        スペースキーとAPIキーを入力して疑似ログインをおこないます
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
    <el-row>
      <el-form :model="signinForm" label-width="150px">
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
  text-align: center;
  .el-form {
    margin-top: 60px;
  }
}
</style>
