<template>
  <div 
    class="field" 
    :class="{ error: v?.$errors.length }" 
    v-click-outside="hideOptions"
  >
    <label :for="name">{{ text }}</label>

    <div class="selected">
      <div 
        v-for="(item, index) in value" 
        :key="index"
        class="selected-item" 
        @click="deleteIndex(index)"
      >
        <div>{{ item }}</div>
        <div class="close" />
      </div>
    </div>

    <div class="select" :class="{ rotate: isVisible }">
      <div 
        class="select-default" 
        :class="{ lighter: value.length > 0 }"
        @click="toggleOptions" 
        @blur="v?.$touch()"
      >
        {{ defaultValue }}
      </div>

      <ul 
        class="select-ul" 
        v-show="isVisible"
      >
        <li 
          v-for="variant in valueList" 
          :key="variant" 
          class="select-li"
          :class="{ active: value.includes(variant) }"
          @click="addToList(variant)"
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
    value: Array,
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
    hideOptions() {
      this.isVisible = false
    },
    toggleOptions() {
      this.isVisible = !this.isVisible
    },
    deleteIndex(i) {
      this.$emit('delete-index', i)
    },
    addToList(item) {
      this.$emit('add-to-list', item)
      this.hideOptions()
    },
  }
}
</script>

<style lang="scss">
@import './MultiSelectItem.scss';
</style>