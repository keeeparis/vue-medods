<script>
import FormUser from './components/FormUser'
import FormAddress from './components/FormAddress'
import FormPassport from './components/FormPassport'

export default {
  components: { FormUser, FormAddress, FormPassport },
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

      <button type="submit">Отправить</button>

    </form>
  </div>
</template>

<style lang="scss">
@import './assets';
</style>
