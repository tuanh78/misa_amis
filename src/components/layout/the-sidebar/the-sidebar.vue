<template>
  <div class="sidebar">
    <div>
      <div v-if="isShowLogo" class="sidebar-logo-ctn">
        <a href="#" class="sidebar-option"></a>
        <a href="#" class="sidebar-logo"></a>
      </div>
      <div v-else class="sidebar-three-stripes" @click="ShowLogo">
        <div class="icon-common-large icon-three-stripes"></div>
      </div>
    </div>
    <div class="list-menu">
      <ul>
        <li>
          <a href="#" class="item-menu">
            <div class="item-menu-ctn">
              <div class="item-menu-icon">
                <div class="icon-common-large icon-dashboard"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Tổng quan</div>
            </div>
          </a>
        </li>
        <li>
          <a href="#" class="item-menu">
            <div class="item-menu-ctn">
              <div class="item-menu-icon">
                <div class="icon-common-large sidebar-cash"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Tiền mặt</div>
            </div>
          </a>
        </li>
        <li>
          <a href="#" class="item-menu">
            <div class="item-menu-ctn">
              <div class="item-menu-icon">
                <div class="icon-common-large sidebar-bank"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Tiền gửi</div>
            </div>
          </a>
        </li>
        <li>
          <a href="#" class="item-menu">
            <div class="item-menu-ctn">
              <div class="item-menu-icon">
                <div class="icon-common-large sidebar-pu"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Mua hàng</div>
            </div>
          </a>
        </li>
        <li>
          <a href="#" class="item-menu">
            <div class="item-menu-ctn">
              <div class="item-menu-icon">
                <div class="icon-common-large sidebar-sale"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Bán hàng</div>
            </div>
          </a>
        </li>
        <li>
          <a href="#" class="item-menu">
            <div class="item-menu-ctn">
              <div class="item-menu-icon">
                <div class="icon-common-large sidebar-invoice"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Quản lý hóa đơn</div>
            </div>
          </a>
        </li>
        <li>
          <a href="#" class="item-menu">
            <div class="item-menu-ctn">
              <div class="item-menu-icon">
                <div class="icon-common-large sidebar-stock"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Kho</div>
            </div>
          </a>
        </li>
        <li>
          <a href="#" class="item-menu">
            <div class="item-menu-ctn">
              <div class="item-menu-icon">
                <div class="icon-common-large sidebar-tools"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Công cụ dụng cụ</div>
            </div>
          </a>
        </li>
        <li>
          <a href="#" class="item-menu">
            <div class="item-menu-ctn">
              <div class="item-menu-icon">
                <div class="icon-common-large sidebar-fixed-assets"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Tài sản cố định</div>
            </div>
          </a>
        </li>
        <li>
          <a href="#" class="item-menu">
            <div class="item-menu-ctn">
              <div class="item-menu-icon">
                <div class="icon-common-large sidebar-tax"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Thuế</div>
            </div>
          </a>
        </li>
        <li>
          <a href="#" class="item-menu">
            <div class="item-menu-ctn">
              <div class="item-menu-icon">
                <div class="icon-common-large sidebar-price"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Giá thành</div>
            </div>
          </a>
        </li>
        <li>
          <a href="#" class="item-menu">
            <div class="item-menu-ctn">
              <div class="item-menu-icon">
                <div class="icon-common-large sidebar-general"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Tổng hợp</div>
            </div>
          </a>
        </li>
        <li>
          <a href="#" class="item-menu">
            <div class="item-menu-ctn">
              <div class="item-menu-icon">
                <div class="icon-common-large sidebar-budget"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Ngân sách</div>
            </div>
          </a>
        </li>
        <li>
          <a href="#" class="item-menu">
            <div class="item-menu-ctn">
              <div class="item-menu-icon">
                <div class="icon-common-large sidebar-report"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Báo cáo</div>
            </div>
          </a>
        </li>
        <li>
          <a href="#" class="item-menu">
            <div class="item-menu-ctn">
              <div class="item-menu-icon">
                <div class="icon-common-large sidebar-finance"></div>
              </div>
              <div v-if="isShowLogo" class="item-menu-text">Phân tích tài chính</div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // Biến hiển thị Logo
    isShowLogo: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    /**
     * Hàm hiển thị Logo
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    ShowLogo () {
      this.$emit('showLogo')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../scss/_variable.scss";
@import "./style";
</style>
