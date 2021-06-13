<template>
  <div class="popup">
    <div class="main-popup-ctn">
      <div class="main-popup">
        <div class="icon-warning-ctn">
          <div class="icon-warning"></div>
        </div>
        <div class="content-warning">
          <span>{{ messageDelete }}</span>
        </div>
      </div>
      <div class="straight-line"></div>
      <div class="group-btn">
        <button class="btn-common btn-close" @click="ClosePopup">
          <span>Không</span>
        </button>
        <button class="btn-common btn-delete" @click="DeleteEmployee">
          <span>Có</span>
        </button>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
export default {
  props: {
    messageDelete: {
      type: String
    }
  },
  methods: {
    ClosePopup () {
      this.$emit('closePopup')
    },
    DeleteEmployee () {
      this.$emit('deleteEmployee')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './_style.scss';
</style>
