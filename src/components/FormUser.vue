<template>
  <fieldset>
    <legend><h2>Пользователь</h2></legend>

    <!-- Фамилия -->
    <div class="field" :class="{ error: v$.lastName.$errors.length }">
      <label for="lastName">Фамилия *</label>
      <input v-model="lastName" id="lastName" @blur="v$.lastName.$touch()">
      <div class="error-wrapper">
        <div class="input-errors error" v-for="error of v$.lastName.$errors" :key="error.$uid">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
    </div>

    <!-- Имя -->
    <div class="field" :class="{ error: v$.firstName.$errors.length }">
      <label for="firstName">Имя *</label>
      <input v-model="firstName" id="firstName" @blur="v$.firstName.$touch()">
      <div class="error-wrapper">
        <div class="input-errors error" v-for="error of v$.firstName.$errors" :key="error.$uid">
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
      <label for="birthdayDate">Дата рождения *</label>
      <input v-model="birthdayDate" id="birthdayDate" @blur="v$.birthdayDate.$touch()" type="date">
      <div class="error-wrapper">
        <div class="input-errors error" v-for="error of v$.birthdayDate.$errors" :key="error.$uid">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
    </div>

    <!-- Номер телефона -->
    <div class="field" :class="{ error: v$.phoneNumber.$errors.length }">
      <label for="phoneNumber">Номер телефона *</label>
      <input v-model="phoneNumber" id="phoneNumber" @blur="v$.phoneNumber.$touch()" type="number" placeholder="7">
      <div class="error-wrapper">
        <div class="input-errors error" v-for="error of v$.phoneNumber.$errors" :key="error.$uid">
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
    <div class="field" :class="{ error: v$.clientsGroup.$errors.length }">
      <label for="clientsGroup">Группа клиентов *</label>
      <select v-model="clientsGroup" multiple name="clientsGroup" id="clientsGroup" @blur="v$.clientsGroup.$touch()">
        <option value="" disabled>Выбор</option>
        <option v-for="variant in clientsGroupList" :key="variant">{{ variant }}</option>
      </select>
      <div class="error-wrapper">
        <div class="input-errors error" v-for="error of v$.clientsGroup.$errors" :key="error.$uid">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
    </div>

    <!-- Лечащий врач -->
    <div class="field">
      <label for="personalDoctor">Лечащий врач</label>
      <select v-model="personalDoctor" name="personalDoctor" id="personalDoctor">
        <option value="" disabled>Выберите врача</option>
        <option v-for="variant in personalDoctorList" :key="variant">{{ variant }}</option>
      </select>
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
import { required, helpers, minLength, numeric } from "@vuelidate/validators"

export const mustBeInPast = (value) => new Date() > new Date(value)
const isStartsWithSeven = (value) => value[0] === '7'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      lastName: '',
      firstName: '',
      middleName: '',
      birthdayDate: '',
      phoneNumber: '7',
      sex: '',
      clientsGroupList: ['VIP', 'Проблемные', 'ОМС'],
      clientsGroup: [],
      personalDoctorList: ['Иванов', 'Захаров', 'Чернышева'],
      personalDoctor: '',
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
        minLength: helpers.withMessage('Должно быть 11 цифр', minLength(11))
      },
      clientsGroup: {
        required: helpers.withMessage('Выберите клиентов', required)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.sex-wrap {
  display: flex;
  gap: 20px;
}

.inner {
  display: flex;
  align-items: center;
  gap: 5px;
}


</style>