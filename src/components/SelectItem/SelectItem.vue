<template>
  <div 
    class="field" 
    :class="{ error: v?.$errors.length }" 
    v-click-outside="hideOptions"
  >
    <label :for="name">{{ text }}</label>

    <div 
      class="select" 
      :class="{ rotate: isVisible }"
    >
      <div 
        class="select-default" 
        @click="toggleOptions" 
        @blur="v?.$touch()"
      >
        {{ value ? value : defaultValue }}
      </div>

      <ul 
        class="select-ul" 
        v-show="isVisible"
      >
        <li 
          v-for="variant in valueList" 
          :key="variant" 
          class="select-li"
          :class="{ active: value === variant }"
          @click="onClick(variant)"
        >
          {{ variant }}
        </li>
      </ul>
    </div>
    
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
    defaultValue: String,
    valueList: Array
  },
  data() {
    return {
      isVisible: false
    }
  },
  methods: {
    onClick(item) {
      this.$emit('update-selected', item)
      this.hideOptions()
    },
    hideOptions() {
      this.isVisible = false
    },
    toggleOptions() {
      this.isVisible = !this.isVisible
    },
  }
}
</script>

<style lang="scss">
@import './SelectItem.scss';
</style>