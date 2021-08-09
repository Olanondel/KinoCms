<template>
  <Preloader v-if="!init" />

  <section v-else class="newsEditPage">
    <Language :currentLang="currentLang" @changeLang="changeLang">
      <SwitcherWithText v-model="state" :stateText="stateText" />
    </Language>

    <div class="row-wrap">
      <div>
        <InputWithText
            :text="lang.title"
            v-model="title"
        />
      </div>
      <div>
        <DateWithText :text="lang.date" v-model="date" />
      </div>
    </div>

    <TextAreaWithText
        v-model="description"
        :text="lang.description"
    />

    <ImageWithTwoButton
        :image="mainImage"
        :text="lang.mainImage"
        :addText="lang.addButton"
        :removeText="lang.removeButton"
        @changeImage="changeMainImage"
        @removeImage="removeMainImage"
    />

    <ImageRow
        :data="images"
        :text="lang.rowImageSize"
        :btnText="lang.addButton"
        @change="changeRowImage"
    />

    <YoutubeLink
        :text="lang.youtubeLink"
        v-model="youtubeLink"
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
import SwitcherWithText from "../../components/general/SwitcherWithText";
import Language from "../../components/general/Language";
import InputWithText from "../../components/general/InputWithText";
import TextAreaWithText from "../../components/general/TextAreaWithText";
import ImageWithTwoButton from "../../components/general/ImageWithTwoButton";
import YoutubeLink from "../../components/general/YoutubeLink";
import Seo from "../../components/general/Seo";
import SaveButton from "../../components/general/SaveButton";
import server from '@/requests/requests'
import ImageRow from "../../components/general/imagesRow/ImagesRow";
import DateWithText from "../../components/general/DateWithText";
import db from '@/firebase/firebaseInit.js'
import Preloader from "../../components/general/Preloader";
export default {
  name: "PromotionsEditPage",
  components: {
    Preloader,
    DateWithText,
    ImageRow,
    SaveButton,
    Seo, YoutubeLink, ImageWithTwoButton, TextAreaWithText, InputWithText, Language, SwitcherWithText},
  data() {
    return {
      title: '',
      date: '',
      currentLang: 'ru',
      state: null,
      stateText: 'ВЫКЛ',
      description: '',
      mainImage: '',
      mainImageFile: null,
      images: ['', '', '', '', ''],
      imagesFiles: [],
      youtubeLink: '',
      id: '',
      init: false,
      isFetching: false,
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
    changeRowImage(file, index) {
      this.imagesFiles.push({file, index})
      let reader = new FileReader()

      reader.onload = () => this.images.splice(index, 1, reader.result)

      reader.readAsDataURL(file)
    },
    changeState(state) {
      this.state = state
    },
    async changeLang(lang) {
      this.currentLang = lang

      let result = await server.getLang(this.currentLang, db.collection('Language').doc('Promotions').collection('Promotions').doc(lang))

      this.lang = result.data()
    },
    getLang() {
      if (!this.currentLang) {
        this.currentLang = navigator.language || navigator.userLanguage
      }

      this.changeLang(this.currentLang)
    },
    changeDate(date) {
      this.date = date
    },
    changeSeo(seo) {
      this.seo = seo
    },
    async getData() {
      let id = this.$route.params.id

      if (id && id !== 'addPromotion') {
        let data = await server.getCurrentData(id, 'Promotions')

        for (let value in data) {
          this[value] = data[value]
        }
      } else {
        this.init = true
      }
    },
    async save() {
      this.isFetching = true
      this.id = await server.getId(this.id, 'Promotions')

      if (!this.date) {
        this.date = this.getDate()
      }

      await server.save({
        title: this.title,
        date: this.date,
        currentLang: this.currentLang,
        stateText: this.stateText,
        description: this.description,
        mainImage: this.mainImage,
        images: ['', '', '', '', ''],
        youtubeLink: this.youtubeLink,
        state: this.state,
        id: this.id,
        init: true,
        seo: this.seo,
        isFetching: false
      }, 'Promotions', this.mainImageFile, this.images, this.imagesFiles)
      this.isFetching = false
      await this.$router.push({name: 'promotions'})
    },
    removeMainImage() {
      this.mainImage = ''
      this.mainImageFile = null
    },
    changeMainImage(file) {
      this.mainImageFile = file

      let reader = new FileReader()

      reader.onload =  () => { this.mainImage = reader.result }

      reader.readAsDataURL(file)
    },
  },
  watch: {
    state: function () {
      if (this.state) {
        /* eslint-env jquery */
        this.stateText = 'ВКЛ'
        $('#toggle-demo').bootstrapToggle('on')
      }
      else {
        this.stateText = 'ВЫКЛ'
        $('#toggle-demo').bootstrapToggle('off')
      }
    }
  },
  mounted() {
    this.getLang()
    this.getData()
  },
  created() {
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