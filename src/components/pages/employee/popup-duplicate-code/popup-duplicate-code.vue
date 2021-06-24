<template>
  <div class="popup">
    <div class="main-popup-ctn">
      <div class="main-popup">
        <div class="icon-warning-ctn">
          <div class="icon-warning"></div>
        </div>
        <div class="content-warning">
          <span>{{ errorMessage}}</span>
        </div>
      </div>
      <div class="straight-line"></div>
      <div class="btn-close-ctn">
        <div class="btn-close" @click="closePopup">
          <span>Đồng ý</span>
        </div>
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
      type: String
    }
  },
  // #endregion

  // #region Methods
  methods: {
    // #region 1: Đóng Popup
    /**
     * Hàm đóng Popup
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    closePopup () {
      try {
        this.$emit('closePopup')
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
