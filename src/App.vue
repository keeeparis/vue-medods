<script>
import FormUser from './components/FormUser.vue'
import FormAddress from './components/FormAddress.vue'
import FormPassport from './components/FormPassport.vue'

export default {
  components: { FormUser, FormAddress, FormPassport },
  data () {
    return {
    }
  },
  methods: {
    async onSubmit() {
      const isUserPartCorrect = await this.$refs.userRef.v$.$validate()
      const isAddressPartCorrect = await this.$refs.addressRef.v$.$validate()
      const isPassportPartCorrect = await this.$refs.passportRef.v$.$validate()

      const isFormCorrect = 
        isUserPartCorrect && 
        isAddressPartCorrect &&
        isPassportPartCorrect
      
      if (isFormCorrect) {
        alert('Forma uspeshno otpravlena!')
      }
    }
  }
}
</script>

<template>
  <div id="app">
    <h1>Vue Форма</h1>
    <form @submit.prevent="onSubmit">

      <div class="wrapper">
        <form-user ref="userRef" />
        <form-address ref="addressRef" />
        <form-passport ref="passportRef" />
      </div>

      <button type="submit">Submit</button>

    </form>
  </div>
</template>

<style lang="scss">
@import './assets/base.scss';

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

h1 {
  text-align: center;
  margin-bottom: 16px;
  font-weight: bolder;
}

h2 {
  font-weight: bold;
  letter-spacing: 0.02em;
}

.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto auto;
  gap: 20px;
}

@media (max-width: 1200px) {
  .wrapper {
    grid-template-columns: repeat(2, 1fr);
  }
  fieldset:first-child {
    grid-row: 1/3;
  }
}

@media (max-width: 800px) {
  fieldset:first-child {
    grid-column: 1/3;
  }
}

@media (max-width: 600px) {
  .wrapper {
    grid-template-columns: 1fr;
  }
  fieldset:first-child {
    grid-column: 1;
  }
}

.field {
  display: flex;
  flex-direction: column;
}

.field > label {
  margin-bottom: 10px;
  font-weight: 300;
}

.error-wrapper {
  min-height: 30px;
  /* color: red; */
}

.error-msg {
  font-size: 0.8em;
}

.error { 
  input, select {
    border-color: red;
  }
  color: red;
}

</style>
