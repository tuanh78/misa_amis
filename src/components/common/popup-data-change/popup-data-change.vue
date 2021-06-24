<template>
  <div class="popup">
    <div class="main-popup-ctn">
      <div class="main-popup">
        <div class="icon-warning-ctn">
          <div class="icon-question"></div>
        </div>
        <div class="content-question">
          <span>{{ message }}</span>
        </div>
      </div>
      <div class="straight-line"></div>
      <div class="group-btn">
        <div class="group-btn-left">
          <button class="btn-common btn-close btn-destroy" @click="closePopup">
            <span>Hủy</span>
          </button>
        </div>
        <div class="group-btn-right">
          <button class="btn-common btn-close" @click="closeForm">
            <span>Không</span>
          </button>
          <button class="btn-common btn-delete" @click="saveData">
            <span>Có</span>
          </button>
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
    // Thông báo
    message: {
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
    },
    // #endregion 1

    // #region 2: Đóng Popup và Form
    /**
     * Hàm đóng cả Popup cả Form
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    closeForm () {
      try {
        this.$emit('closeForm')
      } catch (error) {
        console.log(error)
      }
    },
    // #endregion 2

    // #region 3: Xóa nhân viên
    /**
     * Hàm lưu nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    saveData () {
      try {
        this.$emit('saveData')
      } catch (error) {
        console.log(error)
      }
    }
    // #endregion 3
  }
  // #endregion
}
</script>

<style lang="scss" scoped>
@import './_style.scss';
</style>
