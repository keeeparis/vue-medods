<template>
  <fieldset>
    <legend><h2>{{ title }}</h2></legend>

    <!-- Тип документа -->
    <select-item 
      :v='v$.documentValue'
      v-model='documentValue'
      text='Тип документа *'
      name='documentValue'
      :defaultValue='documentValueDefault'
      :valueList='documentTypeList'
      @update-selected='updateValue'
    />

    <!-- Серия -->
    <field 
      v-model="series"
      text='Серия'
      name='series'
      type='text'
    />

    <!-- Номер -->
    <field 
      v-model="passportId"
      text='Номер'
      name='passportId'
      type='text'
    />

    <!-- Кем выдан -->
    <field 
      v-model="issuedBy"
      text='Кем выдан'
      name='issuedBy'
      type='text'
    />

    <!-- Дата выдачи -->
    <field 
      :v='v$.dateOfIssue'
      v-model="dateOfIssue"
      text='Дата выдачи *'
      name='dateOfIssue'
      type='date'
    />
  </fieldset>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, helpers } from "@vuelidate/validators"

import Field from '@/components/Field'
import SelectItem from '@/components/SelectItem'
import { mustBeInPast } from '@/utils/validators'

export default {
  setup () {
    return { 
      v$: useVuelidate()
    }
  },
  components: { Field, SelectItem },
  props: ['title'],
  data() {
    return {
      documentTypeList: ['Паспорт', 'Свидетельство о рождении', 'Вод. удостоверение'],
      documentValueDefault: 'Выберите тип документа',
      documentValue: '',
      isDocumentTypeVisible: false,
      series: '',
      passportId: '',
      issuedBy: '',
      dateOfIssue: ''
    }
  },
  validations() {
    return {
      documentValue: { 
        required: helpers.withMessage('Выберите тип документа', required),
      },
      dateOfIssue: {
        required: helpers.withMessage('Введите дату выдачи', required),
        mustBeInPast: helpers.withMessage('Выберите дату в прошлом', mustBeInPast)
      },
    }
  },
  methods: {
    updateValue(item) {
      this.documentValue = item
    },
    async validate() {
      const isValid = await this.v$.$validate()
      return isValid && this.generateData()
    },
    generateData() {
      const data = {
        documentValue: this.documentValue,
        series: this.series,
        passportId: this.passportId,
        issuedBy: this.issuedBy,
        dateOfIssue: this.dateOfIssue
      }
      return data
    }
  }
}
</script>