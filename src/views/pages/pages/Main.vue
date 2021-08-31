<template>
  <Preloader v-if="!init"/>

  <section v-else class="newsEditPage">
      <div class="switcher">
        <SwitcherWithText class="margin" v-model="state" :stateText="stateText"/>
      </div>


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
import InputWithText from "../../../components/general/InputWithText";
import TextAreaWithText from "../../../components/general/TextAreaWithText";
import Seo from "../../../components/general/Seo";
import SaveButton from "../../../components/general/SaveButton";
import server from '@/requests/requests'
import db from '@/firebase/firebaseInit.js'
import Preloader from "../../../components/general/Preloader";
import AdditionalInput from "../../../components/general/AdditionalInput";
import {mapGetters} from "vuex";

export default {
  name: "MainEdit",
  components: {
    AdditionalInput,
    Preloader,
    SaveButton,
    Seo, TextAreaWithText, InputWithText, SwitcherWithText
  },
  data() {
    return {
      tel1: '',
      tel2: '',
      state: null,
      to: "mainEdit",
      stateText: 'ВЫКЛ',
      seoText: '',
      date: '',
      id: 'mainPage',
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
    async changeLang() {
      let result = await server.getLang(this.currentLang, db.collection('Language').doc('Pages').collection('MainPage').doc(this.currentLang))

      this.lang = result.data()
    },
    async getLang() { await this.changeLang(this.currentLang) },
    changeSeo(seo) {
      this.seo = seo
    },
    async getData() {
      let id = this.id

      let data = await server.getCurrentData(id, 'Pages', this.currentLang)

      if (data) {
        for await (let [key, value] of Object.entries(data)) {
          this[key] = value
        }
      } else {
        Object.assign(this.$data, this.$options.data.call(this), {lang: this.lang, init: true, id: this.id, to: 'mainEdit'})
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
        stateText: this.stateText,
        seoText: this.seoText,
        state: this.state,
        id: this.id,
        to: 'mainEdit',
        notDelete: this.notDelete,
        init: true,
        seo: this.seo,
        isFetching: false
      }, 'Pages', null, null, null, 'mainPage', this.currentLang)
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
    },
    currentLang() {
      Promise.all([this.getLang(), this.getData()])
    }
  },
  computed: mapGetters(['currentLang']),
  async mounted() {
    await Promise.all([this.getData(), this.getLang()])
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

.switcher {
  display: flex;
  justify-content: flex-end;
}

.margin {
  margin: 5px 150px 0 0;
  align-items: center;
}
</style>