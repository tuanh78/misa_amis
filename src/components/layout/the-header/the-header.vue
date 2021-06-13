<template>
  <div class="header">
    <div class="header-left">
      <div v-if="isShowThreeStripes" class="icon-common-large icon-three-stripes" @click="HiddenLogo"></div>

      <div class="company-name">
        <div class="company-name-detail">Công ty cổ phần Misa</div>
        <div class="icon-arrow-down">
          <div class="icon-common-small arrow-down"></div>
        </div>
      </div>
    </div>

    <div class="header-right">
      <div class="search">
        <input type="text" class="search-input" placeholder="Nhập từ khóa tìm kiếm">
        <div class="icon-common-large search-icon"></div>
      </div>

      <div class="tools">
        <div class="tools-item">
          <div class="icon-common-large icon-mess"></div>
        </div>
        <div class="tools-item">
          <div class="icon-common-large icon-setting"></div>
        </div>
        <div class="tools-item">
          <div class="icon-common-large icon-chat"></div>
        </div>
        <div class="tools-item">
          <div class="icon-common-large icon-help"></div>
        </div>
        <div class="tools-item">
          <div class="icon-common-large icon-bell"></div>
        </div>
      </div>

      <div class="user-ctn">
        <div class="user">
          <div class="user-avatar"></div>
          <div class="user-fullname">Nguyễn Quang Minh</div>
          <div class="user-icon">
            <div class="icon-common-small icon-arrow-down"></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShowThreeStripes: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    HiddenLogo () {
      this.$emit('hiddenLogo')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '/src/scss/_variable.scss';
@import './_style.scss';
</style>
