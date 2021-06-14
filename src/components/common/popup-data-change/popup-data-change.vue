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
          <button class="btn-common btn-close btn-destroy" @click="ClosePopup">
            <span>Hủy</span>
          </button>
        </div>
        <div class="group-btn-right">
          <button class="btn-common btn-close" @click="CloseForm">
            <span>Không</span>
          </button>
          <button class="btn-common btn-delete" @click="SaveData">
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
  props: {
    // Thông báo
    message: {
      type: String
    }
  },
  methods: {
    /**
     * Hàm đóng Popup
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    ClosePopup () {
      this.$emit('closePopup')
    },
    /**
     * Hàm đóng cả Popup cả Form
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    CloseForm () {
      this.$emit('closeForm')
    },
    /**
     * Hàm xóa nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    SaveData () {
      this.$emit('saveData')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './_style.scss';
</style>
