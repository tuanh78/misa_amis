<template>
  <paginate
    :page-count="totalPages"
    container-class="pagination"
    prev-text="Trước"
    :click-handler="clickCallback"
    next-text="Sau"
    page-link-class="page-link"
    prev-class="prev-li"
    prev-link-class="prev-link"
    next-class="next-li"
    next-link-class="next-link"
    active-class="active-page"
    disabled-class="disabled-btn"
    :force-page="pageIndex"
    >
  </paginate>
</template>

<script>
export default {
  // #region Declare
  props: {
    // Tổng số lượng trang
    totalPages: {
      type: Number,
      default: 1
    },
    pageIndex: {
      type: Number,
      default: 1
    }
  },
  // #endregion

  // #region Methods
  methods: {
    // #region 1: Load trang mới
    // Hàm Load trang mới
    clickCallback (pageNum) {
      try {
        this.$emit('loadPage', pageNum)
      } catch (error) {
        console.log(error)
      }
    }
    // #endregion 1
  }
  // #endregion
}
</script>

<style lang="scss">
@import "../../../scss/_variable.scss";
@import "./_style.scss";
</style>
