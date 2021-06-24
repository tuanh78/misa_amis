<template>
  <div class="header">
    <div class="header-left">
      <div v-if="isShowThreeStripes" class="icon-common-large icon-three-stripes" @click="hiddenLogo"></div>

      <div class="company-name">
        <div class="company-name-detail">Công ty cổ phần Misa</div>
        <tool-tip message="Công ty cổ phần Misa"></tool-tip>
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
          <tool-tip message="Tính năng mở rộng"></tool-tip>
        </div>
        <div class="tools-item">
          <div class="icon-common-large icon-setting"></div>
          <tool-tip message="Thiết lập"></tool-tip>
        </div>
        <div class="tools-item">
          <div class="icon-common-large icon-chat"></div>
          <tool-tip message="Trò chuyện"></tool-tip>
        </div>
        <div class="tools-item">
          <div class="icon-common-large icon-help"></div>
          <tool-tip message="Giúp"></tool-tip>
        </div>
        <div class="tools-item">
          <div class="icon-common-large icon-bell"></div>
          <tool-tip message="Thông báo"></tool-tip>
        </div>
      </div>

      <div class="user-ctn">
        <div class="user">
          <div class="user-avatar"></div>
          <div class="user-fullname">Phạm Tú Anh</div>
          <div class="user-icon">
            <div class="icon-common-small icon-arrow-down"></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import ToolTip from '../../common/tool-tip/tool-tip.vue'
export default {
  // #region Declare
  components: { ToolTip },
  props: {
    // Biến hiển thị icon đóng mở sidebar
    isShowThreeStripes: {
      type: Boolean,
      default: true
    }
  },
  // #endregion

  // #region Methods
  methods: {
    // #region 1: Ẩn logo
    /**
     * Hàm ẩn Logo
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    hiddenLogo () {
      try {
        this.$emit('hiddenLogo')
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
@import '/src/scss/_variable.scss';
@import './_style.scss';
</style>
