<template>
<div class="popup-error">
  <div class="main-content">
    <div class="content">
      <div class="icon-ctn">
        <div class="icon-error"></div>
      </div>
      <div class="message">
        <span>{{ errorMessage }}</span>
      </div>
    </div>
    <div class="straight-line"></div>
    <div class="btn-close-ctn">
      <div class="btn-close" @click="ClosePopupError">Đóng</div>
    </div>
  </div>
  <div class="mask"></div>
</div>
</template>

<script>
export default {
  props: {
    errorMessage: {
      type: String,
      default: 'Mã không được để trống.'
    }
  },
  methods: {
    ClosePopupError () {
      this.$emit('closePopupError')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './_style.scss';
</style>
