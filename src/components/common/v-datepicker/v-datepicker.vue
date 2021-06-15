<template>
  <div :class="['date-picker', { 'border-focus': focusInput}]" @click="focusInput = true" v-click-outside="ChangeBorderColor">
    <!-- <date-pick v-model="date" :weekdays="weekDays" :months="months" :displayFormat="dateFormat"></date-pick>
    <div class="calendar">
      <div class="icon-calendar"></div>
    </div> -->
    <date-pick v-model="date" :weekdays="weekDays" :months="months" :displayFormat="dateFormat" :isDateDisabled="isFutureDate">
        <template v-slot:default="{toggle, processUserInput, valueToInputFormat}">
            <input class="input-date" @click="toggle" :value="valueToInputFormat(date)" @input="processUserInput($event.target.value)" v-mask="dateFormatMask" :placeholder="dateFormat">
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
  components: { DatePick },
  data: () => ({
    date: '', // Biến lưu giá trị của ngày được chọn
    weekDays: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'], // Biến lưu giá trị hiển thị ngày
    dateFormat: CONSTANTS.DATE_FORMAT, // Định dạng hiển thị ngày tháng năm,
    dateFormatMask: CONSTANTS.DATE_FORMAT_MASK,
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
    this.date = this.dateOfBirth
    EventBus.$on('resetDataDatePicker', this.ResetData)
  },
  destroyed () {
    EventBus.$off('resetDataDatePicker', this.ResetData)
  },
  methods: {
    /**
     * Hàm không cho chọn ngày ở tương lai
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    isFutureDate (date) {
      const currentDate = new Date()
      return date > currentDate
    },
    /**
     * Hàm thay đổi focus input
     */
    ChangeBorderColor () {
      this.focusInput = false
    },
    /**
     * Hàm reset lại dữ liệu
     * CreatedBy: PTANH
     * CreatedDate: 15/06/2021
     */
    ResetData () {
      this.date = ''
      console.log('ok')
    }
  },
  watch: {
    // Theo dõi biến date
    date (newValue, oldValue) {
      this.$emit('updateValue', newValue)
    }
  }
}
</script>

<style lang="scss">
@import './_style.scss';
</style>
