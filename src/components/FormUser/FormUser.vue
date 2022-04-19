<template>
  <fieldset>
    <legend><h2>Пользователь</h2></legend>

    <!-- Фамилия -->
    <div class="field" :class="{ error: v$.lastName.$errors.length }">
      <label for="lastName">Фамилия <b>*</b></label>
      <input 
        v-model="lastName" 
        id="lastName" 
        @blur="v$.lastName.$touch()"
      >
      <div class="error-wrapper">
        <div 
          class="input-errors error" 
          v-for="error of v$.lastName.$errors" 
          :key="error.$uid"
        >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
    </div>

    <!-- <field 
      v$ = v$
      dataName = lastName
      inputType = 'text'
      text = 'Фамилия'
      isRequired = true
    /> -->

    <!-- Имя -->
    <div class="field" :class="{ error: v$.firstName.$errors.length }">
      <label for="firstName">Имя <b>*</b></label>
      <input 
        v-model="firstName" 
        id="firstName" 
        @blur="v$.firstName.$touch()"
      >
      <div class="error-wrapper">
        <div 
          class="input-errors error" 
          v-for="error of v$.firstName.$errors" 
          :key="error.$uid"
        >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
    </div>

    <!-- Отчество -->
    <div class="field">
      <label for="middleName">Отчество</label>
      <input v-model="middleName" id="middleName">
      <div class="error-wrapper" />
    </div>

    <!-- Дата рождения -->
    <div class="field" :class="{ error: v$.birthdayDate.$errors.length }">
      <label for="birthdayDate">Дата рождения <b>*</b></label>
      <input 
        v-model="birthdayDate" 
        id="birthdayDate" 
        @blur="v$.birthdayDate.$touch()" 
        type="date"
      >
      <div class="error-wrapper">
        <div 
          class="input-errors error" 
          v-for="error of v$.birthdayDate.$errors" 
          :key="error.$uid"
        >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
    </div>

    <!-- Номер телефона -->
    <div class="field" :class="{ error: v$.phoneNumber.$errors.length }">
      <label for="phoneNumber">Номер телефона <b>*</b></label>
      <input 
        v-model="phoneNumber" 
        id="phoneNumber" 
        @blur="v$.phoneNumber.$touch()" 
        type="number" 
        placeholder="7"
      >
      <div class="error-wrapper">
        <div 
          class="input-errors error" 
          v-for="error of v$.phoneNumber.$errors" 
          :key="error.$uid"
        >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
    </div>

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
    <div 
      class="field" 
      :class="{ error: v$.clientsGroup.$errors.length }"
      v-click-outside:isClientsGroupVisible="hideOptions"
    >
      <label for="clientsGroup">Группа клиентов <b>*</b></label>

      <div class="selected">
        <div 
          class="selected-item" 
          v-for="(item, index) in clientsGroup" 
          :key="index"
          @click="deleteIndex(index)"
        >
          <div>{{ item }}</div>
          <div class="close"></div>
        </div>
      </div>

      <div class="select" :class="{ rotate: isClientsGroupVisible }">
        <div 
          class="select-default"
          :class="{ lighter: clientsGroup.length > 0 }"
          @click="toggleOptions('isClientsGroupVisible')" 
          @blur="v$.clientsGroup.$touch()"
        >
          {{ clientsGroupDefault }}
        </div>

        <ul class="select-ul" v-show="isClientsGroupVisible">
          <li 
            v-for="variant in clientsGroupList" 
            :key="variant" 
            class="select-li" 
            :class="{ active: clientsGroup.includes(variant) }"
            @click="addToList(variant)"
          >
            {{ variant }}
          </li>
        </ul>
      </div>

      <div class="error-wrapper">
        <div class="input-errors error" v-for="error of v$.clientsGroup.$errors" :key="error.$uid">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
    </div>

    <!-- Лечащий врач -->
    <div class="field" v-click-outside:isPersonalDoctorVisible="hideOptions">
      <label for="personalDoctor">Лечащий врач</label>

      <div class="select" :class="{ rotate: isPersonalDoctorVisible }">
        <div class="select-default" @click="toggleOptions('isPersonalDoctorVisible')">
          {{ personalDoctor }}
        </div>

        <ul class="select-ul" v-show="isPersonalDoctorVisible">
          <li 
            v-for="variant in personalDoctorList" 
            :key="variant" 
            class="select-li" 
            :class="{ active: personalDoctor === variant }"
            @click="onDoctorClick(variant)"
          >
            {{ variant }}
          </li>
        </ul>
      </div>
      <div class="error-wrapper" />
    </div>

    <!-- Не отправлять СМС -->
    <div class="field">
      <div class="inner">
        <input type="checkbox" v-model="doNotSendSMS" name="doNotSendSMS" id="doNotSendSMS">
        <label for="doNotSendSMS">Не отправлять СМС</label>
      </div>
      <div class="error-wrapper" />
    </div>

  </fieldset>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, helpers, minLength, maxLength } from "@vuelidate/validators"
import { mustBeInPast, isStartsWithSeven } from '@/utils/validators'
import Field from '../Field.vue'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  components: { Field },
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
      personalDoctor: 'Выберите врача',
      isPersonalDoctorVisible: false,
      isClientsGroupVisible: false,
      doNotSendSMS: false
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
    onDoctorClick(item) {
      this.personalDoctor = item
      this.hideOptions(undefined, 'isPersonalDoctorVisible')
    },
    hideOptions(event, item) {
      this[item] = false
    },
    toggleOptions(item) {
      this[item] = !this[item]
    },
    addToList(item) {
      if (!this.clientsGroup.includes(item)) {
        this.clientsGroup.push(item)
      }
      this.hideOptions(undefined, 'isClientsGroupVisible')
    },
    deleteIndex(i) {
      this.clientsGroup.splice(i, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './FormUser.scss';
</style>