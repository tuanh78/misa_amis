<template>
  <div class="tool-tip">
    {{ message }}
  </div>
</template>

<script>
export default {
  // #region Declare
  props: {
    // Thông báo
    message: {
      type: String,
      default: ''
    }
  }
  // #endregion
}
</script>

<style lang="scss" scoped>
@import './_style.scss';
</style>
