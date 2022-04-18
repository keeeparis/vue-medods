<template>
  <fieldset>
    <legend><h2>Паспорт</h2></legend>

    <!-- Тип документа -->
    <div class="field" :class="{ error: v$.documentType.$errors.length }">
      <label for="documentType">Тип документа *</label>
      <select v-model="documentType" name="documentType" id="documentType" @blur="v$.documentType.$touch()">
        <option value="" disabled>Выберите тип документа</option>
        <option v-for="variant in documentTypeList" :key="variant">{{ variant }}</option>
      </select>
      <div class="error-wrapper">
        <div class="input-errors error" v-for="error of v$.documentType.$errors" :key="error.$uid">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
    </div>

    <!-- Серия -->
    <div class="field">
      <label for="series">Серия</label>
      <input v-model="series" id="series">
      <div class="error-wrapper" />
    </div>

    <!-- Номер -->
    <div class="field">
      <label for="passportId">Номер</label>
      <input v-model="passportId" id="passportId">
      <div class="error-wrapper" />
    </div>

    <!-- Кем выдан -->
    <div class="field">
      <label for="issuedBy">Кем выдан</label>
      <input v-model="issuedBy" id="issuedBy">
      <div class="error-wrapper" />
    </div>

    <!-- Дата выдачи -->
    <div class="field" :class="{ error: v$.dateOfIssue.$errors.length }">
      <label for="dateOfIssue">Дата выдачи *</label>
      <input v-model="dateOfIssue" id="dateOfIssue" @blur="v$.dateOfIssue.$touch()" type="date">
      <div class="error-wrapper">
        <div class="input-errors error" v-for="error of v$.dateOfIssue.$errors" :key="error.$uid">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, helpers } from "@vuelidate/validators"
import { mustBeInPast } from './FormUser.vue'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      documentTypeList: ['Паспорт', 'Свидетельство о рождении', 'Вод. удостоверение'],
      documentType: '',
      series: '',
      passportId: '',
      issuedBy: '',
      dateOfIssue: ''
    }
  },
  validations() {
    return {
      documentType: { 
        required: helpers.withMessage('Выберите тип документа', required),
      },
      dateOfIssue: {
        required: helpers.withMessage('Введите дату выдачи', required),
        mustBeInPast: helpers.withMessage('Выберите дату в прошлом', mustBeInPast)
      },
    }
  }
}
</script>

<style lang="scss" scoped>
</style>