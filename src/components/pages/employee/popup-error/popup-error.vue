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
      <div class="btn-close" @click="closePopupError">Đóng</div>
    </div>
  </div>
  <div class="mask"></div>
</div>
</template>

<script>
export default {
  // #region Declare
  props: {
    // Thông báo lỗi
    errorMessage: {
      type: String,
      default: 'Mã không được để trống.'
    }
  },
  // #endregion

  // #region Methods
  methods: {
    // #region 1: Đóng Popup
    /**
     * Hàm đóng Popup lỗi
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    closePopupError () {
      try {
        this.$emit('closePopupError')
      } catch (error) {
        console.log(error)
      }
    }
    // #endregion 1
  }
  // #endregion
}
</script>

<style lang="scss" scoped>
@import './_style.scss';
</style>
