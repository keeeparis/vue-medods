<template>
  <div 
    class="field" 
    :class="{ error: v?.$errors.length }"
  >
    <label :for="name">{{ text }}</label>

    <input 
      v-model="property"
      @blur="v?.$touch()"
      :type="type"
      :id='name'
    >
    <div class="error-wrapper">
      <div 
        class="input-errors error" 
        v-for="error of v?.$errors" 
        :key="error.$uid"
      >
        <div class="error-msg">
          {{ error.$message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    v: Object,
    value: String,
    text: String,
    name: String,
    type: String
  },
  computed: {
    property: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style lang="scss">
@import './Field.scss';
</style>