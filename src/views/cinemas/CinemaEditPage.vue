<template>
  <Preloader v-if="!isInit"/>
  <div v-else class="cinema-edit">

    <Language
        @changeLang="changeLang"
        :currentLang="currentLang"
    />

    <InputWithText
        :text="lang.title"
        :value="title"
        @change="changeTitle"
    />

    <TextAreaWithText
        :text="lang.description"
        :value="description"
        @change="changeDescription"
    />

    <TextAreaWithText
        :text="lang.conditions"
        :value="conditions"
        @change="changeConditions"
    />

    <ImageWithTwoButton
        :text="lang.logotype"
        @removeImage="removeLogotypeImage"
        @changeImage="changeLogotypeImage"
        :image="logotypeImage"
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

    <ImagesRow
        @change="changeImages"
        :data="images"
        :text="lang.imageRowSizeText"
        :btnText="lang.imageBtnRowText"
    />

    <HallList
        :id="this.$route.params.id"
    />

    <Seo
        @change="changeSeo"
        :value="seo"
        :text="lang.seo"
    />

    <SaveButton
        :text="lang.saveButtonText"
        @saveEvent="save"
        :isFetching="isFetching"
    />


  </div>
</template>

<script>
import TextAreaWithText from "../../components/general/TextAreaWithText";
import ImageWithTwoButton from "../../components/general/ImageWithTwoButton";
import InputWithText from "../../components/general/InputWithText";
import Seo from "../../components/general/Seo";
import ImagesRow from "../../components/general/imagesRow/ImagesRow";
import Language from "../../components/general/Language";
import SaveButton from "../../components/general/SaveButton";
import HallList from "../../components/films/halls/HallList";
import db from '../../firebase/firebaseInit'
import firebase from "firebase";
import Preloader from "../../components/general/Preloader";

export default {
  name: "CinemaEditPage.vue",
  components: {
    Preloader,
    HallList, SaveButton, Language, Seo, InputWithText, ImageWithTwoButton, TextAreaWithText, ImagesRow
  },
  data() {
    return {
      title: '',
      description: '',
      conditions: '',
      logotype: '',
      logotypeImage: '',
      logotypeImageFile: null,
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

      lang: {
        addText: "Загрузить",
        conditions: "Условия",
        description: "Описание",
        imageBtnRowText: "Добавить",
        imageRowSizeText: "Размер: 1000х190",
        logotype: "Логотип",
        removeText: "Удалить",
        saveButtonText: "Сохранить",
        title: "Название кинотеатра",
        topBanner: "Фото верхнего баннера",
      }
    }
  },
  methods: {
    changeTitle(title) {
      this.title = title
    },
    changeDescription(description) {
      this.description = description
    },
    changeConditions(conditions) {
      this.conditions = conditions
    },
    removeLogotypeImage() {
      this.logotypeImage = ''
    },
    changeLogotypeImage(file) {
      this.logotypeImageFile = file
      let reader = new FileReader()

      reader.onload = () => {
        this.logotypeImage = reader.result
      }

      reader.readAsDataURL(file)
    },
    uploadLogotypeImage() {
      if (this.logotypeImageFile) {
        let storageRef = firebase.storage().ref()
        let imageRef = storageRef.child(`Cinemas/Logotype.jpg`);

        imageRef
            .put(this.logotypeImageFile)
            .then(() => imageRef.getDownloadURL())
            .then(link => this.logotypeImage = link)

        this.logotypeImageFile = null
      }
    },
    removeTopBannerImage() {
      this.topBannerImage = ''
    },
    changeTopBannerImage(file) {
      this.topBannerImageFile = file
      let reader = new FileReader()

      reader.onload = () => {
        this.topBannerImage = reader.result
      }

      reader.readAsDataURL(file)
    },
    uploadTopBannerImage() {
      if (this.topBannerImageFile) {
        let storageRef = firebase.storage().ref()
        let imageRef = storageRef.child(`Cinemas/TopBanner.jpg`);

        imageRef
            .put(this.topBannerImageFile)
            .then(() => imageRef.getDownloadURL())
            .then(link => this.topBannerImage = link)

        this.topBannerImageFile = null
      }
    },
    changeImages(file, index) {
      this.imagesFiles.push({index, file})
      let reader = new FileReader()

      reader.onload = () => {
        this.images.splice(index, 1, reader.result)
      }

      reader.readAsDataURL(file)
    },
    uploadImages() {
      let storageRef = firebase.storage().ref()

      if (this.imagesFiles.length) {
        this.imagesFiles.forEach((el) => {
          let imageRef = storageRef.child(`Cinemas/RowImages/image-${el.index}.jpg`);

          imageRef
              .put(el.file)
              .then(() => imageRef.getDownloadURL())
              .then(link => this.images.splice(el.index, 1, link))
        })

        this.imagesFiles = []
      }
    },
    changeSeo({url, title, keywords, description}) {
      this.seo.url = url
      this.seo.title = title
      this.seo.keywords = keywords
      this.seo.description = description
    },
    getLang() {
      if (!this.currentLang) {
        this.currentLang = navigator.language || navigator.userLanguage
      }

      let ref = db.collection('Language').doc('Cinema')
          .collection('editPage').doc(this.currentLang)

      ref.get()
          .then(doc => {
            this.lang = doc.data()
          })
    },
    changeLang(lang) {
      this.currentLang = lang
      this.getLang()
    },
    saveToDatabase() {
      let editPage = db.collection('Cinemas').doc('data')
          .collection('editPage')

      let id

      if (this.$route.params.id === 'addCinema') {
        id = editPage.doc().id
      } else {
        id = this.$route.params.id
      }

      editPage.doc(id).set({
        title: this.title,
        description: this.description,
        conditions: this.conditions,
        logotype: this.logotype,
        logotypeImage: this.logotypeImage,
        topBannerImage: this.topBannerImage,
        images: this.images,
        currentLang: this.currentLang,
        seo: this.seo,
      })


    },
    facadeUploadImages() {
      this.uploadImages()
      this.uploadLogotypeImage()
      this.uploadTopBannerImage()
    },
    async save() {
      this.isFetching = true
      await this.facadeUploadImages()

      await this.saveToDatabase()
      this.isFetching = false
      await this.$router.push({name: 'cinemas'})
    },
    getData() {
      this.getLang()

      if (this.$route.params.id !== 'addCinema' && this.$route.params.id) {
        let ref = db.collection('Cinemas').doc('data')
            .collection('editPage').doc(this.$route.params.id)

        ref.get()
            .then(doc => {
              let data = doc.data()

              if (data) {
                for (let key in data) {
                  this[key] = data[key]
                }
              }

              this.isInit = true
            })
      } else {
        this.isInit = true
      }
    }
  },
  created() {
    this.getData()
  }
}
</script>

<style scoped>
</style>