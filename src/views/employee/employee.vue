<template>
  <div class="employee">
    <!-- Loading -->
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
        <!-- Button thêm nhân viên -->
        <div class="btn-add">
          <div class="btn-add-left" @click="ShowAddForm">
            <span>Thêm mới nhân viên</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Nhóm chức năng -->
    <div class="tools">
      <div class="group-tools">
        <!-- Tìm kiếm -->
        <div class="search-ctn">
          <div class="search">
            <input type="text" v-model="filter" @input="SearchEmployee" placeholder="Tìm theo mã, tên nhân viên" />
            <div class="icon-common-medium icon-search"></div>
          </div>
        </div>

        <div class="group-tools-right">
          <!-- Button load lại dữ liệu -->
          <div class="icon-ctn">
            <div class="icon-common-large icon-refresh" @click="ReloadPage"></div>
          </div>
          <!-- Button xuất file excel -->
          <div class="icon-ctn">
            <div class="icon-common-large icon-excel"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="list-employee">
      <!-- Bảng danh sách nhân viên -->
      <table class="table">
        <!-- Tiêu đề của cột -->
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
        <!-- Nội dung của bảng -->
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
    <!-- Phần thông báo không có dữ liệu -->
    <div v-if="isShowNoContent" class="no-data">
      <img src="../../assets/img/bg_report_nodata.76e50bd8.svg" class="no-data-img"/>
      <div class="no-data-content">
        <span>Không có dữ liệu</span>
      </div>
    </div>
    <!-- Phần phân trang -->
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
        <!-- Selectbox số bản ghi trên trang -->
        <div class="list-option-number-records" v-if="isShowOptionsNumberRecords">
            <ul class="list-options">
              <li :class="['item-option', {'item-selected': item === pageSize}]" v-for="(item, index) in numberRecords" :key="index" @click="ChangeNumberRecords(item)">
                <span>{{ item }} bản ghi trên 1 trang</span>
              </li>
            </ul>
          </div>
        <!-- Component phân trang -->
        <v-pagination :totalPages="totalPages" @loadPage="LoadPage"></v-pagination>
      </div>
    </div>
    <!-- Form thêm nhân viên -->
    <add-employee
      v-if="isShowAddEmployee"
      :latestEmployeeCode="latestEmployeeCode"
      @closePopupAddEmployee="ClosePopupAddEmployee"
      @saveEmployeeSuccess="SaveEmployeeSuccess"
    ></add-employee>
    <!-- Form sửa nhân viên -->
    <edit-employee v-if="isShowEditEmployee" :employeeEdit="employee" @closePopupEditEmployee="ClosePopupEditEmployee" @saveEmployeeSuccess="SaveEmployeeSuccess"></edit-employee>
    <!-- Popup cảnh báo xóa -->
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
      isShowAddEmployee: false, // Biến hiển thị Popup thêm nhân viên
      isShowEditEmployee: false, // Biến hiển thị Popup sửa nhân viên
      isShowMoreOption: false, // Biến hiển thị tùy chọn chức năng
      isShowPopupDelete: false, // Biến hiển thị Popup cảnh báo xóa nhân viên
      isShowNoContent: false, // Biến hiển thị thông báo bảng không có dữ liệu
      isShowOptionsNumberRecords: false, // Biến hiển thị dropdown số lượng bản ghi trên trang
      screenX: 0, // Vị trí con trỏ chuột theo trục X
      screenY: 0, // Vị trí con trỏ chuột theo trục Y
      employees: null, // Biến lưu trữ danh sách nhân viên
      employee: null, // Biến lưu trữ nhân viên hiện tại
      errors: [], // Mảng lưu trữ lỗi
      pageIndex: 1, // Biến lưu trữ trang hiện tại
      pageSize: CONSTANTS.PAGE_SIZE, // Biến lưu trữ số bản ghi trên một trang
      filter: '', // Biến lưu trữ điều kiện lọc dữ liệu
      counter: 0, // Biến đếm số lần click chuột
      isShowReload: true, // Biến hiển thị Reload
      latestEmployeeCode: null, // Mã nhân viên mới nhất chưa tồn tại trong csdl
      messageDelete: null, // Thông báo xóa
      totalEmployees: 0, // Tổng số nhân viên
      totalPages: 0, // Tổng số trang
      numberRecords: [...CONSTANTS.NUMBER_RECORDS] // Các số lượng bản ghi có thể trên một trang
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
    /**
     * Lấy số lượng nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/6/2021
     */
    HTTP.get('employees/total-record')
      .then((result) => {
        this.totalEmployees = result.data
        this.totalPages = Math.ceil(this.totalEmployees / this.pageSize)
      }).catch((err) => {
        console.log(err)
      })
  },
  watch: {
    /**
     * Theo dõi biến employees
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    employees (newValue, oldValue) {
      // Nếu không có nhân viên hiển thị không có nhân viên ngược lại không hiển thị
      if (this.employees.length === 0) {
        this.isShowNoContent = true
      } else {
        this.isShowNoContent = false
      }
    }
  },
  methods: {
    /**
     * Hàm xử lý chọn dòng trong bảng
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
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
    /**
     * Hàm lấy danh sách nhân viên theo pageIndex, pageSize, filter
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
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
    /**
     * Hàm đóng Popup thêm nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    ClosePopupAddEmployee () {
      this.isShowAddEmployee = false
    },
    /**
     * Hàm theo dõi vị trí của chuột khi click
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    ResetMousePosition (employee, event) {
      this.screenX = event.screenX
      this.screenY = event.screenY
      this.isShowMoreOption = !this.isShowMoreOption
      this.employee = employee
    },
    /**
     * Hàm ẩn tùy chọn chức năng
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    OnClickOutside () {
      this.isShowMoreOption = false
    },
    /**
     * Hàm hiển thị Popup sửa khách hàng và bind dữ liệu vào Popup
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    ShowEditForm (employeeId) {
      HTTP.get(`employees/${employeeId}`)
        .then((result) => {
          this.employee = result.data
          this.isShowEditEmployee = true
        }).catch((err) => {
          console.log(err)
        })
    },
    /**
     * Hàm đóng Popup sửa khách hàng
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    ClosePopupEditEmployee () {
      this.isShowEditEmployee = false
    },
    /**
     * Hàm lưu nhân viên thành công
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    SaveEmployeeSuccess () {
      this.isShowAddEmployee = false
      this.isShowEditEmployee = false
      this.ReloadPage()
    },
    /**
     * Hàm load lại trang
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    ReloadPage () {
      this.isShowReload = true
      this.GetEmployeesPaging()
    },
    /**
     * Hàm xóa nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    DeleteEmployee () {
      HTTP.delete(`employees/${this.employee.employeeId}`)
        .then((result) => {
          this.isShowPopupDelete = false
          this.ReloadPage()
        }).catch((err) => {
          console.log(err)
        })
    },
    /**
     * Hàm hiển thị Popup thêm nhân viên và lấy mã nhân viên mới nhất chưa có trong csdl
     */
    ShowAddForm () {
      HTTP.get('employees/max-employee-code')
        .then((result) => {
          this.latestEmployeeCode = result.data
          this.isShowAddEmployee = true
        }).catch((err) => {
          console.log(err)
        })
    },
    /**
     * Hàm hiển thị Popup cảnh báo xóa nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    ShowPopupDelete () {
      this.isShowPopupDelete = true
      this.messageDelete = `Bạn có thực sự muốn xóa Nhân viên <${this.employee.employeeCode}> không?`
    },
    /**
     * Hàm đóng Popup cảnh báo xóa nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    ClosePopupDelete () {
      this.isShowPopupDelete = false
    },
    /**
     * Hàm tìm kiếm nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
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
    /**
     * Hàm gán lại số trang và load lại trang
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    LoadPage (pageNum) {
      this.pageIndex = pageNum
      this.ReloadPage()
    },
    /**
     * Hàm thay đổi số lượng bản ghi trên một trang
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    ChangeNumberRecords (pageSize) {
      this.pageSize = pageSize
      this.totalPages = Math.ceil(this.totalEmployees / this.pageSize)
      this.ReloadPage()
    },
    /**
     * Hàm đóng dropdown số lượng bản ghi trên trang
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
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
