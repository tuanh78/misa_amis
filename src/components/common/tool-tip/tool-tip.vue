<template>
  <div class="tool-tip" :style="{top: screenY - 180 + 'px', left: screenX - 210 + 'px'}">
    {{ message }}
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
    },
    message: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import './_style.scss';
</style>
