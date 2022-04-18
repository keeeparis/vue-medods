<template>
  <fieldset>
    <legend><h2>Адрес</h2></legend>

    <!-- Индекс -->
    <div class="field">
      <label for="index">Индекс</label>
      <input v-model="index" id="index" type="number">
      <div class="error-wrapper" />
    </div>

    <!-- Страна -->
    <div class="field">
      <label for="country">Страна</label>
      <input v-model="country" id="country">
      <div class="error-wrapper" />
    </div>

    <!-- Область -->
    <div class="field">
      <label for="region">Область</label>
      <input v-model="region" id="region">
      <div class="error-wrapper" />
    </div>

    <!-- Город -->
    <div class="field" :class="{ error: v$.city.$errors.length }">
      <label for="city">Город *</label>
      <input v-model="city" id="city" @blur="v$.city.$touch()">
      <div class="error-wrapper">
        <div class="input-errors error" v-for="error of v$.city.$errors" :key="error.$uid">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
    </div>

    <!-- Улица -->
    <div class="field">
      <label for="street">Улица</label>
      <input v-model="street" id="street">
      <div class="error-wrapper" />
    </div>

    <!-- Дом -->
    <div class="field">
      <label for="house">Дом</label>
      <input v-model="house" id="house">
      <div class="error-wrapper" />
    </div>

  </fieldset>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, helpers } from "@vuelidate/validators"

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      index: '',
      country: '',
      region: '',
      city: '',
      street: '',
      house: ''
    }
  },
  validations() {
    return {
      city: { 
        required: helpers.withMessage('Введите город', required) 
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>