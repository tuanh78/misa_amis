<template>
  <div class="add-employee" @keydown.27="ClosePopupAddEmployee">
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
          </div>
          <div class="icon-close-ctn">
            <div
              class="icon-common-large icon-close"
              @click="CheckChangeData"
            ></div>
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
                  <input v-model="employee.employeeCode" ref="employeeCode" @mousemove="GetMousePosition" @input="CheckValueEmployeeCode" type="text" :class="['input-style-common', {'border-error': errorProperties.includes('employeeCode')}]" />
                  <tool-tip v-if="errorProperties.includes('employeeCode')" message="Mã không được để trống."></tool-tip>
                </div>
              </div>

              <div class="employee-name">
                <div class="title-input-common">
                  Tên <span class="field-required">*</span>
                </div>
                <div class="input-name">
                  <input v-model="employee.employeeName" @input="CheckValueEmployeeName" type="text" :class="['input-style-common', {'border-error': errorProperties.includes('employeeName')}]" @keydown.tab="MoveToDepartment" />
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
                    <v-autocomplete :errorProperties="errorProperties" :departmentId="employee.departmentId" :departmentName="employee.departmentName" @updateDepartmentSearch="UpdateDepartmentSearch" @updateDepartment="UpdateDepartment" @addErrorDepartment="AddErrorDepartment" @removeErrorDepartment="RemoveErrorDepartment"></v-autocomplete>
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
                <v-datepicker :dateOfBirth="employee.dateOfBirth" @updateValue="UpdateDateOfBirth"></v-datepicker>
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
                  <input v-model="employee.identityNumber" type="text" class="input-style-common department-custom" />
                </div>
              </div>

              <div class="date-range">
                <div class="title-input-common">Ngày cấp</div>
                <v-datepicker :dateOfBirth="employee.identityDate" @updateValue="UpdateIdentityDate"></v-datepicker>
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
                  class="input-style-common width-three-input"
                />
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-container">
        <div class="divide"></div>
        <div class="popup-footer">
          <div class="destroy-btn" @click="ClosePopupAddEmployee">Hủy</div>
          <div class="save-btn-group">
            <div class="save-btn-ctn" @click="SaveEmployee">
              <div class="save-btn">Cất</div>
            </div>
            <div class="save-new-record" @click="SaveEmployeeAndAdd">Cất và thêm</div>
          </div>
        </div>
      </div>
    </div>

    <div class="mask"></div>
    <popup-duplicate-code :errorMessage="errorMessage" v-if="isShowEmployeeCodeWarning" @closePopup="ClosePopupWarning"></popup-duplicate-code>
    <popup-error v-if="isShowPopupError" :errorMessage="errorMessage" @closePopupError="ClosePopupError"></popup-error>
    <popup-data-change v-if="isShowPopupDataChange" :message="messageDataChange" @closePopup="ClosePopupDataChange" @closeForm="ClosePopupAddEmployee" @saveData="SaveData"></popup-data-change>
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
export default {
  data () {
    return {
      // Biến lưu trữ giá trị của nhân viên
      employee: {
        employeeCode: this.latestEmployeeCode,
        employeeName: null,
        dateOfBirth: null,
        gender: 0,
        departmentId: null,
        identityNumber: null,
        identityDate: null,
        identityPlace: null,
        employeePosition: null,
        address: null,
        bankAccountNumber: null,
        bankName: null,
        bankBranchName: null,
        bankProvinceName: null,
        phoneNumber: null,
        telephoneNumber: null,
        email: null
      },
      isShowEmployeeCodeWarning: false,
      errorProperties: [],
      errorMessage: '',
      isShowPopupError: false,
      isShowPopupDataChange: false,
      departmentSearch: '',
      screenX: 0,
      screenY: 0,
      fakeEmployee: null,
      messageDataChange: 'Dữ liệu đã bị thay đổi. Bạn có muốn cất không?'
    }
  },
  props: {
    // Danh sách phòng ban
    departments: {
      type: Array
    },
    // Mã nhân viên mới
    latestEmployeeCode: {
      type: String
    }
  },
  created () {
    this.fakeEmployee = { ...this.employee }
  },
  mounted () {
    // Focus vào ô mã nhân viên khi hiện Popup
    this.$refs.employeeCode.focus()
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
     * Hàm ẩn Popup thêm nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    ClosePopupAddEmployee () {
      this.$emit('closePopupAddEmployee')
    },
    /**
     * Hàm cập nhật ngày sinh
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    UpdateDateOfBirth (dateOfBirth) {
      this.employee.dateOfBirth = dateOfBirth
    },
    /**
     * Hàm cập nhật ngày cấp
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    UpdateIdentityDate (identityDate) {
      this.employee.identityDate = identityDate
    },
    /**
     * Hàm cập nhật phòng ban
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    UpdateDepartment (departmentId) {
      this.employee.departmentId = departmentId
    },
    /**
     * Hàm lưu nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    SaveEmployee () {
      if (!this.employee.employeeCode && !this.errorProperties.includes('employeeCode')) {
        this.errorProperties.push('employeeCode')
      }
      if (!this.employee.employeeName && !this.errorProperties.includes('employeeName')) {
        this.errorProperties.push('employeeName')
      }
      if (!this.employee.departmentId && !this.errorProperties.includes('departmentId')) {
        this.errorProperties.push('departmentId')
      }
      if (this.errorProperties.length > 0) {
        this.errorProperties.every(element => {
          if (element === 'employeeCode') {
            this.errorMessage = 'Mã không được để trống.'
            this.isShowPopupError = true
            return false
          }
          if (element === 'employeeName') {
            this.isShowPopupError = true
            this.errorMessage = 'Tên không được để trống.'
            return false
          }
          if (element === 'departmentId') {
            this.isShowPopupError = true
            if (!this.departmentSearch) {
              this.errorMessage = 'Đơn vị không được để trống.'
            } else {
              this.errorMessage = 'Dữ liệu <Đơn vị> không có trong danh mục.'
            }
            return false
          }
        })
      } else {
        HTTP.post('employees', this.employee)
          .then((result) => {
            this.$emit('saveEmployeeSuccess')
          }).catch((err) => {
            const propertyInvalidLists = err.response.data.propertyInvalidLists
            if (err.response.data.misaCode === 400) {
              propertyInvalidLists.forEach(element => {
                if (element.propertyName === 'employeeCode') {
                  this.errorMessage = `Mã nhân viên <${this.employee.employeeCode}> đã tồn tại trong hệ thống, vui lòng kiểm tra lại.`
                  this.isShowEmployeeCodeWarning = true
                }
              })
            }
          })
      }
    },
    /**
     * Hàm đóng Popup cảnh báo trùng mã nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    ClosePopupWarning () {
      this.isShowEmployeeCodeWarning = false
    },
    /**
     * Hàm kiểm tra giá trị của mã nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    CheckValueEmployeeCode () {
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
    CheckValueEmployeeName () {
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
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    ClosePopupError () {
      this.isShowPopupError = false
    },
    /**
     * Hàm thêm phòng ban vào danh sách lỗi
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    AddErrorDepartment () {
      if (!this.errorProperties.includes('departmentId')) {
        this.errorProperties.push('departmentId')
      }
    },
    /**
     * Hàm xóa phòng ban khỏi danh sách lỗi
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    RemoveErrorDepartment () {
      const index = this.errorProperties.indexOf('departmentId')
      if (index > -1) {
        this.errorProperties.splice(index, 1)
      }
    },
    /**
     * Hàm cập nhật giá trị department search
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    UpdateDepartmentSearch (departmentSearch) {
      this.departmentSearch = departmentSearch
    },
    /**
     * Hàm lấy tọa độ của chuột khi di chuyển
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    GetMousePosition (event) {
      this.screenX = event.screenX
      this.screenY = event.screenY
    },
    /**
     * Hàm chuyển đến input đơn vị
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    MoveToDepartment () {
      EventBus.$emit('moveToDepartment')
    },
    /**
     * Hàm kiểm tra sự thay đổi của dữ liệu trước khi đóng
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    CheckChangeData () {
      for (const property in this.employee) {
        if (this.employee[property] !== this.fakeEmployee[property]) {
          this.isShowPopupDataChange = true
          return true
        }
      }

      this.ClosePopupAddEmployee()
    },
    /**
     * Hàm đóng Popup thông báo thay đổi dữ liệu
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    ClosePopupDataChange () {
      this.isShowPopupDataChange = false
    },
    /**
     * Hàm lưu dữ liệu khi dữ liệu thay đổi
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    SaveData () {
      this.ClosePopupDataChange()
      this.SaveEmployee()
    },
    /**
     * Hàm lưu và tao
     */
    SaveEmployeeAndAdd () {
      if (!this.employee.employeeCode && !this.errorProperties.includes('employeeCode')) {
        this.errorProperties.push('employeeCode')
      }
      if (!this.employee.employeeName && !this.errorProperties.includes('employeeName')) {
        this.errorProperties.push('employeeName')
      }
      if (!this.employee.departmentId && !this.errorProperties.includes('departmentId')) {
        this.errorProperties.push('departmentId')
      }
      if (this.errorProperties.length > 0) {
        this.errorProperties.every(element => {
          if (element === 'employeeCode') {
            this.errorMessage = 'Mã không được để trống.'
            this.isShowPopupError = true
            return false
          }
          if (element === 'employeeName') {
            this.isShowPopupError = true
            this.errorMessage = 'Tên không được để trống.'
            return false
          }
          if (element === 'departmentId') {
            this.isShowPopupError = true
            if (!this.departmentSearch) {
              this.errorMessage = 'Đơn vị không được để trống.'
            } else {
              this.errorMessage = 'Dữ liệu <Đơn vị> không có trong danh mục.'
            }
            return false
          }
        })
      } else {
        HTTP.post('employees', this.employee)
          .then((result) => {
            this.$emit('saveEmployeeSuccessAndAdd')
          }).catch((err) => {
            const propertyInvalidLists = err.response.data.propertyInvalidLists
            if (err.response.data.misaCode === 400) {
              propertyInvalidLists.forEach(element => {
                if (element.propertyName === 'employeeCode') {
                  this.errorMessage = `Mã nhân viên <${this.employee.employeeCode}> đã tồn tại trong hệ thống, vui lòng kiểm tra lại.`
                  this.isShowEmployeeCodeWarning = true
                }
              })
            }
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../../scss/_variable.scss";
@import "./_style.scss";
</style>
