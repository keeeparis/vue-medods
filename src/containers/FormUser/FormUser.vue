<template>
  <fieldset>
    <legend><h2>{{ title }}</h2></legend>

    <!-- Фамилия -->
    <field 
      :v='v$.lastName'
      v-model="lastName"
      text='Фамилия *'
      name='lastName'
      type='text'
    />

    <!-- Имя -->
    <field 
      :v='v$.firstName'
      v-model="firstName"
      text='Имя *'
      name='firstName'
      type='text'
    />

    <!-- Отчество -->
    <field 
      v-model="middleName"
      text='Отчество'
      name='middleName'
      type='text'
    />

    <!-- Дата рождения -->
    <field 
      :v='v$.birthdayDate'
      v-model="birthdayDate"
      text='Дата рождения *'
      name='birthdayDate'
      type='date'
    />

    <!-- Номер телефона -->
    <field 
      :v='v$.phoneNumber'
      v-model="phoneNumber"
      text='Номер телефона *'
      name='phoneNumber'
      type='number'
    />

    <!-- Пол -->
    <div class="field">
      <label for="sex">Пол</label>

      <div class="sex-wrap">
        <div class="inner">
          <input v-model="sex" id="male" type="radio" value="male">
          <label for="male">Мужчина</label>
        </div>
        <div class="inner">
          <input v-model="sex" id="female" type="radio" value="female">
          <label for="female">Женщина</label>
        </div>
      </div>
      <div class="error-wrapper" />
    </div>


    <!-- Группа клиентов -->
    <multi-select-item
      :v='v$.clientsGroup'
      v-model='clientsGroup'
      text='Группа клиентов *'
      name='clientsGroup'
      :defaultValue='clientsGroupDefault'
      :valueList='clientsGroupList'
      @add-to-list='addToList'
      @delete-index='deleteIndex'
    />

    <!-- Лечащий врач -->
    <select-item 
      :v='v$.personalDoctorValue'
      v-model='personalDoctorValue'
      text='Лечащий врач'
      name='personalDoctorValue'
      :defaultValue='personalDoctorDefault'
      :valueList='personalDoctorList'
      @update-selected='updateValue'
    />

    <!-- Не отправлять СМС -->
    <div class="field">
      <div class="inner">
        <input 
          type="checkbox" 
          v-model="doNotSendSMS" 
          name="doNotSendSMS" 
          id="doNotSendSMS"
        >
        <label for="doNotSendSMS">Не отправлять СМС</label>
      </div>
      <div class="error-wrapper" />
    </div>

  </fieldset>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, helpers, minLength, maxLength } from "@vuelidate/validators"

import Field from '@/components/Field'
import SelectItem from '@/components/SelectItem'
import MultiSelectItem from '@/components/MultiSelectItem'  
import { mustBeInPast, isStartsWithSeven } from '@/utils/validators'

export default {
  setup () {
    return { 
      v$: useVuelidate() 
    }
  },
  components: { Field, SelectItem, MultiSelectItem },
  props: ['title'],
  data() {
    return {
      lastName: '',
      firstName: '',
      middleName: '',
      birthdayDate: '',
      phoneNumber: '7',
      sex: '',
      clientsGroupList: ['VIP', 'Проблемные', 'ОМС'],
      clientsGroupDefault: 'Выберите клиентов',
      clientsGroup: [],
      personalDoctorList: ['Иванов', 'Захаров', 'Чернышева'],
      personalDoctorDefault: 'Выберите врача',
      personalDoctorValue: '',
      doNotSendSMS: false,
    }
  },
  validations() {
    return {
      lastName: { 
        required: helpers.withMessage('Введите фамилию', required)
      },
      firstName: {
        required: helpers.withMessage('Введите имя', required)
      },
      birthdayDate: {
        required: helpers.withMessage('Введите дату рождения', required),
        mustBeInPast: helpers.withMessage('Выберите дату в прошлом', mustBeInPast)
      },
      phoneNumber: {
        required: helpers.withMessage('Введите номер телефона', required),
        isStartsWithSeven: helpers.withMessage('Должен начинаться с цифры 7', isStartsWithSeven),
        minLength: helpers.withMessage('Должно быть не меньше 11 цифр', minLength(11)),
        maxLength: helpers.withMessage('Должно быть не больше 11 цифр', maxLength(11)),
      },
      clientsGroup: {
        required: helpers.withMessage('Выберите клиентов', required)
      }
    }
  },
  methods: {
    addToList(item) {
      if (!this.clientsGroup.includes(item)) {
        this.clientsGroup.push(item)
      }
    },
    deleteIndex(i) {
      this.clientsGroup.splice(i, 1)
    },
    updateValue(item) {
      this.personalDoctorValue = item
    },
    async validate() {
      const isValid = await this.v$.$validate()
      return isValid && this.generateData()
    },
    generateData() {
      const data = {
        lastName: this.lastName,
        firstName: this.firstName,
        middleName: this.middleName,
        birthdayDate: this.birthdayDate,
        phoneNumber: this.phoneNumber,
        sex: this.sex,
        clientsGroup: this.clientsGroup,
        personalDoctorValue: this.personalDoctorValue,
        doNotSendSMS: this.doNotSendSMS,
      }
      return data
    }
  }
}
</script>

<style lang="scss" scoped>
@import './FormUser.scss';
</style>