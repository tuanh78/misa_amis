<template>
  <div
    :class="[
      'autocomplete-department',
      {'border-error': errorProperties.includes('departmentId')},
      { 'input-active': departmentInputActive },
    ]"
    @click="[departmentInputActive = true]"
    @keydown.enter="ResetDepartmentSelected"
    v-click-outside="HiddenDropdownOption"
    shortkey
  >
    <tool-tip v-if="errorProperties.includes('departmentId')" :message="!departmentSearch ? 'Đơn vị không được để trống.' : 'Dữ liệu không có trong danh sách.'"></tool-tip>
    <div>
      <input
        id="autocomplete"
        @input="
          FilterDepartment();
          InputChangedValue();
        "
        @keydown.40="MoveDownOption"
        @keydown.38="MoveUpOption"
        @click="ChangeValueOption"
        v-model="departmentSearch"
        autocomplete="off"
      />
      <label
        class="department-icon-ctn"
        for="autocomplete"
        @click.prevent="isShowDepartmentList = !isShowDepartmentList"
      >
        <div class="icon-common-medium icon-arrow-down"></div>
      </label>
    </div>
    <div
      class="dropdown-option"
      v-if="isShowDepartmentList"
      @keydown.40="MoveDownOption"
      @keydown.38="MoveUpOption"
    >
      <div class="department-title">
        <span>Tên đơn vị</span>
      </div>
      <ul :class="['list-option', { 'list-option-height': isShowLoading }]">
        <li
          v-for="(department, index) in fakeDepartments"
          :key="index"
          @click="SelectedDepartment(index, department)"
        >
          <a
            href="#"
            :class="[
              'option-item',
              {
                'selected-option':
                  department.departmentId === departmentSeleted
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
        this.departments = result.data
        this.fakeDepartments = [...this.departments]
      })
      .catch((err) => {
        console.log(err)
      })

    EventBus.$on('moveToDepartment', this.ActiveInputDepartment)
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
    // Stop listening the event hello with handler
    EventBus.$off('moveToDepartment', this.ChangeValueOption)
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
    HiddenDropdownOption () {
      this.departmentInputActive = false
      this.isShowDepartmentList = false
    },
    /**
     * Hàm lọc danh sách phòng ban
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    FilterDepartment: debounce(function () {
      if (this.departmentSearch === '') {
        this.fakeDepartments = [...this.departments]
        this.departmentSeleted = this.fakeDepartments[0].departmentId
        this.indexOptionSelected = 0
        this.isShowLoading = false
      } else {
        this.fakeDepartments = this.departments.filter((item) => {
          return item.departmentName.toLowerCase().indexOf(this.departmentSearch.toLowerCase()) !== -1
        })
        if (this.fakeDepartments.length > 0) {
          this.departmentSeleted = this.fakeDepartments[0].departmentId
          this.indexOptionSelected = 0
          this.isShowLoading = false
        }
        this.isShowLoading = false
      }
      if (!this.departmentSearch || !this.fakeDepartments.length) {
        this.$emit('addErrorDepartment')
      } else {
        this.$emit('removeErrorDepartment')
      }
    }, 500),
    /**
     * Hàm thực hiện giá trị tìm kiếm thay đổi
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    InputChangedValue () {
      this.isShowLoading = true
      this.isShowDepartmentList = true
    },
    /**
     * Hàm di chuyển lựa chọn phòng ban xuống dưới
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    MoveDownOption () {
      if (!this.departmentSeleted) {
        this.departmentSeleted = this.fakeDepartments[0].departmentId
      }
      this.isShowDepartmentList = true
      const options = [...this.$el.querySelectorAll('.option-item')]
      options.forEach((option, index) => {
        if (
          option.classList.contains('selected-option') &&
          this.indexOptionSelected < this.fakeDepartments.length
        ) {
          this.indexOptionSelected = index + 1
          if (this.indexOptionSelected === this.fakeDepartments.length) {
            this.indexOptionSelected = 0
            this.departmentSeleted = this.fakeDepartments[0].departmentId
            this.departmentSearch = options[0].innerText
            return true
          }
          this.departmentSeleted =
            this.fakeDepartments[this.indexOptionSelected].departmentId
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
    MoveUpOption () {
      if (!this.departmentSeleted) {
        this.departmentSeleted = this.fakeDepartments[0].departmentId
      }
      this.isShowDepartmentList = true
      const options = [...this.$el.querySelectorAll('.option-item')]
      options.forEach((option, index) => {
        if (
          option.classList.contains('selected-option') &&
          this.indexOptionSelected >= 0
        ) {
          this.indexOptionSelected = index - 1
          if (this.indexOptionSelected === -1) {
            this.indexOptionSelected = options.length - 1
            this.departmentSeleted =
              this.fakeDepartments[this.indexOptionSelected].departmentId
            this.departmentSearch = options[this.indexOptionSelected].innerText
            return true
          }
          this.departmentSeleted =
            this.fakeDepartments[this.indexOptionSelected].departmentId
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
    SelectedDepartment (index, department) {
      this.indexOptionSelected = index
      this.departmentSeleted = department.departmentId
      this.departmentSearch = department.departmentName
      this.isShowDepartmentList = false
    },
    // HiddenDepartmentList () {
    //   console.log('ok')
    // },
    /**
     * Reset lại phòng ban được chọn
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    ResetDepartmentSelected () {
      this.isShowDepartmentList = !this.isShowDepartmentList
      this.departmentSearch = this.fakeDepartments[this.indexOptionSelected].departmentName
    },
    /**
     * Thay đổi lại giá trị phòng ban được chọn khi tìm kiếm rỗng
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    ChangeValueOption () {
      if (!this.departmentSearch) {
        this.departmentSeleted = this.fakeDepartments[0].departmentId
        this.indexOptionSelected = 0
      }
      this.departmentInputActive = true
      this.isShowDepartmentList = true
    },
    ActiveInputDepartment () {
      this.departmentInputActive = true
    }
  },
  watch: {
    // Theo dõi biến lưu giá trị Id phòng ban được chọn
    departmentSeleted (newValue, oldValue) {
      this.$emit('updateDepartment', newValue)
    },
    departmentSearch (newValue, oldValue) {
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
