<template>
  <div class="more-option" :style="{top: screenY - 90 + 'px', left: screenX - 280 + 'px'}">
    <ul class="dropdown-menu">
      <li>
        <a href="#" class="option-item">Nhân bản</a>
      </li>
      <li>
        <a href="#" class="option-item" @click="ShowPopupDelete">Xóa</a>
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
    screenX: {
      type: Number,
      default: 0
    },
    screenY: {
      type: Number,
      default: 0
    }
  },
  methods: {
    ShowPopupDelete () {
      this.$emit('showPopupDelete')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../scss/_variable.scss';
@import './_style.scss';
</style>
