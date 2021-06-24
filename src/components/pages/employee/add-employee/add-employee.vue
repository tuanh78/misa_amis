<template>
  <div class="add-employee" @keydown.27="checkChangeData">
    <!-- Loading -->
    <div class="loading" v-if="isShowLoading">
    </div>
    <div class="form-ctn">
      <!-- #region header -->
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
      <!-- #endregion -->

      <!-- #region Nội dung chính -->
      <div class="form-content">
        <div class="top-content">
          <div class="top-left-content">
            <div class="code-name-ctn">
              <div class="employee-code">
                <div class="title-input-common">
                  Mã <span class="field-required">*</span>
                </div>
                <div class="input-code">
                  <input v-model="employee.employeeCode" ref="employeeCode" @mousemove="getMousePosition" @input="checkValueEmployeeCode" type="text" :class="['input-style-common', {'border-error': errorProperties.includes('employeeCode')}]" />
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
                    <v-autocomplete :errorProperties="errorProperties" :departmentId="employee.departmentId" :departmentName="employee.departmentName" @updateDepartmentSearch="updateDepartmentSearch" @updateDepartment="updateDepartment" @addErrorDepartment="addErrorDepartment" @removeErrorDepartment="removeErrorDepartment"></v-autocomplete>
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
                  type="email"
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
      <!-- #endregion -->

      <!-- #region footer -->
      <div class="footer-container">
        <div class="divide"></div>
        <div class="popup-footer">
          <div class="destroy-btn" @click="closePopupAddEmployee">Hủy</div>
          <div class="save-btn-group">
            <div class="save-btn-ctn" @click="saveEmployee">
              <div class="save-btn">Cất</div>
            </div>
            <div class="save-new-record" @click="saveEmployeeAndAdd">Cất và Thêm</div>
          </div>
        </div>
      </div>
      <!-- #endregion -->
    </div>

    <!-- #region Các thành phần khác -->
    <div class="mask"></div>
    <popup-duplicate-code :errorMessage="errorMessage" v-if="isShowEmployeeCodeWarning" @closePopup="closePopupWarning"></popup-duplicate-code>
    <popup-error v-if="isShowPopupError" :errorMessage="errorMessage" @closePopupError="closePopupError"></popup-error>
    <popup-data-change v-if="isShowPopupDataChange" :message="messageDataChange" @closePopup="closePopupDataChange" @closeForm="closePopupAddEmployee" @saveData="saveData"></popup-data-change>
    <!-- #endregion -->
  </div>
</template>

<script>
// #region Declare Library
import VDatepicker from '../../../common/v-datepicker/v-datepicker'
import VAutocomplete from '../../../common/v-autocomplete/v-autocomplete.vue'
import PopupDuplicateCode from '../../../pages/employee/popup-duplicate-code/popup-duplicate-code.vue'
import ToolTip from '../../../common/tool-tip/tool-tip.vue'
import { HTTP } from '../../../../axios/http-common'
import PopupError from '../popup-error/popup-error.vue'
import EventBus from '../../../../event-bus/event-bus'
import PopupDataChange from '../../../common/popup-data-change/popup-data-change.vue'
import Message from '../../../../message/message'
// #endregion
export default {
  // #region Declare
  data () {
    return {
      // Biến lưu trữ giá trị của nhân viên
      employee: {
        employeeCode: this.latestEmployeeCode, // Mã khách hàng
        employeeName: '', // Tên khách hàng
        dateOfBirth: '', // Ngày sinh
        gender: 0, // Giới tính
        departmentId: '', // Id của phòng ban
        identityNumber: '', // Số CMT
        identityDate: '', // Ngày cấp
        identityPlace: '', // Nơi cấp
        employeePosition: '', // Chức danh
        address: '', // Địa chỉ
        bankAccountNumber: '', // Tài khoản NH
        bankName: '', // Tên ngân hàng
        bankBranchName: '', // Chi Nhánh
        bankProvinceName: '', // Tỉnh
        phoneNumber: '', // Số điện thoại
        telephoneNumber: '', // Số điện thoại cố định
        email: '' // Email
      },
      isShowEmployeeCodeWarning: false, // Biến hiển thị cảnh báo mã khách hàng đã tồn tại
      errorProperties: [], // Biến danh sách các trường bị lỗi
      errorMessage: '', // Biến thông báo lỗi
      isShowPopupError: false, // Biến hiển thị Popup lỗi
      isShowPopupDataChange: false, // Biến hiển thị Popup dữ liệu thay đổi
      isShowLoading: false, // Biến hiển thị load lại trang
      departmentSearch: '', // Biến tên phòng ban tìm kiếm
      screenX: 0, // Vị trí theo trục X
      screenY: 0, // Vị trí theo trục Y
      fakeEmployee: null, // Biến sao chép dữ liệu của employee
      // messageDataChange: 'Dữ liệu đã bị thay đổi. Bạn có muốn cất không?' // Biến thông báo dữ liệu thay đổi
      messageDataChange: Message.dataChange // Biến thông báo dữ liệu thay đổi
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
    try {
      this.fakeEmployee = { ...this.employee }
    } catch (error) {
      console.log(error)
    }
  },
  mounted () {
    try {
      // Focus vào ô mã nhân viên khi hiện Popup
      this.$refs.employeeCode.focus()
    } catch (error) {
      console.log(error)
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
  // #endregion

  // #region Methods
  methods: {
    // #region I: Các hàm xử lý sự kiện người dùng

    // #region 1: Ẩn Popup thêm nhân viên
    /**
     * Hàm ẩn Popup thêm nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    closePopupAddEmployee () {
      try {
        this.$emit('closePopupAddEmployee')
      } catch (error) {
        console.log(error)
      }
    },
    // #endregion 1

    // #region 2: Cập nhật ngày sinh
    /**
     * Hàm cập nhật ngày sinh
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    updateDateOfBirth (dateOfBirth) {
      try {
        this.employee.dateOfBirth = dateOfBirth
      } catch (error) {
        console.log(error)
      }
    },
    // #endregion 2

    // #region 3: Cập nhật ngày cấp CMND
    /**
     * Hàm cập nhật ngày cấp
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    updateIdentityDate (identityDate) {
      try {
        this.employee.identityDate = identityDate
      } catch (error) {
        console.log(error)
      }
    },
    // #endregion 3

    // #region 4: Cập nhật phòng ban
    /**
     * Hàm cập nhật phòng ban
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    updateDepartment (departmentId) {
      try {
        this.employee.departmentId = departmentId
      } catch (error) {
        console.log(error)
      }
    },
    // #endregion

    // #region 5: Lưu nhân viên
    /**
     * Hàm lưu nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    saveEmployee () {
      try {
        // Kiểm tra xem có lỗi không
        if (this.validateData()) {
          // Lưu nhân viên
          HTTP.post('employees', this.employee)
            .then((result) => {
              this.$emit('saveEmployeeSuccess')
            }).catch((err) => {
              // Biến lưu lại các trường bị lỗi server trả về
              const propertyInvalidLists = err.response.data.propertyInvalidLists
              const misaCode = err.response.data.misaCode
              this.validateDataServer(misaCode, propertyInvalidLists)
            })
        }
      } catch (error) {
        console.log(error)
      }
    },
    // #endregion 5

    // #region 6: Đóng Popup cảnh báo
    /**
     * Hàm đóng Popup cảnh báo trùng mã nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    closePopupWarning () {
      try {
        // Đóng thông báo trùng mã
        this.isShowEmployeeCodeWarning = false
        const firstErrorInput = this.errorProperties[0]
        if (firstErrorInput !== 'departmentId') {
          this.$refs[firstErrorInput].focus()
        }
      } catch (error) {
        console.log(error)
      }
    },
    // #endregion 6

    // #region 7: Kiểm tra giá trị mã nhân viên
    /**
     * Hàm kiểm tra giá trị của mã nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    checkValueEmployeeCode () {
      try {
        // Kiểm tra mã nhân viên có trống không
        if (!this.employee.employeeCode) {
          // Thêm lỗi
          this.errorProperties.push('employeeCode')
        } else {
          // Xóa lỗi
          const index = this.errorProperties.indexOf('employeeCode')
          if (index > -1) {
            this.errorProperties.splice(index, 1)
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    // #endregion 7

    // #region 8: Kiểm tra giá trị tên nhân viên
    /**
     * Hàm kiểm tra giá trị của tên nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    checkValueEmployeeName () {
      try {
        // Kiểm tra tên nhân viên có rỗng không
        if (!this.employee.employeeName) {
          // Thêm lỗi
          this.errorProperties.push('employeeName')
        } else {
          // Xóa lỗi
          const index = this.errorProperties.indexOf('employeeName')
          if (index > -1) {
            this.errorProperties.splice(index, 1)
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    // #endregion 8

    // #region 9: Đóng Popup thông báo lỗi
    /**
     * Hàm đóng Popup thông báo lỗi
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    closePopupError () {
      try {
        // Đóng thông báo lỗi
        this.isShowPopupError = false
        if (this.errorProperties.includes('employeeCode')) {
          this.$refs.employeeCode.focus()
        } else if (this.errorProperties.includes('employeeName')) {
          this.$refs.employeeName.focus()
        } else if (this.errorProperties.includes('identityNumber')) {
          this.$refs.identityNumber.focus()
        }
        // const firstErrorInput = this.errorProperties[0]
        // if (firstErrorInput !== 'departmentId') {
        //   this.$refs[firstErrorInput].focus()
        // }
      } catch (error) {
        console.log(error)
      }
    },
    // #endregion 9

    // #region 10: Thêm phòng ban vào danh sách lỗi
    /**
     * Hàm thêm phòng ban vào danh sách lỗi
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    addErrorDepartment () {
      try {
        // Kiểm tra xem lỗi đã tồn tại trong mảng lỗi chưa
        if (!this.errorProperties.includes('departmentId')) {
          this.errorProperties.push('departmentId')
        }
      } catch (error) {
        console.log(error)
      }
    },
    // #endregion 10

    // #region 11: Xóa phòng ban khỏi danh sách lỗi
    /**
     * Hàm xóa phòng ban khỏi danh sách lỗi
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    removeErrorDepartment () {
      try {
        // Xóa lỗi khỏi mảng lỗi
        const index = this.errorProperties.indexOf('departmentId')
        if (index > -1) {
          this.errorProperties.splice(index, 1)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // #endregion 11

    // #region 12: Cập nhật giá trị tìm kiếm của department
    /**
     * Hàm cập nhật giá trị department search
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    updateDepartmentSearch (departmentSearch) {
      try {
        // Cập nhật tên phòng ban tìm kiếm
        this.departmentSearch = departmentSearch
      } catch (error) {
        console.log(error)
      }
    },
    // #endregion 12

    // #region 13: Lấy tọa độ chuột khi di chuyển
    /**
     * Hàm lấy tọa độ của chuột khi di chuyển
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    getMousePosition (event) {
      try {
        // Lấy vị trí chuột theo trục X
        this.screenX = event.screenX
        // Lấy vị trí chuột theo trục Y
        this.screenY = event.screenY
      } catch (error) {
        console.log(error)
      }
    },
    // #endregion 13

    // #region 14: Kiểm tra sự thay đổi của dữ liệu trước khi đóng
    /**
     * Hàm kiểm tra sự thay đổi của dữ liệu trước khi đóng
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    checkChangeData () {
      try {
        for (const property in this.employee) {
          // Kiểm tra xem dữ liệu hiện tại có khác dữ liệu ban đầu hay không
          if (this.employee[property] !== this.fakeEmployee[property]) {
            // Hiển thị Popup thông báo dữ liệu thay đã thay đổi
            this.isShowPopupDataChange = true
            return true
          }
        }
        // Đóng Popup thêm nhân viên
        this.closePopupAddEmployee()
      } catch (error) {
        console.log(error)
      }
    },
    // #endregion 14

    // #region 15: Đóng Popup thông báo thay đổi dữ liệu
    /**
     * Hàm đóng Popup thông báo thay đổi dữ liệu
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    closePopupDataChange () {
      try {
        // Đóng Popup thông báo dữ liệu bị thay đổi
        this.isShowPopupDataChange = false
      } catch (error) {
        console.log(error)
      }
    },
    // #endregion 15

    // #region 16: Lưu dữ liệu khi dữ liệu thay đổi
    /**
     * Hàm lưu dữ liệu khi dữ liệu thay đổi
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    saveData () {
      try {
        // Đóng Popup thông báo dữ liệu bị thay đổi
        this.closePopupDataChange()
        // Lưu nhân viên
        this.saveEmployee()
      } catch (error) {
        console.log(error)
      }
    },
    // #endregion 16

    // #region 17: Lưu và tạo mới
    /**
     * Hàm lưu và tạo
     */
    saveEmployeeAndAdd () {
      try {
        if (this.validateData()) {
          // Lưu nhân viên
          HTTP.post('employees', this.employee)
            .then((result) => {
              this.isShowLoading = true
              this.resetData()
            }).catch((err) => {
              // Ẩn loading
              this.isShowLoading = false
              // Biến lưu lỗi của các trường từ server trả về
              var propertyInvalidLists = err.response.data.propertyInvalidLists
              var misaCode = err.response.data.misaCode
              this.validateDataServer(misaCode, propertyInvalidLists)
            })
        }
      } catch (error) {
        console.log(error)
      }
    },
    // #endregion 17

    // #region 18: Xóa lỗi Email
    /**
     * Xóa lỗi Email
     * CreatedBy: PTANH
     * CreatedDate: 17/06/2021
     */
    removeEmailError () {
      try {
        if (this.errorProperties.includes('email') !== -1) {
          const index = this.errorProperties.indexOf('email')
          if (index > -1) {
            this.errorProperties.splice(index, 1)
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    // #endregion 18

    // #region 19: Kiểm tra giá trị số CMND
    /**
     * Hàm kiểm tra giá trị của số CMND
     * CreatedBy: PTANH
     * CreatedDate: 18/06/2021
     */
    checkIdentityNumber () {
      try {
        // Kiểm tra người dùng nhập có phải số không
        const isNumber = this.isNumeric(this.employee.identityNumber)
        // Kiểm tra có lỗi mã CMND trong danh sách lỗi chưa
        const index = this.errorProperties.indexOf('identityNumber')
        if (!isNumber && index === -1) {
          // Thêm lỗi
          this.errorProperties.push('identityNumber')
        }
        if ((isNumber && index > -1) || !this.employee.identityNumber) {
          // Xóa lỗi
          this.errorProperties.splice(index, 1)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // #endregion 19

    // #region 20: Tab đến ô mã nhân viên
    /**
     * Hàm di chuyển đến ô input mã nhân viên
     * CreatedBy: PTANH
     * CreatedDate: 22/06/2021
     */
    moveToEmployeeCode () {
      try {
        this.$refs.employeeCode.focus()
      } catch (error) {
        console.log(error)
      }
    },
    // #endregion 20

    // #endregion I

    // #region II: Các hàm khác

    // #region 1: Đặt lại dữ liệu về ban đầu
    /**
     * Hàm đặt lại dữ liệu của Popup add
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    resetData () {
      // Đặt lại giá trị cho biết employee
      this.employee = {
        employeeCode: this.latestEmployeeCode,
        employeeName: '',
        dateOfBirth: '',
        gender: 0,
        departmentId: '',
        identityNumber: '',
        identityDate: '',
        identityPlace: '',
        employeePosition: '',
        address: '',
        bankAccountNumber: '',
        bankName: '',
        bankBranchName: '',
        bankProvinceName: '',
        phoneNumber: '',
        telephoneNumber: '',
        email: ''
      }
      // Đặt lại tên phòng ban tìm kiếm
      this.departmentSearch = ''
      // Đặt lại phòng ban tìm kiếm trong component v-autocomplete
      EventBus.$emit('resetDepartmentSearch')
      // Đặt lại date cho component v-datepicker
      EventBus.$emit('resetDataDatePicker')
      this.$emit('saveEmployeeSuccessAndAdd')
      // Lấy mã nhân viên mới
      HTTP.get('employees/new-code')
        .then((result) => {
          // Gán mã nhân viên mới
          this.employee.employeeCode = result.data
          // Focus vào ô mã nhân viên
          this.$refs.employeeCode.focus()
          // Sao chép biến employee
          this.fakeEmployee = { ...this.employee }
          // Ẩn loading
          this.isShowLoading = false
        }).catch((err) => {
          // Log lỗi
          console.log(err)
        })
    },
    // #endregion 1

    // #region 2: Kiểm tra giá trị email
    /**
     * Hàm kiểm tra giá trị của email
     * CreatedBy: PTANH
     * CreatedDate: 22/06/2021
     */
    checkValueEmail (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    // #endregion 2

    // #region 3: Validate dữ liệu
    /**
     * Hàm validate dữ liệu
     * CreatedBy: PTANH
     * CreatedDate: 22/06/2021
     */
    validateData () {
      // Kiểm tra mã khách hàng có trống hay lỗi không
      if (!this.employee.employeeCode && !this.errorProperties.includes('employeeCode')) {
        this.errorProperties.push('employeeCode')
      }
      // Kiểm tra tên nhân viên có trống hay lỗi không
      if (!this.employee.employeeName && !this.errorProperties.includes('employeeName')) {
        this.errorProperties.push('employeeName')
      }
      // Kiểm tra phòng ban có trống hay lỗi không
      if ((!this.employee.departmentId || !this.departmentSearch) && !this.errorProperties.includes('departmentId')) {
        this.errorProperties.push('departmentId')
      }
      // Kiểm tra email có hợp lệ không
      if (!this.checkValueEmail(this.employee.email) && !this.errorProperties.includes('email') && this.employee.email) {
        this.errorProperties.push('email')
        this.errorMessage = Message.emailInvalid
      }

      // Hiển thị thông báo lỗi
      var result = this.showPopupError()
      return result
    },
    // #endregion 3

    // #region 4: Hiển thị thông báo lỗi
    /**
     * Hàm hiển thị thông báo lỗi
     * CreatedBy: PTANH
     * CreatedDate: 22/06/2021
     */
    showPopupError () {
      if (this.errorProperties.length > 0) {
        if (this.errorProperties.includes('employeeCode')) {
          if (!this.employee.employeeCode) {
            this.errorMessage = Message.employeeCodeEmpty
            this.isShowPopupError = true
          } else {
            this.isShowEmployeeCodeWarning = true
          }
        } else if (this.errorProperties.includes('employeeName')) {
          this.isShowPopupError = true
          this.errorMessage = Message.employeeNameEmpty
        } else if (this.errorProperties.includes('departmentId')) {
          this.isShowPopupError = true
          if (!this.departmentSearch) {
            this.errorMessage = Message.departmentEmpty
          } else {
            this.errorMessage = Message.departmentNotExist
          }
        } else if (this.errorProperties.includes('identityNumber')) {
          this.errorMessage = Message.identityNumberInvalid
          this.isShowPopupError = true
        } else if (this.errorProperties.includes('email')) {
          this.errorMessage = Message.emailInvalid
          this.isShowEmployeeCodeWarning = true
        }
        return false
      }
      return true
    },
    // #endregion 4

    // #region 5: Bắt các lỗi từ server
    /**
     * Validate dữ liệu từ server
     * CreatedBy: PTANH
     * CreatedDate: 22/06/2021
     */
    validateDataServer (misaCode, propertyInvalidLists) {
      if (misaCode === 400) {
        propertyInvalidLists.every(element => {
          if (element.propertyName === 'employeeCode') {
            this.errorMessage = `Mã nhân viên <${this.employee.employeeCode}> đã tồn tại trong hệ thống, vui lòng kiểm tra lại.`
            // Thêm lỗi trùng mã
            this.errorProperties.push('employeeCode')
            // Hiện Popup cảnh báo trùng mã
            this.isShowEmployeeCodeWarning = true
          } else if (element.propertyName === 'email') {
            this.errorMessage = Message.emailInvalid
            // Thêm lỗi email vào danh sách lỗi
            this.errorProperties.push('email')
            // Hiện Popup cảnh báo trùng mã
            this.isShowEmployeeCodeWarning = true
          }
        })
      } else if (misaCode === 650) {
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
    },
    // #endregion 5

    // #region 6: Kiểm tra chuỗi có phải số không
    /**
     * Hàm kiểm tra một chuỗi có phải là một số hợp lệ hay không
     * CreatedBy: PTANH
     * CreatedDate: 18/06/2021
     */
    isNumeric (str) {
      if (typeof str !== 'string') return false // Kiểm tra str có phải chuỗi không
      return !isNaN(str) &&
         !isNaN(parseFloat(str))
    }
    // #endregion 6

    // #endregion
  }

  // #endregion
}
</script>

<style lang="scss" scoped>
@import "../../../../scss/_variable.scss";
@import "./_style.scss";
</style>
