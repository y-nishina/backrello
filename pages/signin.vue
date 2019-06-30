<template>
  <div class="signin">
    <el-row class="signinFormWrapper">
      <h2>Backrelloにログイン</h2>
      <el-form
        ref="signinForm"
        :model="signinForm"
        label-width="150px"
        label-position="top"
        class="signinForm"
        @submit.native.prevent="signin"
      >
        <el-form-item
          label="スペースURL"
          prop="spaceUrl"
          :rules="[
            { required: true, message: 'スペースURLは必ず入力してください' }
          ]"
        >
          <el-input v-model="signinForm.spaceUrl"></el-input>
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
          <el-button type="success" class="signinButton" native-type="submit"
            >ログイン</el-button
          >
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <div>
        スペースURLとAPIキーを入力してログインをおこないます
      </div>
      <div>
        ※スペースURLはbacklogのURL（https://XXX.backlog.jp/）の"XXX.backlog.jp"の部分（backlog.com等のドメインにも対応）
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
        spaceUrl: '',
        apiKey: ''
      }
    }
  },
  methods: {
    signin() {
      this.$refs.signinForm.validate(async valid => {
        if (valid) {
          const result = await this.doAuthentication(this.signinForm)
          if (result === true) {
            // ログインに成功したらメイン画面に遷移する
            this.$router.push({ path: '/', query: {} })
          } else {
            this.$message.error('ログインできませんでした。')
          }
        } else {
          return false
        }
      })
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
    background-color: $backlog-green;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 16px;
  }
  .signinFormWrapper {
    margin-top: 16px;
  }
  .signinForm {
    background-color: $backlog-green-light;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: 16px;
  }
  .signinButtonWrapper {
    text-align: center;
    margin: 0;
  }
  .signinButton {
    background-color: $backlog-green;
    border-color: $backlog-green;
  }
  .el-form--label-top /deep/ .el-form-item__label {
    padding: 0;
  }
}
</style>
