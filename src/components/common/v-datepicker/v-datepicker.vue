<template>
  <div :class="['date-picker', { 'border-focus': focusInput}]" @click="focusInput = true" v-click-outside="changeBorderColor">
    <date-pick v-model="date" :weekdays="weekDays" :months="months" :displayFormat="dateFormat" :isDateDisabled="isFutureDate">
        <template v-slot:default="{toggle, processUserInput, valueToInputFormat}">
            <input class="input-date" @click="toggle" :value="valueToInputFormat(date)" @focus="focusInput = true" @blur="focusInput = false" @input="processUserInput($event.target.value)" v-mask="dateFormatMask" :placeholder="dateFormat">
            <div class="calendar" @click="toggle">
              <div class="icon-calendar"></div>
            </div>
        </template>
    </date-pick>
  </div>
</template>

<script>
import DatePick from 'vue-date-pick'
import 'vue-date-pick/dist/vueDatePick.css'
import CONSTANTS from '../../../constants/constants'
import EventBus from '../../../event-bus/event-bus'
import moment from 'moment'
export default {
  // #region Declare
  components: { DatePick },
  data: () => ({
    date: '', // Biến lưu giá trị của ngày được chọn
    weekDays: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'], // Biến lưu giá trị hiển thị ngày
    dateFormat: CONSTANTS.DATE_FORMAT, // Định dạng hiển thị
    dateFormatMask: CONSTANTS.DATE_FORMAT_MASK, // Định dạng hiển thị khi nhập trong ô input
    months: [
      'Tháng 1',
      'Tháng 2',
      'Tháng 3',
      'Tháng 4',
      'Tháng 5',
      'Tháng 6',
      'Tháng 7',
      'Tháng 8',
      'Tháng 9',
      'Tháng 10',
      'Tháng 11',
      'Tháng 12'
    ], // Biến lưu trữ giá trị hiển thị của tháng
    focusInput: false // Biến xác định input được focus
  }),
  props: {
    // Giá trị ngày tháng năm
    dateOfBirth: {
      type: String,
      default: moment().format('YYYY-MM-DD')
    }
  },
  created () {
    try {
      this.date = this.dateOfBirth
      // Lắng nghe sự kiện reset giá trị ngày
      EventBus.$on('resetDataDatePicker', this.resetData)
    } catch (error) {
      console.log(error)
    }
  },
  destroyed () {
    // Hủy lắng nghe sự kiện
    EventBus.$off('resetDataDatePicker', this.resetData)
  },
  // #endregion

  // #region Methods
  methods: {
    // #region 1: Giới hạn ngày lớn hơn ngày hiện tại
    /**
     * Hàm kiểm tra ngày chọn có lớn hơn ngày hiện tại không
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    isFutureDate (date) {
      try {
        const currentDate = new Date()
        return date > currentDate
      } catch (error) {
        console.log(error)
      }
    },
    // #endregion 1

    // #region 2: Xử lý khi focus input
    /**
     * Hàm thay đổi focus input
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    changeBorderColor () {
      try {
        this.focusInput = false
      } catch (error) {
        console.log(error)
      }
    },
    // #endregion 2

    // #region 3: Reset lại dữ liệu
    /**
     * Hàm reset lại dữ liệu
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    resetData () {
      try {
        this.date = ''
      } catch (error) {
        console.log(error)
      }
    }
  },
  // #endregion 3
  // #endregion

  // #region Theo dõi biến
  watch: {
    // Theo dõi biến date và cập nhật giá trị
    date (newValue, oldValue) {
      try {
        this.$emit('updateValue', newValue)
      } catch (error) {
        console.log(error)
      }
    }
  }
  // #endregion
}
</script>

<style lang="scss">
@import './_style.scss';
</style>
