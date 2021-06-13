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
  >
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
var debounce = require('lodash.debounce')
export default {
  /*

  */
  created () {
    HTTP.get('departments')
      .then((result) => {
        this.departments = result.data
        this.fakeDepartments = [...this.departments]
      })
      .catch((err) => {
        console.log(err)
      })
  },
  data () {
    return {
      departments: [],
      fakeDepartments: [],
      isShowDepartmentList: false,
      departmentInputActive: false,
      departmentSearch: this.departmentName,
      isShowLoading: false,
      departmentSeleted: this.departmentId,
      indexOptionSelected: 0
    }
  },
  props: {
    errorProperties: {
      type: Array
    },
    departmentName: {
      type: String,
      default: ''
    },
    departmentId: {
      type: String,
      default: ''
    }
  },
  methods: {
    HiddenDropdownOption () {
      this.departmentInputActive = false
      this.isShowDepartmentList = false
    },
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
    }, 500),
    InputChangedValue () {
      this.isShowLoading = true
      this.isShowDepartmentList = true
    },
    MoveDownOption () {
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
    MoveUpOption () {
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
    SelectedDepartment (index, department) {
      this.indexOptionSelected = index
      this.departmentSeleted = department.departmentId
      this.departmentSearch = department.departmentName
      this.isShowDepartmentList = false
    },
    HiddenDepartmentList () {
      console.log('ok')
    },
    ResetDepartmentSelected () {
      this.isShowDepartmentList = !this.isShowDepartmentList
      this.departmentSearch = this.fakeDepartments[this.indexOptionSelected].departmentName
    },
    ChangeValueOption () {
      if (!this.departmentSearch) {
        this.departmentSeleted = this.fakeDepartments[0].departmentId
        this.indexOptionSelected = 0
      }
      this.isShowDepartmentList = true
    }
  },
  watch: {
    departmentSeleted (newValue, oldValue) {
      this.$emit('updateDepartment', newValue)
    },
    departmentSearch (newValue) {
      if (!this.departmentSearch) {
        this.$emit('addErrorDepartment')
      } else {
        this.$emit('removeErrorDepartment')
      }
    },
    fakeDepartments (newValue) {
      if (!this.fakeDepartments.length) {
        this.$emit('addErrorDepartment')
      } else {
        this.$emit('removeErrorDepartment')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../scss/_variable.scss";
@import "./_style.scss";
</style>
