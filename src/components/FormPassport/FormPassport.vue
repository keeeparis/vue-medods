<template>
  <fieldset>
    <legend><h2>Паспорт</h2></legend>

    <!-- Тип документа -->
    <div 
      class="field" 
      :class="{ error: v$.documentType.$errors.length }" 
      v-click-outside="hideOptions"
    >
      <label for="documentType">Тип документа <b>*</b></label>

      <div class="select" :class="{ rotate: isDocumentTypeVisible }">
        <div 
          class="select-default" 
          @click="toggleOptions" 
          @blur="v$.documentType.$touch()"
        >
          {{ documentType ? documentType : documentTypeDefault }}
        </div>

        <ul class="select-ul" v-show="isDocumentTypeVisible">
          <li 
            v-for="variant in documentTypeList" 
            :key="variant" 
            class="select-li"
            :class="{ active: documentType === variant }"
            @click="onClick(variant)"
          >
            {{ variant }}
          </li>
        </ul>
      </div>
      
      <div class="error-wrapper">
        <div 
          class="input-errors error" 
          v-for="error of v$.documentType.$errors" 
          :key="error.$uid"
        >
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
      <label for="dateOfIssue">Дата выдачи <b>*</b></label>
      <input 
        v-model="dateOfIssue" 
        id="dateOfIssue" 
        @blur="v$.dateOfIssue.$touch()" 
        type="date"
      >
      <div class="error-wrapper">
        <div 
          class="input-errors error" 
          v-for="error of v$.dateOfIssue.$errors" 
          :key="error.$uid"
        >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
    </div>
  </fieldset>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, helpers } from "@vuelidate/validators"
import { mustBeInPast } from '@/utils/validators'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      documentTypeList: ['Паспорт', 'Свидетельство о рождении', 'Вод. удостоверение'],
      documentTypeDefault: 'Выберите тип документа',
      documentType: '',
      isDocumentTypeVisible: false,
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
  },
  methods: {
    onClick(item) {
      this.documentType = item
      this.hideOptions()
    },
    hideOptions() {
      this.isDocumentTypeVisible = false
    },
    toggleOptions() {
      this.isDocumentTypeVisible = !this.isDocumentTypeVisible
    }
  }
}
</script>

<style lang="scss" scoped>
</style>