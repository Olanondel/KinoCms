<template>
  <section class="userEdit">
    <div class="own-flex">
      <InputWithText text="Имя" v-model="firstName" />
      <RadioWithText
          text="Язык"
          value1="ru"
          text1="Русский"
          id1="radio1"
          value2="ua"
          text2="Украинский"
          id2="radio2"
          name="radioname1"
          v-model="language"
      />
    </div>

    <div class="own-flex">
      <InputWithText text="Фамилия" v-model="lastName" />
      <RadioWithText
          text="Пол"
          value1="male"
          text1="Мужской"
          id1="radio3"
          value2="female"
          text2="Женский"
          id2="radio4"
          name="radioname2"
          v-model="gender"
      />
    </div>

    <div class="own-flex">
      <InputWithText text="Псевдоним" v-model="nickname" />
      <InputWithText text="Телефон" v-model="phone" type="tel" />
    </div>

    <div class="own-flex">
      <InputWithText text="E-mail" v-model="email" />

      <DateWithText text="Дата рождения" v-model="dob"/>
    </div>

    <div class="own-flex">
      <InputWithText text="Адресс" v-model="address" />
      <SelectWithText text="Город" v-model="city" />
    </div>

    <div class="own-flex">
      <InputWithText type="password" text="Пароль" v-model="password" />
      <InputWithText type="password" text="Повторить пароль" v-model="password1" />
    </div>

    <InputWithText text="Номер карты" v-model="cardNumber" />

    <SaveButton :isFetching="isFetching" @saveEvent="save" />
  </section>
</template>

<script>
import InputWithText from "../../components/general/InputWithText";
import DateWithText from "../../components/general/DateWithText";
import RadioWithText from "../../components/general/RadioWithText";
import SelectWithText from "../../components/general/SelectWithText";
import server from '../../requests/requests'
import SaveButton from "../../components/general/SaveButton";

export default {
  name: "UserEdit",
  components: {SaveButton, SelectWithText, RadioWithText, DateWithText, InputWithText},
  data() {
    return {
      firstName: '',
      lastName: '',
      nickname: '',
      email: '',
      address: '',
      password: '',
      password1: '',
      cardNumber: '',
      language: 'ru',
      gender: 'male',
      phone: '',
      dob: '',
      city: 'Киев',
      id: '',
      isFetching: false
    }
  },
  methods: {
    async save() {
      if (this.password1 === this.password) {
        this.isFetching = true
        this.id = await server.getId(this.id, 'Users')

        await server.saveToDb({
          firstName: this.firstName,
          lastName: this.lastName,
          nickname: this.nickname,
          email: this.email,
          address: this.address,
          password: this.password,
          password1: this.password1,
          cardNumber: this.cardNumber,
          language: this.language,
          gender: this.gender,
          phone: this.phone,
          dob: this.dob,
          creationalDate: this.getDate(),
          city: this.city,
          id: this.id,
          isFetching: false,
        }, 'Users')
        this.isFetching = false
        await this.$router.push({ name: 'users' })
      } else {
        alert('Пароли не совпадают')
      }
    },
    async setData() {
      let id = this.$route.params.id

      if (id) {
        let data = await server.getCurrentData(id, 'Users')

        for (let key in data) {
          this[key] = data[key]
        }
      }
    },
    getDate() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();

      return today = dd + '-' + mm + '-' + yyyy;
    },
  },
  created() {
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