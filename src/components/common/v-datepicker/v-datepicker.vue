<template>
  <div :class="['date-picker', { 'border-focus': focusInput}]" @click="focusInput = true" v-click-outside="ChangeBorderColor">
    <!-- <date-pick v-model="date" :weekdays="weekDays" :months="months" :displayFormat="dateFormat"></date-pick>
    <div class="calendar">
      <div class="icon-calendar"></div>
    </div> -->
    <date-pick v-model="date" :weekdays="weekDays" :months="months" :displayFormat="dateFormat" :isDateDisabled="isFutureDate">
        <template v-slot:default="{toggle, processUserInput, valueToInputFormat}">
            <input @click="toggle" :value="valueToInputFormat(date)" @input="processUserInput($event.target.value)" v-mask="'99/99/9999'">
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
import moment from 'moment'
export default {
  components: { DatePick },
  data: () => ({
    date: '',
    weekDays: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    dateFormat: CONSTANTS.DATE_FORMAT,
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
    ],
    focusInput: false
  }),
  props: {
    dateOfBirth: {
      type: String,
      default: moment().format('YYYY-MM-DD')
    }
  },
  created () {
    this.date = this.dateOfBirth
  },
  methods: {
    isFutureDate (date) {
      const currentDate = new Date()
      return date > currentDate
    },
    ChangeBorderColor () {
      this.focusInput = false
    }
  },
  watch: {
    date (newValue, oldValue) {
      this.$emit('updateValue', newValue)
    }
  }
}
</script>

<style lang="scss">
@import './_style.scss';
</style>
