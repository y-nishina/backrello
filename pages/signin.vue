<template>
  <div class="signin">
    <el-row class="signinFormWrapper">
      <h2>Backrelloにログイン</h2>
      <el-form
        :model="signinForm"
        label-width="150px"
        label-position="top"
        class="signinForm"
      >
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
        <el-form-item class="signinButtonWrapper">
          <el-button type="success" class="signinButton" @click="signin()"
            >ログイン</el-button
          >
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
  h2 {
    background-color: #4caf93;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 16px;
  }
  .signinFormWrapper {
    margin-top: 16px;
  }
  .signinForm {
    background-color: #e3eee8;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 16px;
  }
  .signinButtonWrapper {
    text-align: center;
    margin: 0;
  }
  .signinButton {
    background-color: #4caf93;
    border-color: #4caf93;
  }
  .el-form--label-top /deep/ .el-form-item__label {
    padding: 0;
  }
}
</style>
