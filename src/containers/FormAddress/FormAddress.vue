<template>
  <fieldset>
    <legend><h2>{{ title }}</h2></legend>

    <!-- Индекс -->
    <field 
      :v='v$.index'
      v-model="index"
      text='Индекс'
      name='index'
      type='text'
    />

    <!-- Страна -->
    <field 
      v-model="country"
      text='Страна'
      name='country'
      type='text'
    />

    <!-- Область -->
    <field 
      v-model="region"
      text='Область'
      name='region'
      type='text'
    />

    <!-- Город -->
    <field 
      :v='v$.city'
      v-model="city"
      text='Город *'
      name='city'
      type='text'
    />

    <!-- Улица -->
    <field 
      v-model="street"
      text='Улица'
      name='street'
      type='text'
    />

    <!-- Дом -->
    <field 
      v-model="house"
      text='Дом'
      name='house'
      type='text'
    />

  </fieldset>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, helpers, numeric } from "@vuelidate/validators"

import Field from '@/components/Field'

export default {
  setup () {
    return { 
      v$: useVuelidate({ $autoDirty: true }) 
    }
  },
  components: { Field },
  props: ['title'],
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
      },
      index: {
        numeric: helpers.withMessage('Допустимы только цифры', numeric) 
      }
    }
  },
  methods: {
    async validate() {
      const isValid = await this.v$.$validate()
      return isValid && this.generateData()
    },
    generateData() {
      const data = {
        index: this.index,
        country: this.country,
        region: this.region,
        city: this.city,
        street: this.street,
        house: this.house
      }
      return data
    }
  }
}
</script>
