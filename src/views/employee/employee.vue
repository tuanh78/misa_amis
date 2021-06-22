<template>
  <div class="employee" @scroll="handleScroll" ref="employee">
    <!-- Loading -->
    <div class="loading" v-if="isShowReload">
    </div>
    <div class="employee-top" :style="{top: employeeTopValue + '%'}">
      <div class="employee-top-atop">
        <div class="employee-top-left">
          <div class="title-text">Nhân viên</div>
        </div>

        <div class="employee-top-right">
          <!-- Button thêm nhân viên -->
          <div class="btn-add">
            <div class="btn-add-left" @click="showAddForm">
              <span>Thêm mới nhân viên</span>
            </div>
          </div>
        </div>
      </div>
      <div class="title-icon employee-top-bottom">
        <div class="icon-common-medium icon-arrow-left"></div>
        <div class="text-blue">Tất cả danh mục</div>
      </div>
      <div class="right-padding"></div>
    </div>
    <!-- Nhóm chức năng -->
    <div class="tools">
      <div class="group-tools">
        <!-- Tìm kiếm -->
        <div class="search-ctn">
          <div class="search">
            <input type="text" v-model="filter" @input="searchEmployee" placeholder="Tìm theo mã, tên nhân viên" />
            <div class="icon-common-medium icon-search"></div>
          </div>
        </div>

        <div class="group-tools-right">
          <!-- Button load lại dữ liệu -->
          <div class="icon-ctn icon-refresh-ctn">
            <div class="icon-common-large icon-refresh" @click="reloadPage"></div>
            <tool-tip message="Lấy lại dữ liệu"></tool-tip>
          </div>
          <!-- Button xuất file excel -->
          <div class="icon-ctn icon-excel-ctn">
            <div class="icon-common-large icon-excel" @click="exportFileExcel"></div>
            <tool-tip message="Xuất ra Excel"></tool-tip>
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
                ><input type="checkbox" class="ms-checkbox--input" v-model="isSelectedAll" @click="selectedAllEmployees"/><span
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
                >Chi nhánh TK ngân hàng</span
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
          <tr class="ms-tr-viewer" @click="selectedRow" v-on:dblclick="counter += 1, showEditForm(employee.employeeId)" v-for="employee in employees" :key="employee.employeeId">
            <td class="space-left ms-td-viewer"></td>
            <td
              class="ms-th-viewer ms-muli-checkall employee-checkbox ms-th-viewer-custom ms-td-viewer"
            >
              <label
                class="ms-component con-ms-checkbox justify-center ms-td-viewer label-custom"
                ><input type="checkbox" class="ms-checkbox--input" v-model="employeesSelected" :value="employee.employeeId" /><span
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
                <button class="edit-form" @click="showEditForm(employee.employeeId)">
                  <span class="edit-form-text">Sửa</span>
                </button>
                <button class="edit-option" @click="resetMousePosition(employee, $event)">
                  <div class="edit-option-sub">
                    <div class="icon-common-medium icon-arrow-down-blue"></div>
                  </div>
                </button>
              </div>
            </td>
            <td class="space-right-white ms-td-viewer"></td>
            <td class="space-right-gray ms-td-viewer"></td>
          </tr>
          <more-option v-if="isShowMoreOption" @showPopupDelete="showPopupDelete" :screenX="screenX" :screenY="screenY" v-click-outside="onClickOutside"></more-option>
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
        <span><span class="total">Tổng số:</span> <span class="text-bold">{{ totalEmployees }}</span> bản ghi</span>
      </div>
      <div class="right-pagination">
        <div :class="['total-record', {'total-record-active': isActiveTotalRecord}]" @click="isActiveTotalRecord = true" v-click-outside="closeOptionsNumberRecords">
          <div class="total-record-detail-ctn" ref="numberRecords">
            <input class="total-record-detail" ref="inputNumberRecord" :value="`${pageSize} bản ghi trên 1 trang`" readonly @keydown.40.prevent="moveDownOption" @keydown.38.prevent="moveUpOption" @keydown.enter="reloadPageWithPageSize"/>
          </div>
          <div class="icon-arrow-down-ctn" @click="toggleDropDownOption">
            <div :class="['icon-common-medium', 'icon-arrow-down', {'icon-arrow-down-open': isShowOptionsNumberRecords}]"></div>
          </div>
        </div>
        <!-- Selectbox số bản ghi trên trang -->
        <div class="list-option-number-records" :style="{top: screenY - 170 + 'px', left: screenX - 1 + 'px'}" v-if="isShowOptionsNumberRecords">
            <ul class="list-options">
              <li :class="['item-option', {'item-selected': item === pageSize}]" v-for="(item, index) in numberRecords" :key="index" @click="changeNumberRecords(item, index)">
                <span>{{ item }} bản ghi trên 1 trang</span>
              </li>
            </ul>
          </div>
        <!-- Component phân trang -->
        <v-pagination :totalPages="totalPages" @loadPage="loadPage"></v-pagination>
      </div>
    </div>
    <!-- Form thêm nhân viên -->
    <add-employee
      v-if="isShowAddEmployee"
      :latestEmployeeCode="latestEmployeeCode"
      @closePopupAddEmployee="closePopupAddEmployee"
      @saveEmployeeSuccess="saveEmployeeSuccess"
      @saveEmployeeSuccessAndAdd="saveEmployeeSuccessAndAdd"
    ></add-employee>
    <!-- Form sửa nhân viên -->
    <edit-employee v-if="isShowEditEmployee" :employeeEdit="employee" @closePopupEditEmployee="closePopupEditEmployee" @saveEmployeeSuccess="saveEmployeeSuccess" @saveEmployeeSuccessAndAdd="saveEmployeeSuccessAndAdd"></edit-employee>
    <!-- Popup cảnh báo xóa -->
    <popup-delete v-if="isShowPopupDelete" :messageDelete="messageDelete" @deleteEmployee="deleteEmployee" @closePopup="closePopupDelete"></popup-delete>
  </div>
</template>

<script>
import VPagination from '../../components/common/v-pagination/v-pagination.vue'
import AddEmployee from '../../components/pages/employee/add-employee/add-employee'
import EditEmployee from '../../components/pages/employee/edit-employee/edit-employee.vue'
import MoreOption from '../../components/common/more-option/more-option'
import PopupDelete from '../../components/pages/employee/popup-delete/popup-delete.vue'
import vClickOutside from 'v-click-outside'
import ToolTip from '../../components/common/tool-tip/tool-tip.vue'
import Vue from 'vue'
import { HTTP } from '../../axios/http-common'
import CONSTANTS from '../../constants/constants'
var debounce = require('lodash.debounce')
Vue.use(vClickOutside)
var moment = require('moment') // require
const FileDownload = require('js-file-download')
export default {
  data () {
    return {
      isShowAddEmployee: false, // Biến hiển thị Popup thêm nhân viên
      isShowEditEmployee: false, // Biến hiển thị Popup sửa nhân viên
      isShowMoreOption: false, // Biến hiển thị tùy chọn chức năng
      isShowPopupDelete: false, // Biến hiển thị Popup cảnh báo xóa nhân viên
      isShowNoContent: false, // Biến hiển thị thông báo bảng không có dữ liệu
      isShowOptionsNumberRecords: false, // Biến hiển thị dropdown số lượng bản ghi trên trang
      isActiveTotalRecord: false, // Biến xác định Selectedbox số lượng bản ghi trên trang được chọn hay không
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
      numberRecords: [...CONSTANTS.NUMBER_RECORDS], // Các số lượng bản ghi có thể trên một trang
      indexOptionSelected: 0, // Vị trí số lượng bản ghi đang chọn
      employeesSelected: [], // Danh sách nhân viên đang chọn
      isSelectedAll: false, // Biến trạng thái chọn tất cả nhân viên
      employeeTopValue: 0, // Biến lưu top của section employee code
      lastScrollTop: 0 // Biến lưu lại giá trị của scroll top
    }
  },
  components: {
    VPagination,
    AddEmployee,
    EditEmployee,
    MoreOption,
    PopupDelete,
    ToolTip
  },
  created () {
    // Lấy nhân viên theo điều kiện
    this.GetEmployeesPaging()
    /**
     * Lấy số lượng nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/6/2021
     */

    /**
     * Xử lý sự kiện khi người dùng scroll chuột
     * CreatedBy: PTANH
     * CreatedDate: 17/6/2021
     */
    // this.handleDebouncedScroll = debounce(this.handleScroll, 100)
    // window.addEventListener('scroll', this.handleDebouncedScroll)
    HTTP.get('employees/numbers-record')
      .then((result) => {
        // Lưu lại tổng số lượng bản ghi
        this.totalEmployees = result.data
        // Tổng số trang
        this.totalPages = Math.ceil(this.totalEmployees / this.pageSize)
      }).catch((err) => {
        // Log lỗi
        console.log(err)
      })
  },
  // beforeDestroy () {
  //   window.removeEventListener('scroll', this.handleDebouncedScroll)
  // },
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
    selectedRow (event) {
      // Kiểm tra hàng hiện tại đã được chọn hay chưa
      if (event.target.parentNode.classList.contains('row-selected')) {
        // Xóa class
        event.target.parentNode.classList.remove('row-selected')
      } else {
        // Lấy ra tất cả element các hàng
        var rows = this.$el.querySelectorAll('.ms-tr-viewer')
        rows.forEach((row) => {
          // Xóa các element có class row-selected
          row.classList.remove('row-selected')
        })
        // Thêm class row-selected cho dòng được chọn
        event.target.parentNode.classList.add('row-selected')
      }
    },
    /**
     * Hàm lấy danh sách nhân viên theo pageIndex, pageSize, filter
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    GetEmployeesPaging () {
      // Lấy nhân viên theo điều kiện
      HTTP.get(`employees/paging?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&filter=${this.filter}`)
        .then(response => {
          this.employees = response.data
          if (response.status === 200) {
            this.employees.map(employee => {
              // Kiểm tra ngày sinh có rỗng hay không
              if (employee.dateOfBirth) {
                // Format lại ngày sinh
                employee.dateOfBirth = moment(employee.dateOfBirth).format(CONSTANTS.DATE_FORMAT)
              }
              return employee
            })
          }
          // Tắt reload
          this.isShowReload = false
        })
        .catch(e => {
          // Log lỗi
          this.errors.push(e)
        })
    },
    /**
     * Hàm đóng Popup thêm nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    closePopupAddEmployee () {
      this.isShowAddEmployee = false
    },
    /**
     * Hàm theo dõi vị trí của chuột khi click
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    resetMousePosition (employee, event) {
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
    onClickOutside () {
      this.isShowMoreOption = false
    },
    /**
     * Hàm hiển thị Popup sửa khách hàng và bind dữ liệu vào Popup
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    showEditForm (employeeId) {
      HTTP.get(`employees/${employeeId}`)
        .then((result) => {
          this.employee = result.data
          // Hiển thị Popup sửa nhân viên
          this.isShowEditEmployee = true
        }).catch((err) => {
          // Log lỗi
          console.log(err)
        })
    },
    /**
     * Hàm đóng Popup sửa khách hàng
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    closePopupEditEmployee () {
      // Đóng Popup sửa nhân viên
      this.isShowEditEmployee = false
    },
    /**
     * Hàm lưu nhân viên thành công
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    saveEmployeeSuccess () {
      // Đóng Popup thêm nhân viên
      this.isShowAddEmployee = false
      // Đóng Popup sửa nhân viên
      this.isShowEditEmployee = false
      // Load lại trang
      this.reloadPage()
    },
    /**
     * Hàm load lại trang
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    reloadPage () {
      this.isShowReload = true
      this.GetEmployeesPaging()
    },
    /**
     * Hàm xóa nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    deleteEmployee () {
      HTTP.delete(`employees/${this.employee.employeeId}`)
        .then((result) => {
          this.isShowPopupDelete = false
          // Lấy số lượng bản ghi theo điều kiện
          HTTP.get(`employees/numbers-record?filter=${this.filter}`)
            .then((result) => {
              this.totalEmployees = result.data
              // Tính tổng số lượng trang
              this.totalPages = Math.ceil(this.totalEmployees / this.pageSize)
              // Load lại trang
              this.reloadPage()
            }).catch((err) => {
              // Log lỗi
              console.log(err)
            })
        }).catch((err) => {
          // Log lỗi
          console.log(err)
        })
    },
    /**
     * Hàm hiển thị Popup thêm nhân viên và lấy mã nhân viên mới nhất chưa có trong csdl
     */
    showAddForm () {
      HTTP.get('employees/new-code')
        .then((result) => {
          // Lưu lại mã khách hàng mới
          this.latestEmployeeCode = result.data
          // Hiển thị Popup thêm nhân viên
          this.isShowAddEmployee = true
        }).catch((err) => {
          // Log lỗi
          console.log(err)
        })
    },
    /**
     * Hàm hiển thị Popup cảnh báo xóa nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    showPopupDelete () {
      // Hiển thị Popup cảnh báo xóa
      this.isShowPopupDelete = true
      // Thông báo xóa
      this.messageDelete = `Bạn có thực sự muốn xóa Nhân viên <${this.employee.employeeCode}> không?`
    },
    /**
     * Hàm đóng Popup cảnh báo xóa nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    closePopupDelete () {
      // Đóng Popup thông báo xóa
      this.isShowPopupDelete = false
    },
    /**
     * Hàm tìm kiếm nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    searchEmployee: debounce(function () {
      // Lấy danh sách nhân viên theo điều kiện
      HTTP.get(`employees/paging?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&filter=${this.filter}`)
        .then(response => {
          this.employees = response.data
          // Số lượng nhân viên
          this.totalEmployees = this.employees.length
          // Tính số lượng trang
          this.totalPages = Math.ceil(this.totalEmployees / this.pageSize)
          // Lấy số lượng nhân viên
          HTTP.get(`employees/numbers-record?filter=${this.filter}`)
            .then((result) => {
              this.totalEmployees = result.data
              // Tính tổng số lượng nhân viên
              this.totalPages = Math.ceil(this.totalEmployees / this.pageSize)
            }).catch((err) => {
              // Log lỗi
              console.log(err)
            })
          // Kiểm tra có nhân viên nào không
          if (this.employees.length || this.employees !== '') {
            this.employees.map(employee => {
              if (employee.dateOfBirth) {
                // Format lại định dạng dữ liệu của ngày sinh
                employee.dateOfBirth = moment(employee.dateOfBirth).format(CONSTANTS.DATE_FORMAT)
              }
              return employee
            })
          }
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
    loadPage (pageNum) {
      this.pageIndex = pageNum
      // Load lại trang
      this.reloadPage()
    },
    /**
     * Hàm thay đổi số lượng bản ghi trên một trang
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    changeNumberRecords (pageSize, index) {
      // Gán vị trí số lượng bản ghi được chọn
      this.indexOptionSelected = index
      // Gán số lượng bản ghi trên một trang
      this.pageSize = pageSize
      // Tính số lượng trang
      this.totalPages = Math.ceil(this.totalEmployees / this.pageSize)
      // Load lại trang
      this.reloadPage()
    },
    /**
     * Hàm đóng dropdown số lượng bản ghi trên trang
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    closeOptionsNumberRecords () {
      // Đóng danh sách số lượng bản ghi trên trang
      this.isShowOptionsNumberRecords = false
      // Tắt active ô số lượng bản ghi
      this.isActiveTotalRecord = false
    },
    /**
     * Hàm ẩn hiện dropdown số lượng bản ghi trên trang
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    toggleDropDownOption () {
      // Focus vào ô số lượng bản ghi
      this.$refs.inputNumberRecord.focus()
      // Toggle danh sách số lượng bản ghi
      this.isShowOptionsNumberRecords = !this.isShowOptionsNumberRecords
      // Lấy vị trí theo trục X của ô hiển thị số lượng bản ghi
      this.screenX = this.$refs.numberRecords.getBoundingClientRect().left
      // Lấy vị trí theo trục Y của ô hiển thị số lượng bản ghi
      this.screenY = this.$refs.numberRecords.getBoundingClientRect().top
    },
    /**
     * Hàm di chuyển lựa chọn xuống dưới của sô lượng bản ghi trên một trang
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    moveDownOption () {
      // Hiển thị danh sách số lượng bản ghi
      this.isShowOptionsNumberRecords = true
      // Tăng vị trí chọn bản ghi lên 1
      this.indexOptionSelected = this.indexOptionSelected + 1
      // Kiểm tra xem vị trí bản ghi đã vượt quá vị trí hợp lệ hay chưa
      if (this.indexOptionSelected === this.numberRecords.length) {
        // Gán lại vị trí được chọn về 0
        this.indexOptionSelected = 0
      }
      // Gán số lượng bản ghi trên trang
      this.pageSize = this.numberRecords[this.indexOptionSelected]
      // Vị trí danh sách theo trục X
      this.screenX = this.$refs.numberRecords.getBoundingClientRect().left
      // Vị trí danh sách theo trục Y
      this.screenY = this.$refs.numberRecords.getBoundingClientRect().top
    },
    /**
     * Hàm di chuyển lựa chọn xuống lên của sô lượng bản ghi trên một trang
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    moveUpOption () {
      // Hiển thị danh sách số lượng bản ghi trên trang
      this.isShowOptionsNumberRecords = true
      // Giảm vị trí chọn bản ghi đi 1
      this.indexOptionSelected = this.indexOptionSelected - 1
      // Kiểm tra xem vị trí bản ghi đã vượt quá vị trí hợp lệ hay chưa
      if (this.indexOptionSelected < 0) {
        // Gán vị trí chọn bản ghi về cuối
        this.indexOptionSelected = this.numberRecords.length - 1
      }
      // Gán số lượng bản ghi trên trang
      this.pageSize = this.numberRecords[this.indexOptionSelected]
      // Vị trí của danh sách bản ghi theo trục X
      this.screenX = this.$refs.numberRecords.getBoundingClientRect().left
      // Vị trí của danh sách bản ghi theo trục Y
      this.screenY = this.$refs.numberRecords.getBoundingClientRect().top
    },

    /**
     * Hàm Load lại trang với kích thước trang mới
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    reloadPageWithPageSize () {
      // Tính số lượng trang
      this.totalPages = Math.ceil(this.totalEmployees / this.pageSize)
      // Đóng danh sách số lượng bản ghi trên trang
      this.isShowOptionsNumberRecords = false
      // Load lại trang
      this.reloadPage()
    },

    /**
     * Hàm xuất dữ liệu ra file excel
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    exportFileExcel () {
      // Gọi API
      HTTP.get('employees/export', {
        responseType: 'blob'
      })
        .then((result) => {
          FileDownload(result.data, 'DanhSachNhanVien.xlsx')
        }).catch((err) => {
          console.log(err)
        })
    },

    /**
     * Hàm sau khi lưu nhân viên và thêm
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    saveEmployeeSuccessAndAdd () {
      // Load lại trang
      this.reloadPage()
    },
    /**
     * Hàm chọn tất cả nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    selectedAllEmployees () {
      // Kiểm tra xem tất cả nhân viên được chọn hay chưa
      if (!this.isSelectedAll) {
        this.employees.forEach(item => {
          this.employeesSelected.push(item.employeeId)
        })
      } else {
        this.employeesSelected = []
      }
    },
    /**
     * Hàm xử lý sự kiện scroll
     * CreatedBy: PTANH
     * CreatedDate: 17/06/2021
     */
    handleScroll (event) {
      var st = event.target.scrollTop
      if (st > this.lastScrollTop) {
        // downscroll code
        this.employeeTopValue = -100
      } else {
      // upscroll code
        if (this.employeeTopValue !== 0) {
          this.employeeTopValue = 0
        }
      }
      this.lastScrollTop = st <= 0 ? 0 : st
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../scss/_variable.scss";
@import "./_style.scss";
</style>
