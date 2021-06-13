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
    disabled-class="disabled-btn">
  </paginate>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      default: 1
    }
  },
  methods: {
    clickCallback (pageNum) {
      this.$emit('loadPage', pageNum)
    }
  }
}
</script>

<style lang="scss">
@import "../../../scss/_variable.scss";
@import "./_style.scss";
</style>
