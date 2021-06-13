<template>
  <div id="app">
    <div class="content">
      <the-sidebar :isShowLogo="isShowLogo" @showLogo="ShowLogo"></the-sidebar>
      <div class="main-content">
        <the-header :isShowThreeStripes="isShowLogo" @hiddenLogo="HiddenLogo"></the-header>
        <the-content></the-content>
      </div>
    </div>
  </div>
</template>

<script>
import TheHeader from './components/layout/the-header/the-header.vue'
import TheSidebar from './components/layout/the-sidebar/the-sidebar'
import TheContent from './components/layout/the-content/the-content'
export default {
  components: {
    TheSidebar,
    TheHeader,
    TheContent
  },
  data () {
    return {
      isShowLogo: true // Biến để hiển thị Logo hay không
    }
  },
  methods: {
    // Hàm ẩn Logo
    HiddenLogo () {
      this.isShowLogo = false
    },
    // Hàm hiện Logo
    ShowLogo () {
      this.isShowLogo = true
    }
  }
}
</script>

<style lang="scss">
@import './assets/reset.css';
@import './scss/_variable.scss';
.content {
  display: flex;
  overflow: hidden;

  .main-content {
    flex-grow: 1;
    width: calc(100% - 178px);
    position: relative;
  }
}

html {
  width: 100%;
  font-size: 13px;
}

body {
  font-family: 'noto-sans', 'Open Sans' , sans-serif;
  background-color: $bg-body;
  color: #111;
}

// Kích thước của icon lớn
.icon-common-large {
    background: url('./assets/img/Sprites.64af8f61.svg') no-repeat;
    width: 24px;
    height: 24px;
}
// Kích thước của icon vừa
.icon-common-medium {
    background: url('./assets/img/Sprites.64af8f61.svg') no-repeat;
    width: 16px;
    height: 16px;
}
// Kích thước của icon nhỏ
.icon-common-small {
    background: url('./assets/img/Sprites.64af8f61.svg') no-repeat;
    width: 14px;
    height: 14px;
}

// Font của trang web

@font-face {
  font-family: 'noto-sans';
  src: url('./assets/fonts/notosans-regular.2cb88a13.woff2');
}

@font-face {
  font-family: 'noto-sans-Bold';
  src: url('./assets/fonts/notosans-bold.3ede5aff.woff2');
}

@font-face {
  font-family: 'noto-sans-italic';
  src: url('./assets/fonts/notosans-italic.1c1aaac9.woff2');
}

@font-face {
  font-family: 'noto-sans-semi-Bold';
  src: url('./assets/fonts/notosans-semibold.df3e6dc4.woff2');
}

</style>
