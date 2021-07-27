<template>
  <div class="hall-edit-page">

    <Language
        @changeLang='changeLang'
        :currentLang="currentLang"
    />

    <InputWithText
        :text="lang.hallNumber"
        :value="hallNumber"
        @change="changeHallNumber"
    />

    <TextAreaWithText
        :text="lang.description"
        :value="description"
        @change="changeDescription"
    />

    <ImageWithTwoButton
        :text="lang.hallScheme"
        @removeImage="removeHallSchemeImage"
        @changeImage="changeHallSchemeImage"
        :image="hallSchemeImage"
        :addText="lang.addText"
        :removeText="lang.removeText"
    />

    <ImageWithTwoButton
        :text="lang.topBanner"
        @removeImage="removeTopBannerImage"
        @changeImage="changeTopBannerImage"
        :image="topBannerImage"
        :addText="lang.addText"
        :removeText="lang.removeText"
    />

    <ImageRow
        @change="changeRowImage"
        :data="images"
        :text="lang.imageRowSizeText"
        :btnText="lang.imageRowButtonText"
    />

    <Seo
        @change="changeSeo"
        :value="seo"
    />

    <SaveButton
        :text="lang.saveButtonText"
    />

  </div>
</template>

<script>
import Language from "../../../components/general/Language";
import InputWithText from "../../../components/general/InputWithText";
import TextAreaWithText from "../../../components/general/TextAreaWithText";
import ImageWithTwoButton from "../../../components/general/ImageWithTwoButton";
import ImageRow from "../../../components/general/imagesRow/ImagesRow";
import Seo from "../../../components/general/Seo";
import SaveButton from "../../../components/general/SaveButton";
import db from '../../../firebase/firebaseInit'

export default {
  name: "HallEditPage",
  components: {SaveButton, Seo, ImageRow, ImageWithTwoButton, TextAreaWithText, InputWithText, Language},
  data() {
    return {
      hallNumber: '',
      description: '',
      hallScheme: '',
      hallSchemeImage: '',
      schemeImageFile: null,
      topBannerImage: '',
      topBannerImageFile: null,
      images: ['', '', '', '', ''],
      imagesFiles: [],
      currentLang: '',
      isFetching: false,
      seo: {
        url: '',
        title: '',
        keywords: '',
        description: ''
      },
      isInit: false,

      lang: {}
    }
  },
  methods: {
    getLang() {
      if (!this.currentLang) {
        this.currentLang = navigator.language || navigator.userLanguage
      }

      let ref = db.collection('Language').doc('Cinema')
          .collection('hallEdit').doc(this.currentLang)

      ref.get()
          .then(doc => {
            this.lang = doc.data()
          })
    },
    changeLang(lang) {
      this.currentLang = lang
      this.getLang()
    },
    changeHallNumber(value) {
      this.hallNumber = value
    },
    changeDescription(value) {
      this.description = value
    },
    removeHallSchemeImage() {
      this.hallSchemeImage = ''
      this.hallSchemeImageFile = ''
    },
    changeHallSchemeImage(file) {
      this.hallSchemeImageFile = file
      let reader = new FileReader()

      reader.onload = () => this.hallSchemeImage = reader.result

      reader.readAsDataURL(file)
    },
    removeTopBannerImage() {
      this.topBannerImage = ''
      this.topBannerImageFile = ''
    },
    changeTopBannerImage(file) {
      this.topBannerImageFile = file
      let reader = new FileReader()

      reader.onload = () => this.topBannerImage = reader.result

      reader.readAsDataURL(file)
    },
    changeRowImage(file, index) {
      this.imagesFiles.push({file, index})
      let reader = new FileReader()

      reader.onload = () => this.images.splice(index, 1, reader.result)

      reader.readAsDataURL(file)
    },
    changeSeo({url, title, keywords, description}) {
      this.seo.url = url
      this.seo.title = title
      this.seo.keywords = keywords
      this.seo.description = description
    },
    saveToDatabase() {
      let ref = db.collection('Cinemas/data')
          .collection('halls')

      ref.set({
        currentLang: 'ru',
        hallNumber: '',
        description: '',
        hallSchemeImage: '',
        hallSchemeImageFile: '',
        topBannerImage: '',
        topBannerImageFile: '',
        rowImages: ['', '', '', '', ''],
        rowImagesFiles: [],
        seo: {
          url: '',
          title: '',
          keywords: '',
          description: '',
        },
      })
    }
  },
  created() {
    this.getLang()
  }
}
</script>

<style scoped>

</style>