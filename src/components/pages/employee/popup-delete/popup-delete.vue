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
        <button class="btn-common btn-close" @click="closePopup">
          <span>Không</span>
        </button>
        <button class="btn-common btn-delete" @click="deleteEmployee">
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
    // Thông báo xóa
    messageDelete: {
      type: String
    }
  },
  methods: {
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
    /**
     * Hàm xóa nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    deleteEmployee () {
      try {
        this.$emit('deleteEmployee')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './_style.scss';
</style>
