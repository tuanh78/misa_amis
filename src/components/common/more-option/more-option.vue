<template>
  <div class="more-option" :style="{top: screenY - 90 + 'px', left: screenX - 280 + 'px'}">
    <ul class="dropdown-menu">
      <li>
        <a href="#" class="option-item">Nhân bản</a>
      </li>
      <li>
        <a href="#" class="option-item" @click="showPopupDelete">Xóa</a>
      </li>
      <li>
        <a href="#" class="option-item">Ngừng sử dụng</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    // Vị trí chuột ở trục X
    screenX: {
      type: Number,
      default: 0
    },
    // Vị trí chuột ở trục Y
    screenY: {
      type: Number,
      default: 0
    }
  },
  methods: {
    /**
     * Hàm hiển thị thông báo xóa
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    showPopupDelete () {
      try {
        this.$emit('showPopupDelete')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../scss/_variable.scss';
@import './_style.scss';
</style>
