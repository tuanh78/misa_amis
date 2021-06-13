<template>
  <div class="employee">
    <div class="loading" v-if="isShowReload">
      <i class="fa fa-spinner fa-spin"></i>
    </div>
    <div class="employee-top">
      <div class="employee-top-left">
        <div class="title-text">Nhân viên</div>
        <div class="title-icon">
          <div class="icon-common-medium icon-arrow-left"></div>
          <div class="text-blue">Tất cả danh mục</div>
        </div>
      </div>

      <div class="employee-top-right">

        <div class="btn-add">
          <div class="btn-add-left" @click="ShowAddForm">
            <span>Thêm mới nhân viên</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tools">
      <div class="group-tools">
        <div class="search-ctn">
          <div class="search">
            <input type="text" v-model="filter" @input="SearchEmployee" placeholder="Tìm theo mã, tên nhân viên" />
            <div class="icon-common-medium icon-search"></div>
          </div>
        </div>

        <div class="group-tools-right">
          <div class="icon-ctn">
            <div class="icon-common-large icon-refresh" @click="ReloadPage"></div>
          </div>
          <div class="icon-ctn">
            <div class="icon-common-large icon-excel"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="list-employee">
      <table class="table">
        <thead>
          <tr>
            <th class="space-left ms-th-viewer th-style-common"></th>
            <th
              class="ms-th-viewer ms-muli-checkall employee-checkbox th-style-common sticky-style"
            >
              <label class="ms-component con-ms-checkbox justify-center"
                ><input type="checkbox" class="ms-checkbox--input" /><span
                  class="ms-checkbox-border-disabled-false ms-checkbox-border-checked-false checkbox_x ms-checkbox"
                  ><span
                    class="ms-checkbox-inner ms-checkbox-check-disabled-false ms-checkbox--check"
                    ><div
                      class="mi mi-16 mi-checkbox-active"
                    ></div></span></span
              ></label>
            </th>
            <th class="code ms-th-viewer th-style-common">
              <span class="th-padding-right">Mã nhân viên</span>
            </th>
            <th class="fullname ms-th-viewer th-style-common">
              <span class="th-padding-right">Tên nhân viên</span>
            </th>
            <th class="gender ms-th-viewer th-style-common">
              <span class="th-padding-right">Giới tính</span>
            </th>
            <th class="date-of-birth ms-th-viewer th-style-common">
              <span class="th-padding-right">Ngày sinh</span>
            </th>
            <th class="identify-card-number ms-th-viewer th-style-common">
              <span class="th-padding-right">Số CMND</span>
            </th>
            <th class="office ms-th-viewer th-style-common">
              <span class="th-padding-right">Chức danh</span>
            </th>
            <th class="unit ms-th-viewer th-style-common">
              <span class="th-padding-right">Tên đơn vị</span>
            </th>
            <th class="bank-account-number ms-th-viewer th-style-common">
              <span class="th-padding-right">Số tài khoản</span>
            </th>
            <th class="bank-name ms-th-viewer th-style-common">
              <span class="th-padding-right">Tên ngân hàng</span>
            </th>
            <th class="bank-address ms-th-viewer th-style-common">
              <span class="th-padding-right"
                >Chi nhánh tài khoản ngân hàng</span
              >
            </th>
            <th
              class="function function-th ms-th-viewer th-style-common sticky-style"
            >
              <span class="th-padding-right">Chức năng</span>
            </th>
            <th
              class="space-right-white ms-th-viewer th-style-common sticky-style"
            ></th>
            <th
              class="space-right-gray ms-th-viewer th-style-common sticky-style"
            ></th>
          </tr>
        </thead>
        <tbody>
          <tr class="ms-tr-viewer" @click="SelectedRow" v-on:dblclick="counter += 1, ShowEditForm(employee.employeeId)" v-for="employee in employees" :key="employee.employeeId">
            <td class="space-left ms-td-viewer"></td>
            <td
              class="ms-th-viewer ms-muli-checkall employee-checkbox ms-th-viewer-custom ms-td-viewer"
            >
              <label
                class="ms-component con-ms-checkbox justify-center ms-td-viewer label-custom"
                ><input type="checkbox" class="ms-checkbox--input" /><span
                  class="ms-checkbox-border-disabled-false ms-checkbox-border-checked-false checkbox_x ms-checkbox"
                  ><span
                    class="ms-checkbox-inner ms-checkbox-check-disabled-false ms-checkbox--check"
                    ><div
                      class="mi mi-16 mi-checkbox-active"
                    ></div></span></span
              ></label>
            </td>
            <td class="ms-td-viewer code">{{ employee.employeeCode }}</td>
            <td class="ms-td-viewer fullname">{{ employee.employeeName }}</td>
            <td v-if="employee.gender === 0" class="ms-td-viewer gender">Nam</td>
            <td v-else-if="employee.gender === 1" class="ms-td-viewer gender">Nữ</td>
            <td v-else class="ms-td-viewer gender">Khác</td>
            <td class="ms-td-viewer date-of-birth td-date-of-birth">{{ employee.dateOfBirth }}</td>
            <td class="ms-td-viewer identify-card-number">
              {{ employee.identityNumber }}
            </td>
            <td class="ms-td-viewer office">{{ employee.employeePosition }}</td>
            <td class="ms-td-viewer unit">{{ employee.departmentName }}</td>
            <td class="ms-td-viewer bank-account-number">{{ employee.bankAccountNumber }}</td>
            <td class="ms-td-viewer bank-name">{{ employee.bankName }}</td>
            <td class="ms-td-viewer bank-address">{{ employee.bankBranchName }}</td>
            <td class="ms-td-viewer function td-function">
              <div class="edit-form-ctn">
                <button class="edit-form" @click="ShowEditForm(employee.employeeId)">
                  <span class="edit-form-text">Sửa</span>
                </button>
                <button class="edit-option" @click="ResetMousePosition(employee, $event)">
                  <div class="edit-option-sub">
                    <div class="icon-common-medium icon-arrow-down-blue"></div>
                  </div>
                </button>
              </div>
            </td>
            <td class="space-right-white ms-td-viewer"></td>
            <td class="space-right-gray ms-td-viewer"></td>
          </tr>
          <more-option v-if="isShowMoreOption" @showPopupDelete="ShowPopupDelete" :screenX="screenX" :screenY="screenY" v-click-outside="OnClickOutside"></more-option>
        </tbody>
      </table>
    </div>
    <div v-if="isShowNoContent" class="no-data">
      <img src="../../assets/img/bg_report_nodata.76e50bd8.svg" class="no-data-img"/>
      <div class="no-data-content">
        <span>Không có dữ liệu</span>
      </div>
    </div>

    <div v-if="!isShowNoContent" class="pagination-bar">
      <div class="left-pagination">
        <span>Tổng số: <span class="text-bold">{{ totalEmployees }}</span> bản ghi</span>
      </div>
      <div class="right-pagination">
        <div class="total-record">
          <div class="total-record-detail-ctn">
            <span class="total-record-detail">{{ pageSize }} bản ghi trên 1 trang</span>
          </div>
          <div class="icon-arrow-down-ctn" @click="isShowOptionsNumberRecords = !isShowOptionsNumberRecords" v-click-outside="CloseOptionsNumberRecords">
            <div class="icon-common-medium icon-arrow-down"></div>
          </div>
        </div>
        <div class="list-option-number-records" v-if="isShowOptionsNumberRecords">
            <ul class="list-options">
              <li :class="['item-option', {'item-selected': item === pageSize}]" v-for="(item, index) in numberRecords" :key="index" @click="ChangeNumberRecords(item)">
                <span>{{ item }} bản ghi trên 1 trang</span>
              </li>
            </ul>
          </div>
        <v-pagination :totalPages="totalPages" @loadPage="LoadPage"></v-pagination>
      </div>
    </div>
    <add-employee
      v-if="isShowAddEmployee"
      :latestEmployeeCode="latestEmployeeCode"
      @closePopupAddEmployee="ClosePopupAddEmployee"
      @saveEmployeeSuccess="SaveEmployeeSuccess"
    ></add-employee>
    <edit-employee v-if="isShowEditEmployee" :employeeEdit="employee" @closePopupEditEmployee="ClosePopupEditEmployee" @saveEmployeeSuccess="SaveEmployeeSuccess"></edit-employee>
    <popup-delete v-if="isShowPopupDelete" :messageDelete="messageDelete" @deleteEmployee="DeleteEmployee" @closePopup="ClosePopupDelete"></popup-delete>
  </div>
</template>

<script>
import VPagination from '../../components/common/v-pagination/v-pagination.vue'
import AddEmployee from '../../components/pages/employee/add-employee/add-employee'
import EditEmployee from '../../components/pages/employee/edit-employee/edit-employee.vue'
import MoreOption from '../../components/common/more-option/more-option'
import PopupDelete from '../../components/pages/employee/popup-delete/popup-delete.vue'
import vClickOutside from 'v-click-outside'
import Vue from 'vue'
import { HTTP } from '../../axios/http-common'
import CONSTANTS from '../../constants/constants'
var debounce = require('lodash.debounce')
Vue.use(vClickOutside)
var moment = require('moment') // require
export default {
  data () {
    return {
      isShowAddEmployee: false,
      isShowEditEmployee: false,
      isShowMoreOption: false,
      isShowPopupDelete: false,
      isShowNoContent: false,
      isShowOptionsNumberRecords: false,
      screenX: 0,
      screenY: 0,
      employees: null,
      employee: null,
      errors: [],
      pageIndex: 1,
      pageSize: CONSTANTS.PAGE_SIZE,
      filter: '',
      counter: 0,
      isShowReload: true,
      latestEmployeeCode: null,
      messageDelete: null,
      totalEmployees: 0,
      totalPages: 0,
      numberRecords: [...CONSTANTS.NUMBER_RECORDS]
    }
  },
  components: {
    VPagination,
    AddEmployee,
    EditEmployee,
    MoreOption,
    PopupDelete
  },
  created () {
    this.GetEmployeesPaging()
    HTTP.get('employees/total-record')
      .then((result) => {
        this.totalEmployees = result.data
        this.totalPages = Math.ceil(this.totalEmployees / this.pageSize)
      }).catch((err) => {
        console.log(err)
      })
  },
  watch: {
    employees (newValue, oldValue) {
      if (this.employees.length === 0) {
        this.isShowNoContent = true
      } else {
        this.isShowNoContent = false
      }
    }
  },
  methods: {
    SelectedRow (event) {
      if (event.target.parentNode.classList.contains('row-selected')) {
        event.target.parentNode.classList.remove('row-selected')
      } else {
        var rows = this.$el.querySelectorAll('.ms-tr-viewer')
        rows.forEach((row) => {
          row.classList.remove('row-selected')
        })
        event.target.parentNode.classList.add('row-selected')
      }
    },
    GetEmployeesPaging () {
      HTTP.get(`employees/paging?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&filter=${this.filter}`)
        .then(response => {
          this.employees = response.data

          this.employees.map(employee => {
            if (employee.dateOfBirth) {
              employee.dateOfBirth = moment(employee.dateOfBirth).format(CONSTANTS.DATE_FORMAT)
            }
            return employee
          })
          this.isShowReload = false
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    ClosePopupAddEmployee () {
      this.isShowAddEmployee = false
    },
    ResetMousePosition (employee, event) {
      this.screenX = event.screenX
      this.screenY = event.screenY
      this.isShowMoreOption = !this.isShowMoreOption
      this.employee = employee
    },
    OnClickOutside () {
      this.isShowMoreOption = false
    },
    ShowEditForm (employeeId) {
      HTTP.get(`employees/${employeeId}`)
        .then((result) => {
          this.employee = result.data
          this.isShowEditEmployee = true
        }).catch((err) => {
          console.log(err)
        })
    },
    ClosePopupEditEmployee () {
      this.isShowEditEmployee = false
    },
    SaveEmployeeSuccess () {
      this.isShowAddEmployee = false
      this.isShowEditEmployee = false
      this.ReloadPage()
    },
    ReloadPage () {
      this.isShowReload = true
      this.GetEmployeesPaging()
    },
    DeleteEmployee () {
      HTTP.delete(`employees/${this.employee.employeeId}`)
        .then((result) => {
          this.isShowPopupDelete = false
          this.ReloadPage()
        }).catch((err) => {
          console.log(err)
        })
    },
    ShowAddForm () {
      HTTP.get('employees/max-employee-code')
        .then((result) => {
          this.latestEmployeeCode = result.data
          this.isShowAddEmployee = true
        }).catch((err) => {
          console.log(err)
        })
    },
    ShowPopupDelete () {
      this.isShowPopupDelete = true
      this.messageDelete = `Bạn có thực sự muốn xóa Nhân viên <${this.employee.employeeCode}> không?`
    },
    ClosePopupDelete () {
      this.isShowPopupDelete = false
    },
    SearchEmployee: debounce(function () {
      HTTP.get(`employees/paging?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&filter=${this.filter}`)
        .then(response => {
          this.employees = response.data
          this.totalEmployees = this.employees.length
          this.totalPages = Math.ceil(this.totalEmployees / this.pageSize)
          HTTP.get(`employees/numbers-record?filter=${this.filter}`)
            .then((result) => {
              this.totalEmployees = result.data
              this.totalPages = Math.ceil(this.totalEmployees / this.pageSize)
            }).catch((err) => {
              console.log(err)
            })
          this.employees.map(employee => {
            if (employee.dateOfBirth) {
              employee.dateOfBirth = moment(employee.dateOfBirth).format(CONSTANTS.DATE_FORMAT)
            }
            return employee
          })
        })
        .catch(e => {
          this.errors.push(e)
        })
    }, 500),
    LoadPage (pageNum) {
      this.pageIndex = pageNum
      this.ReloadPage()
    },
    ChangeNumberRecords (pageSize) {
      this.pageSize = pageSize
      this.totalPages = Math.ceil(this.totalEmployees / this.pageSize)
      this.ReloadPage()
    },
    CloseOptionsNumberRecords () {
      this.isShowOptionsNumberRecords = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/_variable.scss";
@import "./_style.scss";
</style>
