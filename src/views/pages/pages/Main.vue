<template>
  <Preloader v-if="!init"/>

  <section v-else class="newsEditPage">
    <Language :currentLang="currentLang" @changeLang="changeLang">
      <SwitcherWithText v-model="state" :stateText="stateText"/>
    </Language>


    <InputWithText text="Телефон" v-model="tel1">
      <AdditionalInput text="Телефон" v-model="tel2"/>
    </InputWithText>

    <TextAreaWithText
        v-model="seoText"
        text="SEO Текст"
    />

    <Seo
        :value="seo"
        @url="editSeoUrl"
        @title="editSeoTitle"
        @keywords="editSeoKeywords"
        @description="editSeoDescription"
    />

    <SaveButton
        :isFetching="isFetching"
        :text="lang.saveButton"
        @saveEvent="save"
    />


  </section>
</template>

<script>
import SwitcherWithText from "../../../components/general/SwitcherWithText";
import Language from "../../../components/general/Language";
import InputWithText from "../../../components/general/InputWithText";
import TextAreaWithText from "../../../components/general/TextAreaWithText";
import Seo from "../../../components/general/Seo";
import SaveButton from "../../../components/general/SaveButton";
import server from '@/requests/requests'
import db from '@/firebase/firebaseInit.js'
import Preloader from "../../../components/general/Preloader";
import AdditionalInput from "../../../components/general/AdditionalInput";

export default {
  name: "MainEdit",
  components: {
    AdditionalInput,
    Preloader,
    SaveButton,
    Seo, TextAreaWithText, InputWithText, Language, SwitcherWithText
  },
  data() {
    return {
      tel1: '',
      tel2: '',
      currentLang: null,
      state: null,
      to: "mainEdit",
      stateText: 'ВЫКЛ',
      seoText: '',
      date: '',
      id: 'MainPage',
      init: true,
      isFetching: false,
      notDelete: true,
      seo: {
        url: '', title: '', keywords: '', description: ''
      },

      lang: {}
    }
  },
  methods: {
    getDate() {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();

      return today = dd + '-' + mm + '-' + yyyy;
    },
    editSeoUrl(url) {
      this.seo.url = url
    },
    editSeoTitle(title) {
      this.seo.title = title
    },
    editSeoKeywords(keywords) {
      this.seo.keywords = keywords
    },
    editSeoDescription(description) {
      this.seo.description = description
    },
    changeState(state) {
      this.state = state
    },
    async changeLang(lang) {
      this.currentLang = lang

      let result = await server.getLang(this.currentLang, db.collection('Language').doc('Pages').collection('MainPage').doc(lang))

      this.lang = result.data()
    },
    async getLang() {
      if (!this.currentLang) {
        this.currentLang = navigator.language || navigator.userLanguage
      }

      await this.changeLang(this.currentLang)
    },
    changeSeo(seo) {
      this.seo = seo
    },
    async getData() {
      let id = this.id

      let data = await server.getCurrentData(id, 'Pages')

      for await (let [key, value] of Object.entries(data)) {
        this[key] = value
      }
    },
    async save() {
      this.isFetching = true

      if (!this.date) {
        this.date = this.getDate()
      }

      await server.save({
        title: 'Главная Страница',
        tel1: this.tel1,
        tel2: this.tel2,
        date: this.date,
        currentLang: this.currentLang,
        stateText: this.stateText,
        seoText: this.seoText,
        state: this.state,
        id: this.id,
        notDelete: this.notDelete,
        init: true,
        seo: this.seo,
        isFetching: false
      }, 'Pages', null, null, null, 'MainPage')
      this.isFetching = false
      await this.$router.push({name: 'pages'})
    },
  },
  watch: {
    state: function () {
      if (this.state) {
        /* eslint-env jquery */
        this.stateText = 'ВКЛ'
        $("[name='my-checkbox']").bootstrapSwitch('state', true)
      } else {
        this.stateText = 'ВЫКЛ'
        $("[name='my-checkbox']").bootstrapSwitch('state', false)
      }
    }
  },
  async mounted() {
    await this.getData()
    await this.getLang()
  }
}
</script>

<style scoped>
.row-wrap {
  display: flex;
  gap: 40px;
}

.row-wrap > div {
  width: 50%;
}
</style>