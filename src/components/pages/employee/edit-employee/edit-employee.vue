<template>
  <div class="add-employee" @keydown.27="checkChangeData">
    <!-- Loading -->
    <div class="loading" v-if="isShowLoading">
    </div>
    <div class="form-ctn">
      <div class="popup-header">
        <div class="popup-header-left">
          <div class="popup-header-title">Thông tin nhân viên</div>
          <div class="customer">
            <label class="ms-component con-ms-checkbox px-6"
              ><input type="checkbox" class="ms-checkbox--input" /><span
                class="
                  ms-checkbox-border-disabled-false
                  ms-checkbox-border-checked-true
                  checkbox_x
                  ms-checkbox
                "
                ><span
                  class="
                    ms-checkbox-inner ms-checkbox-check-disabled-false
                    ms-checkbox--check
                  "
                >
                  <div
                    data-v-650c2276=""
                    class="mi mi-16 mi-checkbox-active"
                  ></div> </span
                ><!----></span
              ><span class="con-slot-label"
                ><div class="con-ms-tooltip">
                  <div class="msTooltipParent">
                    <div
                      class="ms-tooltip"
                      style="
                        left: 0px;
                        top: 0px;
                        position: fixed;
                        display: none;
                      "
                    ></div>
                  </div>
                  <div class="tooltip-content">Là khách hàng</div>
                </div></span
              ></label
            >
          </div>
          <div class="supplier">
            <label class="ms-component con-ms-checkbox px-6"
              ><input type="checkbox" class="ms-checkbox--input" /><span
                class="
                  ms-checkbox-border-disabled-false
                  ms-checkbox-border-checked-false
                  checkbox_x
                  ms-checkbox
                "
                ><span
                  class="
                    ms-checkbox-inner ms-checkbox-check-disabled-false
                    ms-checkbox--check
                  "
                >
                  <div
                    data-v-650c2276=""
                    class="mi mi-16 mi-checkbox-active"
                  ></div> </span
                ><!----></span
              ><span class="con-slot-label"
                ><div class="con-ms-tooltip">
                  <div class="msTooltipParent">
                    <div
                      class="ms-tooltip"
                      style="
                        left: 0px;
                        top: 0px;
                        position: fixed;
                        display: none;
                      "
                    ></div>
                  </div>
                  <div class="tooltip-content">Là nhà cung cấp</div>
                </div></span
              ></label
            >
          </div>
        </div>

        <div class="popup-header-right">
          <div class="icon-question-ctn">
            <div class="icon-common-large icon-question"></div>
            <tool-tip message="Giúp"></tool-tip>
          </div>
          <div class="icon-close-ctn">
            <div
              class="icon-common-large icon-close"
              @click="checkChangeData"
            ></div>
            <tool-tip message="Đóng (ESC)"></tool-tip>
          </div>
        </div>
      </div>

      <div class="form-content">
        <div class="top-content">
          <div class="top-left-content">
            <div class="code-name-ctn">
              <div class="employee-code">
                <div class="title-input-common">
                  Mã <span class="field-required">*</span>
                </div>
                <div class="input-code">
                  <input v-model="employee.employeeCode" ref="employeeCode" @input="checkValueEmployeeCode" type="text" :class="['input-style-common', {'border-error': errorProperties.includes('employeeCode')}]" />
                  <tool-tip v-if="errorProperties.includes('employeeCode')" :message="employee.employeeCode ? `Mã nhân viên ${employee.employeeCode} đã tồn tại trong hệ thống.` : 'Mã không được để trống.'"></tool-tip>
                </div>
              </div>

              <div class="employee-name">
                <div class="title-input-common">
                  Tên <span class="field-required">*</span>
                </div>
                <div class="input-name">
                  <input v-model="employee.employeeName" ref="employeeName" @input="checkValueEmployeeName" type="text" :class="['input-style-common', {'border-error': errorProperties.includes('employeeName')}]"/>
                  <tool-tip v-if="errorProperties.includes('employeeName')" message="Tên không được để trống."></tool-tip>
                </div>
              </div>
            </div>

            <div class="department ctn-common">
              <div class="title-input-common">
                Đơn vị <span class="field-required">*</span>
              </div>
              <div class="auto-complete-input">
                <div class="input-department">
                  <div class="input-department-ctn">
                    <!-- <input type="text" class="input-style-common department-custom" /> -->
                    <v-autocomplete :errorProperties="errorProperties" :departmentId="employee.departmentId" :departmentName="employee.departmentName" @updateDepartment="updateDepartment" @addErrorDepartment="addErrorDepartment" @removeErrorDepartment="removeErrorDepartment" @updateDepartmentSearch="updateDepartmentSearch"></v-autocomplete>
                  </div>
                </div>
              </div>
            </div>

            <div class="office ctn-common">
              <div class="title-input-common">Chức danh</div>
              <div class="input-office">
                <input v-model="employee.employeePosition" type="text" class="input-style-common" />
              </div>
            </div>
          </div>
          <div class="top-right-content">
            <div class="date-gender ctn-common">
              <div class="date-of-birth">
                <div class="title-input-common">Ngày sinh</div>
                <v-datepicker :dateOfBirth="employee.dateOfBirth" @updateValue="updateDateOfBirth"></v-datepicker>
              </div>

              <div class="gender">
                <div class="title-input-common">Giới tính</div>
                <div class="gender-option">
                  <div class="male radio-btn">
                    <input type="radio" id="male" name="radio-group" v-model.number="employee.gender"
                    value=0 />
                    <label for="male">Nam</label>
                  </div>
                  <div class="male radio-btn">
                    <input
                      type="radio"
                      id="female"
                      name="radio-group"
                      value=1
                      v-model.number="employee.gender"
                    />
                    <label for="female">Nữ</label>
                  </div>
                  <div class="male radio-btn">
                    <input
                      type="radio"
                      id="other"
                      name="radio-group"
                      value=2
                      v-model.number="employee.gender"
                    />
                    <label for="other">Khác</label>
                  </div>
                </div>
              </div>
            </div>
            <div class="identity-card ctn-common">
              <div class="identity-card-number">
                <div class="title-input-common">Số CMND</div>
                <div class="input-identify-card-ctn">
                  <input v-model="employee.identityNumber" type="text" ref="identityNumber" @input="checkIdentityNumber" :class="['input-style-common', 'department-custom', {'border-error': errorProperties.includes('identityNumber')}]" />
                  <tool-tip v-if="errorProperties.includes('identityNumber')" message="Giá trị của Số CMND không đúng."></tool-tip>
                </div>
              </div>

              <div class="date-range">
                <div class="title-input-common">Ngày cấp</div>
                <v-datepicker :dateOfBirth="employee.identityDate" @updateValue="updateIdentityDate"></v-datepicker>
              </div>
            </div>

            <div class="issued-by ctn-common">
              <div class="title-input-common">Nơi cấp</div>
              <div class="input-issued-by">
                <input v-model="employee.identityPlace" type="text" class="input-style-common" />
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-content">
          <div class="address">
            <div class="title-input-common">Địa chỉ</div>
            <div class="input-address">
              <input v-model="employee.address" type="text" class="input-style-common" />
            </div>
          </div>

          <div class="phone-number-telephone-email">
            <div class="phone-number three-input-padding">
              <div class="title-input-common">ĐT di động</div>
              <div class="input-phone-number">
                <input
                  v-model="employee.phoneNumber"
                  type="text"
                  class="input-style-common width-three-input"
                />
              </div>
            </div>

            <div class="telephone-number three-input-padding">
              <div class="title-input-common">ĐT cố định</div>
              <div class="input-telephone width-three-input">
                <input v-model="employee.telephoneNumber" type="text" class="input-style-common" />
              </div>
            </div>

            <div class="email">
              <div class="title-input-common">Email</div>
              <div class="input-email">
                <input
                  v-model="employee.email"
                  type="text"
                  ref="email"
                  :class="['input-style-common', 'width-three-input', {'border-error': errorProperties.includes('email')}]"
                  @input="removeEmailError"
                />
                <tool-tip v-if="errorProperties.includes('email')" message="Địa chỉ email không hợp lệ."></tool-tip>
              </div>
            </div>
          </div>

          <div class="phone-number-telephone-email">
            <div class="phone-number three-input-padding">
              <div class="title-input-common">Tài khoản ngân hàng</div>
              <div class="input-phone-number">
                <input
                  v-model="employee.bankAccountNumber"
                  type="text"
                  class="input-style-common width-three-input"
                />
              </div>
            </div>

            <div class="telephone-number three-input-padding">
              <div class="title-input-common">Tên ngân hàng</div>
              <div class="input-telephone width-three-input">
                <input v-model="employee.bankName" type="text" class="input-style-common" />
              </div>
            </div>
            <div class="email">
              <div class="title-input-common">Chi nhánh</div>
              <div class="input-email">
                <input
                  v-model="employee.bankBranchName"
                  type="text"
                  class="input-style-common width-three-input"
                  @keydown.tab.prevent="moveToEmployeeCode"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-container">
        <div class="divide"></div>
        <div class="popup-footer">
          <div class="destroy-btn" @click="closePopupEditEmployee">Hủy</div>
          <div class="save-btn-group">
            <div class="save-btn-ctn" @click="saveEmployee">
              <div class="save-btn">Cất</div>
            </div>
            <div class="save-new-record" @click="saveEmployeeAndAdd">Cất và thêm</div>
          </div>
        </div>
      </div>
    </div>

    <div class="mask"></div>
    <popup-duplicate-code :errorMessage="errorMessage" v-if="isShowEmployeeCodeWarning" @closePopup="closePopupWarning"></popup-duplicate-code>
    <popup-error v-if="isShowPopupError" :errorMessage="errorMessage" @closePopupError="closePopupError"></popup-error>
    <popup-data-change v-if="isShowPopupDataChange" :message="messageDataChange" @closePopup="closePopupDataChange" @closeForm="closePopupEditEmployee" @saveData="saveData"></popup-data-change>
  </div>
</template>

<script>
import VDatepicker from '../../../common/v-datepicker/v-datepicker'
import VAutocomplete from '../../../common/v-autocomplete/v-autocomplete.vue'
import PopupDuplicateCode from '../../../pages/employee/popup-duplicate-code/popup-duplicate-code.vue'
import ToolTip from '../../../common/tool-tip/tool-tip.vue'
import { HTTP } from '../../../../axios/http-common'
import PopupError from '../popup-error/popup-error.vue'
import EventBus from '../../../../event-bus/event-bus'
import PopupDataChange from '../../../common/popup-data-change/popup-data-change.vue'
import Message from '../../../../message/message'
import moment from 'moment'
export default {
  data () {
    return {
      employee: this.employeeEdit, // Biến lưu giá trị nhân viên cần sửa
      isShowEmployeeCodeWarning: false, // Biến hiển thị thông báo mã nhân viên bị trùng
      errorProperties: [], // Biến lưu trữ các trường bị lỗi
      errorMessage: '', // Thông báo lỗi
      isShowPopupError: false, // Biến hiển thị thông báo lỗi,
      fakeEmployee: null, // Biến lưu trữ giá trị ban đầu của biến employee
      messageDataChange: Message.dataChange, // Biến thông báo dữ liệu thay đổi
      isShowPopupDataChange: false, // Biến hiển thị Popup dữ liệu thay đổi
      editMode: true, // Biến trạng thái sửa
      departmentSearch: '', // Biến tên phòng ban tìm kiếm
      isShowLoading: false // Biến hiển thị loading
    }
  },
  created () {
    // Lưu giá trị ban đầu của biến employee
    this.fakeEmployee = { ...this.employee }
  },
  mounted () {
    // Focus vào ô mã nhân viên khi Popup hiển thị
    this.$refs.employeeCode.focus()
  },
  props: {
    // Nhân viên cần sửa
    employeeEdit: {
      type: Object,
      default () {
        return {
          employeeCode: null, // Mã nhân viên
          employeeName: null, // Tên nhân viên
          dateOfBirth: moment().format('YYYY-MM-DD'), // Ngày sinh
          gender: 0, // Giới tính
          departmentId: null, // Id phòng ban
          identityNumber: null, // Số CMT
          identityDate: moment().format('YYYY-MM-DD'), // Ngày cấp
          identityPlace: null, // Nơi cấp
          employeePosition: null, // Chức vụ
          address: null, // Địa chỉ
          bankAccountNumber: null, // Tài khoản ngân hàng
          bankName: null, // Tên ngân hàng
          bankBranchName: null, // Chi nhánh ngân hàng
          bankProvinceName: null, // Tỉnh
          phoneNumber: null, // Số điện thoại
          telephoneNumber: null, // Số điện thoại cố định
          email: null // Email
        }
      }
    }
  },
  components: {
    VDatepicker,
    VAutocomplete,
    PopupDuplicateCode,
    PopupError,
    ToolTip,
    PopupDataChange
  },
  methods: {
    /**
     * Hàm đóng Popup sửa nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    closePopupEditEmployee () {
      this.$emit('closePopupEditEmployee')
    },
    /**
     * Hàm cập nhật ngày sinh
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    updateDateOfBirth (dateOfBirth) {
      this.employee.dateOfBirth = dateOfBirth
    },
    /**
     * Hàm cập nhật ngày cấp
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    updateIdentityDate (identityDate) {
      this.employee.identityDate = identityDate
    },
    /**
     * Hàm cập nhật phòng ban
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    updateDepartment (departmentId) {
      this.employee.departmentId = departmentId
    },
    /**
     * Hàm lưu nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    saveEmployee () {
      if (!this.employee.employeeCode && !this.errorProperties.includes('employeeCode')) {
        this.errorProperties.push('employeeCode')
      }
      if (!this.employee.employeeName && !this.errorProperties.includes('employeeName')) {
        this.errorProperties.push('employeeName')
      }
      if (!this.employee.departmentId && !this.errorProperties.includes('departmentId')) {
        this.errorProperties.push('departmentId')
      }
      if (!this.checkValueEmail(this.employee.email) && !this.errorProperties.includes('email') && this.employee.email) {
        this.errorProperties.push('email')
        this.errorMessage = Message.emailInvalid
      }
      if (this.errorProperties.length > 0) {
        this.errorProperties.every(element => {
          if (element === 'employeeCode') {
            if (!this.employee.employeeCode) {
              this.errorMessage = Message.employeeCodeEmpty
              this.isShowPopupError = true
            } else {
              this.isShowEmployeeCodeWarning = true
            }
            return false
          }
          if (element === 'employeeName') {
            this.isShowPopupError = true
            this.errorMessage = Message.employeeNameEmpty
            return false
          }
          if (element === 'departmentId') {
            this.isShowPopupError = true
            if (!this.departmentSearch) {
              this.errorMessage = Message.departmentEmpty
            } else {
              this.errorMessage = Message.departmentNotExist
            }
            return false
          }
          if (element === 'email') {
            this.errorMessage = Message.emailInvalid
            this.isShowEmployeeCodeWarning = true
            return false
          }
          if (element === 'identityNumber') {
            this.errorMessage = Message.identityNumberInvalid
            this.isShowPopupError = true
          }
        })
      } else {
        if (this.editMode) {
          HTTP.put(`employees/${this.employee.employeeId}`, this.employee)
            .then((result) => {
              this.$emit('saveEmployeeSuccess')
            }).catch((err) => {
              const propertyInvalidLists = err.response.data.propertyInvalidLists
              if (err.response.data.misaCode === 400) {
                propertyInvalidLists.every(element => {
                  if (element.propertyName === 'employeeCode') {
                    this.errorMessage = `Mã nhân viên <${this.employee.employeeCode}> đã tồn tại trong hệ thống, vui lòng kiểm tra lại.`
                    this.errorProperties.push('employeeCode')
                    this.isShowEmployeeCodeWarning = true
                  }

                  if (element.propertyName === 'email') {
                    this.errorMessage = Message.emailInvalid
                    // Thêm lỗi email vào mảng lỗi
                    this.errorProperties.push('email')
                    // Hiện Popup cảnh báo trùng mã
                    this.isShowEmployeeCodeWarning = true
                    return true
                  }
                })
              } else if (err.response.data.misaCode === 650) {
                propertyInvalidLists.every(element => {
                  if (element.propertyName === 'employeeCode') {
                    this.errorMessage = Message.employeeCodeEmpty
                    this.errorProperties.push('employeeCode')
                    this.isShowPopupError = true
                  } else if (element.propertyName === 'employeeName') {
                    this.errorMessage = Message.employeeNameEmpty
                    this.errorProperties.push('employeeName')
                    this.isShowPopupError = true
                  } else if (element.propertyName === 'departmentId') {
                    this.errorMessage = Message.departmentEmpty
                    this.errorProperties.push('departmentId')
                    this.isShowPopupError = true
                  }
                })
              }
            })
        } else {
          this.saveEmployeeAndClose()
        }
      }
    },
    /**
     * Hàm đóng Popup cảnh báo trùng mã nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    closePopupWarning () {
      this.isShowEmployeeCodeWarning = false
      const firstErrorInput = this.errorProperties[0]
      if (firstErrorInput !== 'departmentId') {
        this.$refs[firstErrorInput].focus()
      }
    },
    /**
     * Hàm kiểm tra giá trị của mã nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    checkValueEmployeeCode () {
      if (!this.employee.employeeCode) {
        this.errorProperties.push('employeeCode')
      } else {
        const index = this.errorProperties.indexOf('employeeCode')
        if (index > -1) {
          this.errorProperties.splice(index, 1)
        }
      }
    },
    /**
     * Hàm kiểm tra giá trị của tên nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    checkValueEmployeeName () {
      if (!this.employee.employeeName) {
        this.errorProperties.push('employeeName')
      } else {
        const index = this.errorProperties.indexOf('employeeName')
        if (index > -1) {
          this.errorProperties.splice(index, 1)
        }
      }
    },
    /**
     * Hàm đóng Popup thông báo lỗi
     */
    closePopupError () {
      this.isShowPopupError = false
      const firstErrorInput = this.errorProperties[0]
      if (firstErrorInput !== 'departmentId') {
        this.$refs[firstErrorInput].focus()
      }
    },
    /**
     * Hàm thêm lỗi phòng ban vào danh sách lỗi
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    addErrorDepartment () {
      this.errorProperties.push('departmentId')
    },
    /**
     * Hàm xóa lỗi phòng ban khỏi danh sách lỗi
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    removeErrorDepartment () {
      const index = this.errorProperties.indexOf('departmentId')
      if (index > -1) {
        this.errorProperties.splice(index, 1)
      }
    },
    /**
     * Hàm kiểm tra sự thay đổi của dữ liệu trước khi đóng
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    checkChangeData () {
      for (const property in this.employee) {
        // Kiểm tra dữ liệu ban đầu có khác dữ liệu hiện tại không
        if (this.employee[property] !== this.fakeEmployee[property]) {
          // Hiển thị Popup thông báo dữ liệu thay đổi
          this.isShowPopupDataChange = true
          return true
        }
      }
      // Đóng Popup sửa
      this.closePopupEditEmployee()
    },
    /**
     * Hàm đóng Popup thông báo thay đổi dữ liệu
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    closePopupDataChange () {
      // Đóng Popup thông báo dữ liệu thay đổi
      this.isShowPopupDataChange = false
    },
    /**
     * Hàm lưu dữ liệu khi dữ liệu thay đổi
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    saveData () {
      // Hàm đóng Popup thông báo dữ liệu thay đổi
      this.closePopupDataChange()
      // Hàm lưu nhân viên
      this.saveEmployee()
    },
    /**
     * Hàm lưu và thêm mới nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    saveEmployeeAndAdd () {
      // Kiểm tra xem có phải đang ở mode sửa dữ liệu hay không
      if (this.editMode) {
        // Kiểm tra xem mã nhân viên rỗng và chưa có lỗi trong mảng lỗi hay không
        if (!this.employee.employeeCode && !this.errorProperties.includes('employeeCode')) {
          // Thêm lỗi mã nhân viên
          this.errorProperties.push('employeeCode')
        }
        // Kiểm tra xem tên nhân viên rỗng và chưa có lỗi trong mảng lỗi hay không
        if (!this.employee.employeeName && !this.errorProperties.includes('employeeName')) {
          // Thêm lỗi tên nhân viên
          this.errorProperties.push('employeeName')
        }
        // Kiểm tra xem mã phòng ban rỗng và chưa có lỗi trong mảng lỗi hay không
        if (!this.employee.departmentId && !this.errorProperties.includes('departmentId')) {
          // Thêm lỗi phòng ban
          this.errorProperties.push('departmentId')
        }
        if (!this.checkValueEmail(this.employee.email) && !this.errorProperties.includes('email') && this.employee.email) {
          this.errorProperties.push('email')
          this.errorMessage = Message.emailInvalid
        }
        // Kiểm tra có trường nào bị lỗi hay không
        if (this.errorProperties.length > 0) {
          // Lặp qua mảng chứa lỗi và gán thông báo lỗi để hiển thị
          this.errorProperties.every(element => {
            if (element === 'employeeCode') {
              if (!this.employee.employeeCode) {
                this.errorMessage = Message.employeeCodeEmpty
                this.isShowPopupError = true
              } else {
                this.isShowEmployeeCodeWarning = true
              }
              return false
            }
            if (element === 'employeeName') {
              this.isShowPopupError = true
              this.errorMessage = Message.employeeNameEmpty
              return false
            }
            if (element === 'departmentId') {
              this.isShowPopupError = true
              if (!this.departmentSearch) {
                this.errorMessage = Message.departmentEmpty
              } else {
                this.errorMessage = Message.departmentNotExist
              }
              return false
            }
            if (element === 'email') {
              this.errorMessage = Message.emailInvalid
              this.isShowEmployeeCodeWarning = true
              return false
            }
            if (element === 'identityNumber') {
              this.errorMessage = Message.identityNumberInvalid
              this.isShowPopupError = true
            }
          })
        } else {
          // Lưu nhân viên
          HTTP.put(`employees/${this.employee.employeeId}`, this.employee)
            .then((result) => {
              // Hiển thị Loading
              this.isShowLoading = true
              // Hàm reset lại dữ liệu
              this.resetData()
            }).catch((err) => {
              // Lưu danh sách các trường bị lỗi trả về từ server
              const propertyInvalidLists = err.response.data.propertyInvalidLists
              if (err.response.data.misaCode === 400) {
                propertyInvalidLists.every(element => {
                  // Kiểm tra xem trường mã nhân viên có lỗi không
                  if (element.propertyName === 'employeeCode') {
                    // Gán thông báo lỗi trùng mã nhân viên
                    this.errorMessage = `Mã nhân viên <${this.employee.employeeCode}> đã tồn tại trong hệ thống, vui lòng kiểm tra lại.`
                    // Thêm lỗi
                    this.errorProperties.push('employeeCode')
                    // Hiện Popup thông báo trùng mã nhân viên
                    this.isShowEmployeeCodeWarning = true
                    return true
                  }
                  if (element.propertyName === 'email') {
                    this.errorMessage = Message.emailInvalid
                    // Thêm lỗi email vào mảng lỗi
                    this.errorProperties.push('email')
                    // Hiện Popup cảnh báo trùng mã
                    this.isShowEmployeeCodeWarning = true
                    return true
                  }
                })
              } else if (err.response.data.misaCode === 650) {
                propertyInvalidLists.every(element => {
                  if (element.propertyName === 'employeeCode') {
                    this.errorMessage = Message.employeeCodeEmpty
                    this.errorProperties.push('employeeCode')
                    this.isShowPopupError = true
                  } else if (element.propertyName === 'employeeName') {
                    this.errorMessage = Message.employeeNameEmpty
                    this.errorProperties.push('employeeName')
                    this.isShowPopupError = true
                  } else if (element.propertyName === 'departmentId') {
                    this.errorMessage = Message.departmentEmpty
                    this.errorProperties.push('departmentId')
                    this.isShowPopupError = true
                  }
                })
              }
            })
        }
      } else {
        // Kiểm tra mã nhân viên trống và chưa có lỗi trong mảng lỗi hay không
        if (!this.employee.employeeCode && !this.errorProperties.includes('employeeCode')) {
          // Thêm lỗi mã nhân viên
          this.errorProperties.push('employeeCode')
        }
        // Kiểm tra tên nhân viên trống và chưa có lỗi trong mảng lỗi hay không
        if (!this.employee.employeeName && !this.errorProperties.includes('employeeName')) {
          // Thêm lỗi tên nhân viên
          this.errorProperties.push('employeeName')
        }
        // Kiểm tra mã phòng ban trống và chưa có lỗi trong mảng lỗi hay không
        if (!this.employee.departmentId && !this.errorProperties.includes('departmentId')) {
          // Thêm lỗi mã phòng ban
          this.errorProperties.push('departmentId')
        }
        // Kiểm tra mảng lỗi có lỗi nào hay không
        if (this.errorProperties.length > 0) {
          // Lặp lỗi trong mảng và gán thông báo lỗi cho từng trường để hiển thị
          this.errorProperties.every(element => {
            if (element === 'employeeCode') {
              if (!this.employee.employeeCode) {
                this.errorMessage = Message.employeeCodeEmpty
                this.isShowPopupError = true
              } else {
                this.isShowEmployeeCodeWarning = true
              }
              return false
            }
            if (element === 'employeeName') {
              this.isShowPopupError = true
              this.errorMessage = Message.employeeNameEmpty
              return false
            }
            if (element === 'departmentId') {
              this.isShowPopupError = true
              if (!this.departmentSearch) {
                this.errorMessage = Message.departmentEmpty
              } else {
                this.errorMessage = Message.departmentNotExist
              }
              return false
            }

            if (element === 'email') {
              this.isShowEmployeeCodeWarning = true
              return false
            }

            if (element === 'identityNumber') {
              this.errorMessage = Message.identityNumberInvalid
              this.isShowPopupError = true
            }
          })
        } else {
          // Lưu nhân viên
          this.saveNewEmployee()
        }
      }
    },
    /**
     * Hàm đặt lại dữ liệu của Popup add
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    resetData () {
      this.employee = {
        employeeCode: this.latestEmployeeCode, // Mã nhân viên
        employeeName: null, // Tên nhân viên
        dateOfBirth: null, // Ngày sinh
        gender: 0, // Giới tính
        departmentId: null, // Mã phòng ban
        identityNumber: null, // Số CMT
        identityDate: null, // Ngày cấp
        identityPlace: null, // Nơi cấp
        employeePosition: null, // Chức vụ
        address: null, // Địa chỉ
        bankAccountNumber: null, // Tài khoản ngân hàng
        bankName: null, // Tên ngân hàng
        bankBranchName: null, // Chi nhánh
        bankProvinceName: null, // Tỉnh
        phoneNumber: null, // SĐT
        telephoneNumber: null, // SĐT cố định
        email: null // Email
      }
      // Biến tên phòng ban tìm kiếm
      this.departmentSearch = ''
      // Biết mode edit
      this.editMode = false
      // Reset lại dữ liệu tìm kiếm phòng ban
      EventBus.$emit('resetDepartmentSearch')
      // Reset lại giá trị ngày
      EventBus.$emit('resetDataDatePicker')
      this.$emit('saveEmployeeSuccessAndAdd')
      // Lấy mã nhân viên mới
      HTTP.get('employees/new-code')
        .then((result) => {
          // Gán mã nhân viên mới
          this.employee.employeeCode = result.data
          // Sao chép dữ liệu employee ban đầu
          this.fakeEmployee = { ...this.employee }
          // Focus vào ô input mã nhân viên
          this.$refs.employeeCode.focus()
          // Ẩn Loading
          this.isShowLoading = false
        }).catch((err) => {
          // Log lỗi
          console.log(err)
        })
    },
    saveNewEmployee () {
      // Lưu nhân viên
      HTTP.post('employees', this.employee)
        .then((result) => {
          // Hiển thị Loading
          this.isShowLoading = true
          this.resetData()
          this.$emit('saveEmployeeSuccessAndAdd')
          // this.isShowLoading = false
        }).catch((err) => {
          // Lưu danh sách trường lỗi từ server trả về
          const propertyInvalidLists = err.response.data.propertyInvalidLists
          if (err.response.data.misaCode === 400) {
            propertyInvalidLists.every(element => {
              // Kiểm tra trường mã nhân viên có lỗi không
              if (element.propertyName === 'employeeCode') {
                // Gán thông báo mã nhân viên bị trùng
                this.errorMessage = `Mã nhân viên <${this.employee.employeeCode}> đã tồn tại trong hệ thống, vui lòng kiểm tra lại.`
                // Thêm lỗi trùng mã
                this.errorProperties.push('employeeCode')
                // Hiển thị thông báo bị trùng mã
                this.isShowEmployeeCodeWarning = true
                return true
              }

              if (element.propertyName === 'email') {
                this.errorMessage = Message.emailInvalid
                // Thêm lỗi email
                this.errorProperties.push('email')
                // Hiện Popup cảnh báo trùng mã
                this.isShowEmployeeCodeWarning = true
                return true
              }
            })
          }
        })
    },
    /**
     * Hàm cập nhật phòng ban tìm kiếm
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    updateDepartmentSearch (departmentSearch) {
      this.departmentSearch = departmentSearch
    },
    /**
     * Hàm lưu nhân viên và đóng Popup
     * CreatedBy: PTANH
     * CreatedDate: 16/06/2021
     */
    saveEmployeeAndClose () {
      HTTP.post('employees', this.employee)
        .then((result) => {
          this.$emit('saveEmployeeSuccess')
        }).catch((err) => {
          // Lưu danh sách trường lỗi từ server trả về
          const propertyInvalidLists = err.response.data.propertyInvalidLists
          if (err.response.data.misaCode === 400) {
            propertyInvalidLists.every(element => {
              // Kiểm tra trường mã nhân viên có lỗi không
              if (element.propertyName === 'employeeCode') {
                // Gán thông báo mã nhân viên bị trùng
                this.errorMessage = `Mã nhân viên <${this.employee.employeeCode}> đã tồn tại trong hệ thống, vui lòng kiểm tra lại.`
                // Thêm lỗi employeeCode
                this.errorProperties.push('employeeCode')
                // Hiển thị thông báo bị trùng mã
                this.isShowEmployeeCodeWarning = true
                return true
              }

              if (element.propertyName === 'email') {
                this.errorMessage = Message.emailInvalid
                // Thêm lỗi email vào danh sách lỗi
                this.errorProperties.push('email')
                // Hiện Popup cảnh báo trùng mã
                this.isShowEmployeeCodeWarning = true
                return true
              }
            })
          }
        })
    },
    /**
     * Xóa lỗi Email
     * CreatedBy: PTANH
     * CreatedDate: 17/06/2021
     */
    removeEmailError () {
      if (this.errorProperties.includes('email') !== -1) {
        const index = this.errorProperties.indexOf('email')
        if (index > -1) {
          this.errorProperties.splice(index, 1)
        }
      }
    },
    /**
     * Hàm kiểm tra một chuỗi có phải là một số hợp lệ hay không
     * CreatedBy: PTANH
     * CreatedDate: 18/06/2021
     */
    isNumeric (str) {
      if (typeof str !== 'string') return false // Chỉ xử lý với chuỗi
      return !isNaN(str) &&
         !isNaN(parseFloat(str))
    },
    /**
     * Hàm kiểm tra giá trị của số CMND
     * CreatedBy: PTANH
     * CreatedDate: 18/06/2021
     */
    checkIdentityNumber () {
      // Kiểm tra giá trị của người dùng nhập có phải là số không
      const isNumber = this.isNumeric(this.employee.identityNumber)
      // Kiểm tra lỗi đã có trong danh sách lỗi chưa
      const index = this.errorProperties.indexOf('identityNumber')
      if (!isNumber && index === -1) {
        // Thêm lỗi
        this.errorProperties.push('identityNumber')
      }
      if ((isNumber && index > -1) || !this.employee.identityNumber) {
        // Xóa lỗi
        this.errorProperties.splice(index, 1)
      }
    },
    /**
     * Hàm di chuyển đến ô input mã nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 22/06/2021
     */
    moveToEmployeeCode () {
      this.$refs.employeeCode.focus()
    },
    /**
     * Hàm kiểm tra giá trị của email
     * CreatedBy: PTANH
     * CreatedDate: 22/06/2021
     */
    checkValueEmail (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../scss/_variable.scss";
@import "./_style.scss";
</style>
