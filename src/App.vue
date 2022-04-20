<template>
  <div id="app">
    <h1>Vue Форма</h1>
    <form @submit.prevent="onSubmit">
      <div class="wrapper">
        <form-user ref="userRef" title='Пользователь' />
        <form-address ref="addressRef" title='Адрес' />
        <form-passport ref="passportRef" title='Паспорт' />
      </div>

      <button type="submit">Отправить</button>
    </form>
  </div>
</template>

<script>
import FormUser from './containers/FormUser'
import FormAddress from './containers/FormAddress'
import FormPassport from './containers/FormPassport'

export default {
  components: { FormUser, FormAddress, FormPassport },
  methods: {
    async onSubmit() {
      const isUserPart = await this.$refs.userRef.validate()
      const isAddressPart = await this.$refs.addressRef.validate()
      const isPassportPart = await this.$refs.passportRef.validate()

      const isFormCorrect = 
        isUserPart && 
        isAddressPart &&
        isPassportPart
      
      if (isFormCorrect) {
        alert('Forma uspeshno otpravlena! Результаты в console.log()')
        console.log(isUserPart)
        console.log(isAddressPart)
        console.log(isPassportPart)
      }
    }
  }
}
</script>

<style lang="scss">
@import './assets';
</style>
