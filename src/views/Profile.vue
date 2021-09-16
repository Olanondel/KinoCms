<template>
  <section class="content-wrapper">
    <div class="container pt-4 pb-4">

      <PreloaderColor v-if="loading || !this.currentUser" />

      <template v-else-if="this.currentUser && !loading">
        <div class="row">
          <div class="col-6">
            <InputWithText text="Имя" v-model="firstName"/>
          </div>

          <div class="col-6">
            <RadioWithText
              text="Язык"
              value1="ru"
              text1="Русский"
              id1="radio1"
              value2="ua"
              text2="Украинский"
              id2="radio2"
              name="radioname1"
              :current="language"
              @changeState="changeLanguage"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <InputWithText text="Фамилия" v-model="lastName"/>
          </div>

          <div class="col-6">
            <RadioWithText
              text="Пол"
              value1="male"
              text1="Мужской"
              id1="radio3"
              value2="female"
              text2="Женский"
              id2="radio4"
              name="radioname2"
              :current="gender"
              @changeState="changeGender"
            />
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <InputWithText text="Псевдоним" v-model="nickname"/>
          </div>
          <div class="col-6">
            <InputWithText text="Телефон" v-model="phone" type="tel"/>
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <InputWithText text="E-mail" v-model="email"/>
          </div>
          <div class="col-6">
            <DateWithText text="Дата рождения" v-model="dob"/>
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <InputWithText text="Адресс" v-model="address"/>
          </div>
          <div class="col-6">
            <SelectWithText text="Город" v-model="city"/>
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <InputWithText type="password" text="Пароль" v-model="password"/>
          </div>
          <div class="col-6">
            <InputWithText type="password" text="Повторить пароль" v-model="confirmPassword"/>
          </div>
        </div>

        <div class="row">
          <div class="col-6">
            <InputWithText text="Номер карты" v-model="cardNumber"/>
          </div>
        </div>

        <SaveButton :isFetching="isFetching" @saveEvent="save"/>
      </template>

    </div>
  </section>
</template>

<script>
import InputWithText from "../components/admin/general/InputWithText";
import DateWithText from "../components/admin/general/DateWithText";
import RadioWithText from "../components/admin/general/RadioWithText";
import SelectWithText from "../components/admin/general/SelectWithText";
import SaveButton from "../components/admin/general/SaveButton";
import {mapGetters} from "vuex";
import PreloaderColor from "../components/site/preloader/Preloader-color";

export default {
  name: "UserProfileEdit",
  components: {PreloaderColor, SaveButton, SelectWithText, RadioWithText, DateWithText, InputWithText},
  data() {
    return {
      firstName: '',
      lastName: '',
      nickname: '',
      email: '',
      address: '',
      password: '',
      confirmPassword: '',
      cardNumber: '',
      language: 'ru',
      gender: 'male',
      phone: '',
      dob: '',
      city: '',
      id: '',
      loading: true,
      isFetching: false
    }
  },
  methods: {
    async save() {
      if (this.confirmPassword === this.password) {
        this.isFetching = true

        await this.$store.dispatch('saveUserData', this.$data)
        this.isFetching = false
      } else {
        alert('Пароли не совпадают')
      }
    },
    async setData() {
      if (this.currentUser) {
        for (let [key, value] of Object.entries(this.currentUser)) {
          this[key] = value
        }
      }

      this.loading = false
    },
    getDate() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();

      return today = dd + '-' + mm + '-' + yyyy;
    },
    changeGender(value) {
      this.gender = value
    },
    changeLanguage(value) {
      this.language = value
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'isAuth'])
  },
  watch: {
    currentUser() {
      this.setData()
    }
  },
  mounted() {
    this.setData()
  }
}
</script>

<style scoped>
.userEdit {
  max-width: 1100px;
  margin: 0 auto;
}

.own-flex {
  display: flex;
  gap: 40px;
}
</style>