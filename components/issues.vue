<template>
  <div
    class="issues"
    :class="{ over: isOver }"
    @dragstart="handleDragStart($event)"
    @dragover="handleDragOver($event)"
    @dragleave="handleDragLeave($event)"
    @dragend="handleDragEnd($event)"
    @drop="handleDrop($event)"
  >
    <div class="issueListWrapper">
      <h3>{{ statusName }}</h3>
      <div class="issueList">
        <template v-for="issue in issueList">
          <el-card
            :key="issue.id"
            :data-issue-id="issue.id"
            shadow="hover"
            draggable="true"
          >
            {{ issue.summary }}
          </el-card>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    statusId: {
      type: Number,
      required: true
    },
    statusName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      issueList: [],
      isOver: false
    }
  },
  async beforeMount() {
    this.issueList = await this.fetchIssues({ statusId: [this.statusId] })
  },
  methods: {
    handleDragStart(event) {
      event.dataTransfer.setData('issueId', event.target.dataset.issueId)
      event.dataTransfer.setData('statusId', this.statusId)
      event.dataTransfer.effectAllowed = 'move'
    },
    handleDragOver(event) {
      this.isOver = true
      if (event.preventDefault) {
        event.preventDefault()
      }

      event.dataTransfer.dropEffect = 'move'

      return false
    },
    handleDragLeave(event) {
      this.isOver = false
    },
    handleDragEnd(event) {
      this.isOver = false
    },
    async handleDrop(event) {
      this.isOver = false

      // 変更前と変更後のステータスが同じなら何もしない
      if (
        parseInt(this.statusId) !==
        parseInt(event.dataTransfer.getData('statusId'))
      ) {
        await this.changeIssueStatus({
          id: event.dataTransfer.getData('issueId'),
          statusId: this.statusId
        })
        this.$emit('update')
      }
    },
    ...mapActions('issues', ['fetchIssues', 'changeIssueStatus'])
  }
}
</script>

<style lang="scss" scoped>
.issues {
  height: 100%;
  &.over {
    border: 2px dashed black;
  }
  h3 {
    margin: 0 16px;
  }
  .issueListWrapper {
    background-color: #dfe1e6;
    border-radius: 3px;
    margin: 4px;
    padding: 8px;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }
  .issueList {
    flex: 1;
    position: relative;
    overflow-y: auto;
  }
  .el-card {
    cursor: pointer;
    margin: 8px 4px;
  }
}
</style>
