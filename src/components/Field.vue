<script>
export default {
  props: ['v$', 'dataName', 'inputType', 'text', 'isRequired']
}
</script>
<template>
  <div class="field" :class="{ error: v$.dataName.$errors.length }">
      <label for="dataName">{{text}} <b>*</b></label>
      <input 
        v-model="dataName" 
        id="dataName" 
        @blur="v$.dataName.$touch()" 
        type="inputType"
      >
      <div class="error-wrapper">
        <div 
          class="input-errors error" 
          v-for="error of v$.dataName.$errors" 
          :key="error.$uid"
        >
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>
    </div>
</template>