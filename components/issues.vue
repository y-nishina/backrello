<template>
  <div class="issues">
    <h3>{{ name }}</h3>
    <template v-for="issue in issueList">
      <el-card :key="issue.id" shadow="hover">{{ issue.summary }}</el-card>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      issueList: []
    }
  },
  async beforeMount() {
    this.issueList = await this.fetchIssues({
      statusId: [this.id]
    })
  },
  methods: {
    ...mapActions('issues', ['fetchIssues'])
  }
}
</script>

<style lang="scss" scoped>
.issues {
  .el-card {
    cursor: pointer;
  }
}
</style>
