<template>
  <div
    :class="[
      'autocomplete-department',
      {'border-error': errorProperties.includes('departmentId')},
      { 'input-active': departmentInputActive },
    ]"
    @click="[departmentInputActive = true]"
    @keydown.enter="resetDepartmentSelected"
    v-click-outside="hiddenDropdownOption"
    shortkey
  >
    <tool-tip v-if="errorProperties.includes('departmentId')" :message="!departmentSearch ? 'Đơn vị không được để trống.' : 'Dữ liệu không có trong danh sách.'"></tool-tip>
    <div>
      <input
        id="autocomplete"
        @input="
          filterDepartment();
          inputChangedValue();
        "
        ref="departmentName"
        @focus="departmentInputActive = true" @blur="departmentInputActive = false"
        @keydown.40="moveDownOption"
        @keydown.38="moveUpOption"
        @keydown.tab="moveToNextInput"
        @click="changeValueOption"
        v-model="departmentSearch"
        autocomplete="off"
      />
      <label
        class="department-icon-ctn"
        for="autocomplete"
        @click.prevent="showDepartmentList"
      >
        <div class="icon-common-medium icon-arrow-down"></div>
      </label>
    </div>
    <div
      class="dropdown-option"
      v-if="isShowDepartmentList"
      @keydown.40="moveDownOption"
      @keydown.38="moveUpOption"
    >
      <div class="department-title">
        <span>Tên đơn vị</span>
      </div>
      <ul :class="['list-option', { 'list-option-height': isShowLoading }]">
        <li
          v-for="(department, index) in fakeDepartments"
          :key="index"
          @click="selectedDepartment(index, department)"
        >
          <a
            href="#"
            :class="[
              'option-item',
              {
                'selected-option':
                  indexOptionSelected === index
              },
            ]"
            >{{ department.departmentName }}</a
          >
        </li>
      </ul>
      <div
        class="message-no-data"
        v-if="fakeDepartments.length == 0 && isShowLoading === false"
      >
        Không có dữ liệu hiển thị
      </div>
      <div class="loading" v-if="isShowLoading">
        <i class="fa fa-spinner fa-spin"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from '../../../axios/http-common'
import ToolTip from '../tool-tip/tool-tip.vue'
import EventBus from '../../../event-bus/event-bus'
import Vue from 'vue'
import vClickOutside from 'v-click-outside'
Vue.use(vClickOutside)
var debounce = require('lodash.debounce')
export default {
  created () {
    // Lấy danh sách phòng ban
    HTTP.get('departments')
      .then((result) => {
        // Lưu lại danh sách phòng ban vào biến
        this.departments = result.data
        // Tạo ra một mảng danh sách phòng ban khác để xử lý
        this.fakeDepartments = [...this.departments]
        if (!this.departmentId) {
          this.indexOptionSelected = 0
        } else {
          this.indexOptionSelected = this.fakeDepartments.findIndex((item) => {
            return item.departmentId === this.departmentId
          })
        }
      })
      .catch((err) => {
        // Log ra khi gặp lỗi
        console.log(err)
      })
    EventBus.$on('resetDepartmentSearch', this.resetDepartmentSearch)
  },
  data () {
    return {
      departments: [], // Biến lưu trữ danh sách phòng ban
      fakeDepartments: [], // Biến lưu trữ phòng ban dùng để thay đổi khi tìm kiếm
      isShowDepartmentList: false, // Biến hiển thị danh sách phòng ban
      departmentInputActive: false, // Biến highlight input phòng ban đang được focus
      departmentSearch: this.departmentName, // Biến lưu giá trị phòng ban cần tìm kiếm
      isShowLoading: false, // Biến hiển thị trạng thái Loading khi tìm kiếm
      departmentSeleted: this.departmentId, // Biến lưu Id phòng ban đang được chọn
      indexOptionSelected: 0 // Vị trí của phòng ban đang được chọn
    }
  },
  destroyed () {
    // Dừng lắng nghe sự kiện
    EventBus.$off('resetDepartmentSearch', this.resetDepartmentSearch)
  },
  props: {
    // Các thuộc tính lỗi
    errorProperties: {
      type: Array
    },
    // Tên phòng ban
    departmentName: {
      type: String,
      default: ''
    },
    // Id của phòng ban
    departmentId: {
      type: String,
      default: ''
    }
  },
  components: {
    ToolTip
  },
  methods: {
    /**
     * Hàm ẩn danh sách phòng ban
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    hiddenDropdownOption () {
      this.departmentInputActive = false
      this.isShowDepartmentList = false
    },
    /**
     * Hàm lọc danh sách phòng ban
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    filterDepartment: debounce(function () {
      // Kiểm tra giá trị tìm kiếm có rỗng hay không
      if (this.departmentSearch === '') {
        // Mảng phòng ban xử lý bằng mảng phòng ban ban đầu
        this.fakeDepartments = [...this.departments]
        // Gán phòng ban được chọn là phòng ban đầu tiên
        // this.departmentSeleted = this.fakeDepartments[0].departmentId
        // Vị trí phòng ban được chọn là 0
        this.indexOptionSelected = 0
      } else {
        // Lọc những giá trị cần tìm kiếm
        this.fakeDepartments = this.departments.filter((item) => {
          return item.departmentName.toLowerCase().indexOf(this.departmentSearch.toLowerCase()) !== -1
        })
        // Kiểm tra mảng department có phần tử nào hay không
        if (this.fakeDepartments.length > 0) {
          // Chọn phần tử đầu tiên
          // this.departmentSeleted = this.fakeDepartments[0].departmentId
          // Vị trí phần tử đầu tiên được chọn
          this.indexOptionSelected = 0
        }
      }
      // Kiểm tra giá trị tìm kiếm rỗng hoặc mảng fakeDepartment có phần tử hay không
      if (!this.departmentSearch || !this.fakeDepartments.length) {
        // Kiểm tra xem lỗi đã tồn tại chưa
        if (!this.errorProperties.includes('departmentId')) {
          // Thêm lỗi
          this.$emit('addErrorDepartment')
        }
      } else {
        // Xóa lỗi
        this.$emit('removeErrorDepartment')
      }
      // Tắt loading
      this.isShowLoading = false
    }, 500),
    /**
     * Hàm thực hiện giá trị tìm kiếm thay đổi
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    inputChangedValue () {
      // Hiện Loading
      this.isShowLoading = true
      // Hiện danh sách
      this.isShowDepartmentList = true
    },
    /**
     * Hàm di chuyển lựa chọn phòng ban xuống dưới
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    moveDownOption () {
      // Kiểm tra đã chọn phòng ban nào chưa
      if (!this.departmentSeleted) {
        // Chọn phòng ban đầu tiên
        this.departmentSeleted = this.fakeDepartments[0].departmentId
      }
      // Hiển thị danh sách phòng ban
      this.isShowDepartmentList = true
      // Lấy các tất cả element option-item
      const options = [...this.$el.querySelectorAll('.option-item')]
      options.forEach((option, index) => {
        // Kiểm tra element đã được chọn chưa
        if (
          option.classList.contains('selected-option') &&
          this.indexOptionSelected < this.fakeDepartments.length
        ) {
          // Tăng giá trị vị trí được chọn lên 1
          this.indexOptionSelected = index + 1
          // Kiểm tra vị trí được chọn đã bằng length của mảng danh sách chưa
          if (this.indexOptionSelected === this.fakeDepartments.length) {
            // Gán vị trí được chọn về phần tử đầu
            this.indexOptionSelected = 0
            // Gán giá trị được chọn là phòng ban đầu
            this.departmentSeleted = this.fakeDepartments[0].departmentId
            // Lấy tên phòng ban đầu được chọn
            this.departmentSearch = options[0].innerText
            return true
          }
          // Lấy giá trị được chọn tiếp theo
          this.departmentSeleted =
            this.fakeDepartments[this.indexOptionSelected].departmentId
          // Lấy tên phòng ban được chọn
          this.departmentSearch = options[this.indexOptionSelected].innerText
          return true
        }
      })
    },
    /**
     * Hàm di chuyển lựa chọn phòng ban lên trên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    moveUpOption () {
      // Kiểm tra có phòng ban nào được chọn chưa
      if (!this.departmentSeleted) {
        // Gán giá trị được chọn là phòng ban đầu
        this.departmentSeleted = this.fakeDepartments[0].departmentId
      }
      // Hiển thị danh sách phòng ban
      this.isShowDepartmentList = true
      // Lấy list element phòng ban
      const options = [...this.$el.querySelectorAll('.option-item')]
      options.forEach((option, index) => {
        if (
          // Kiểm tra option phòng ban đã được chọn hay chưa
          option.classList.contains('selected-option') &&
          this.indexOptionSelected >= 0
        ) {
          // Vị trí phòng ban được chọn - 1
          this.indexOptionSelected = index - 1
          // Kiểm tra vị trí được chọn nằm ngoài vị trí cho phép chưa
          if (this.indexOptionSelected === -1) {
            // Vị trí được chọn là vị trí cuối
            this.indexOptionSelected = options.length - 1
            // Gán giá trị phòng ban được chọn là phòng ban cuối
            this.departmentSeleted =
              this.fakeDepartments[this.indexOptionSelected].departmentId
            // Gán tên phòng ban được chọn là tên phòng ban cuối
            this.departmentSearch = options[this.indexOptionSelected].innerText
            return true
          }
          // Gán giá trị phòng ban được chọn là phòng ban trước đó
          this.departmentSeleted =
            this.fakeDepartments[this.indexOptionSelected].departmentId
          // Vị trí được chọn là vị trí trước vị trí hiện tại
          this.departmentSearch = options[this.indexOptionSelected].innerText
          return true
        }
      })
    },
    /**
     * Hàm chọn phòng bạn khi click chuột
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    selectedDepartment (index, department) {
      // Gán vị trí phòng ban được chọn
      this.indexOptionSelected = index
      // Gán giá trị phòng ban được chọn
      this.departmentSeleted = department.departmentId
      // Gán tên phòng ban được chọn
      this.departmentSearch = department.departmentName
      // Ẩn danh sách phòng ban
      this.isShowDepartmentList = false
    },
    /**
     * Reset lại phòng ban được chọn
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    resetDepartmentSelected () {
      // Toggle danh sách phòng ban
      this.isShowDepartmentList = !this.isShowDepartmentList
      // Gán tên của phòng ban được chọn
      this.departmentSearch = this.fakeDepartments[this.indexOptionSelected].departmentName
    },
    /**
     * Thay đổi lại giá trị phòng ban được chọn khi tìm kiếm rỗng
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    changeValueOption () {
      // Kiểm tra tên phòng ban tìm kiếm có rỗng không
      if (!this.departmentSearch) {
        // Gán vị trí được chọn là vị trí đầu tiên
        this.indexOptionSelected = 0
      }
      // Active phòng ban được chọn
      this.departmentInputActive = true
      // Hiển thị danh sách
      this.isShowDepartmentList = true
    },
    /**
     * Hàm active phòng ban được chọn
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    activeInputDepartment () {
      this.departmentInputActive = true
    },
    /**
     * Hàm reset lại giá trị tìm kiếm
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    resetDepartmentSearch () {
      this.departmentSearch = ''
      this.departmentSeleted = ''
    },
    /**
     * Hàm xử lý khi chuyển sang ô input tiếp theo
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    moveToNextInput () {
      this.departmentInputActive = false
    },
    /**
     * Hàm hiển thị danh sách phòng ban
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    showDepartmentList () {
      this.isShowDepartmentList = !this.isShowDepartmentList
      this.$refs.departmentName.focus()
    },
    /**
     * Focus vào ô input
     * CreatedBy: PTANH
     * CreatedDate: 17/06/2021
     */
    focusDepartmentInput () {
      this.$refs.departmentName.focus()
    }
  },
  watch: {
    // Theo dõi biến lưu giá trị Id phòng ban được chọn
    departmentSeleted (newValue, oldValue) {
      this.$emit('updateDepartment', newValue)
    },
    departmentSearch (newValue, oldValue) {
      // Danh sách rỗng thì thêm lỗi ngược lại cập nhật tên phòng ban tìm kiếm
      if (this.fakeDepartments.length) {
        this.$emit('removeErrorDepartment')
      }
      this.$emit('updateDepartmentSearch', newValue)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../scss/_variable.scss";
@import "./_style.scss";
</style>
