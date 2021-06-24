<template>
  <div class="sidebar">
    <div>
      <div v-if="isShowLogo" class="sidebar-logo-ctn">
        <a href="#" class="sidebar-option"></a>
        <a href="#" class="sidebar-logo"></a>
      </div>
      <div v-else class="sidebar-three-stripes" @click="showLogo">
        <div class="icon-common-large icon-three-stripes"></div>
      </div>
    </div>
    <div class="list-menu">
      <ul>
        <li>
          <router-link to="/" class="item-menu">
            <div class="item-menu-ctn">
              <div :class="['item-menu-icon', { 'close-logo': !isShowLogo}]">
                <div class="icon-common-large icon-dashboard"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Tổng quan</div>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/nhan-vien" class="item-menu">
            <div class="item-menu-ctn">
              <div :class="['item-menu-icon', { 'close-logo': !isShowLogo}]" >
                <div class="icon-common-large sidebar-cash"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Tiền mặt</div>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/tien-gui" class="item-menu">
            <div class="item-menu-ctn">
              <div :class="['item-menu-icon', { 'close-logo': !isShowLogo}]">
                <div class="icon-common-large sidebar-bank"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Tiền gửi</div>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/mua-hang" class="item-menu">
            <div class="item-menu-ctn">
              <div :class="['item-menu-icon', { 'close-logo': !isShowLogo}]">
                <div class="icon-common-large sidebar-pu"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Mua hàng</div>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/ban-hang" class="item-menu">
            <div class="item-menu-ctn">
              <div :class="['item-menu-icon', { 'close-logo': !isShowLogo}]">
                <div class="icon-common-large sidebar-sale"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Bán hàng</div>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/quan-ly-hoa-don" class="item-menu">
            <div class="item-menu-ctn">
              <div :class="['item-menu-icon', { 'close-logo': !isShowLogo}]">
                <div class="icon-common-large sidebar-invoice"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Quản lý hóa đơn</div>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/kho" class="item-menu">
            <div class="item-menu-ctn">
              <div :class="['item-menu-icon', { 'close-logo': !isShowLogo}]">
                <div class="icon-common-large sidebar-stock"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Kho</div>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/cong-cu-dung-cu" class="item-menu">
            <div class="item-menu-ctn">
              <div :class="['item-menu-icon', { 'close-logo': !isShowLogo}]">
                <div class="icon-common-large sidebar-tools"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Công cụ dụng cụ</div>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/tai-san-co-dinh" class="item-menu">
            <div class="item-menu-ctn">
              <div :class="['item-menu-icon', { 'close-logo': !isShowLogo}]">
                <div class="icon-common-large sidebar-fixed-assets"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Tài sản cố định</div>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/thue" class="item-menu">
            <div class="item-menu-ctn">
              <div :class="['item-menu-icon', { 'close-logo': !isShowLogo}]">
                <div class="icon-common-large sidebar-tax"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Thuế</div>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/gia-thanh" class="item-menu">
            <div class="item-menu-ctn">
              <div :class="['item-menu-icon', { 'close-logo': !isShowLogo}]">
                <div class="icon-common-large sidebar-price"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Giá thành</div>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/tong-hop" class="item-menu">
            <div class="item-menu-ctn">
              <div :class="['item-menu-icon', { 'close-logo': !isShowLogo}]">
                <div class="icon-common-large sidebar-general"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Tổng hợp</div>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/ngan-sach" class="item-menu">
            <div class="item-menu-ctn">
              <div :class="['item-menu-icon', { 'close-logo': !isShowLogo}]">
                <div class="icon-common-large sidebar-budget"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Ngân sách</div>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/bao-cao" class="item-menu">
            <div class="item-menu-ctn">
              <div :class="['item-menu-icon', { 'close-logo': !isShowLogo}]">
                <div class="icon-common-large sidebar-report"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Báo cáo</div>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="/phan-tich-tai-chinh" class="item-menu">
            <div class="item-menu-ctn">
              <div :class="['item-menu-icon', { 'close-logo': !isShowLogo}]">
                <div class="icon-common-large sidebar-finance"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Phân tích tài chính</div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  // #region Declare
  props: {
    // Biến hiển thị Logo
    isShowLogo: {
      type: Boolean,
      default: true
    }
  },
  // #endregion

  // #region Methods
  methods: {
    // #region 1: Hiện Logo
    /**
     * Hàm hiển thị Logo
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    showLogo () {
      try {
        this.$emit('showLogo')
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
@import "../../../scss/_variable.scss";
@import "./style";
</style>
