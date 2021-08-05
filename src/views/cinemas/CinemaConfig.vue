<template>
  <div>
    <router-view

        :cinema="cinema"
        :cinemaLang="cinemaLang"
        @changeCinemaLang="changeCinemaLang"
        @changeLogotypeImage="changeLogotypeImage"
        @changeTopBannerImage="changeTopBannerImage"
        @changeImages="changeImages"
        @uploadImages="uploadImages"
        @changeTitle="changeTitle"
        @changeCinemaSeo="changeCinemaSeo"
        @changeDescription="changeDescription"
        @changeConditions="changeConditions"
        @removeLogotypeImage="removeLogotypeImage"
        @removeTopBannerImage="removeTopBannerImage"
        @saveCinema="saveCinema"
        @removeHall="removeHall"

        :hallLang="hallLang"
        :halls="halls"
        :hallsCurrentLang="hallsCurrentLang"
        @saveHall="saveHall"
        @changeHallLang="changeHallLang"
        @getLang="getHallLang"
    />
  </div>
</template>

<script>
import db from '@/firebase/firebaseInit'
import firebase from "firebase";

export default {
  name: "editPage",
  data() {
    return {

      cinema: {
        title: '',
        description: '',
        conditions: '',
        logotypeImage: '',
        logotypeImageFile: null,
        topBannerImage: '',
        topBannerImageFile: null,
        images: ['', '', '', '', ''],
        imagesFiles: [],
        seo: {
          url: '',
          title: '',
          keywords: '',
          description: ''
        },
        id: '',

        currentLang: '',
        isInit: false,
        isFetching: false,
      },

      hallsNeedRemove: [],
      halls: [],
      hallsCurrentLang: '',

      cinemaLang: {},

      hallLang: {},
    }
  },
  methods: {
    changeCinemaLang(lang) {
      this.cinema.currentLang = lang
      this.getCinemaLang()
    },
    changeLogotypeImage(file) {
      this.cinema.logotypeImageFile = file
      let reader = new FileReader()

      reader.onload = () => {
        this.cinema.logotypeImage = reader.result
      }

      reader.readAsDataURL(file)
    },
    changeTopBannerImage(file) {
      this.cinema.topBannerImageFile = file
      let reader = new FileReader()

      reader.onload = () => {
        this.cinema.topBannerImage = reader.result
      }

      reader.readAsDataURL(file)
    },
    changeImages(file, index) {
      this.cinema.imagesFiles.push({index, file})
      let reader = new FileReader()

      reader.onload = () => {
        this.cinema.images.splice(index, 1, reader.result)
      }

      reader.readAsDataURL(file)
    },
    changeCinemaSeo(data) {
      this.cinema.seo = data
    },
    changeTitle(title) {
      this.cinema.title = title
    },
    changeDescription(description) {
      this.cinema.description = description
    },
    changeConditions(conditions) {
      this.cinema.conditions = conditions
    },
    removeLogotypeImage() {
      this.cinema.logotypeImage = ''
      this.cinema.logotypeImageFile = null
    },
    removeTopBannerImage() {
      this.cinema.topBannerImage = ''
      this.cinema.topBannerImageFile = null
    },
    saveHall(index, data) {
      if (index || index === 0) {
        this.halls.splice(index, 1, data)
      }

      if (!index && index !== 0) {
        this.halls.push(data)
      }
    },
    changeHallLang(lang) {
      this.hallsCurrentLang = lang

      this.getHallLang()
    },
    removeHall(index) {
      if (this.halls[index].id) { this.hallsNeedRemove.push(this.halls[index].id) }

      this.halls.splice(index, 1)
    },
    getData() {
      if (this.$route.params.id === 'addCinema') {
        this.cinema.isInit = true
      }

      if (this.$route.params.id !== 'addCinema') {

        let ref = db.collection('Cinemas').doc('data')

        let cinema = ref.collection('editPage').doc(this.getId())

        let cinemaHalls = ref.collection('halls').doc(this.getId()).collection('halls')


        cinema.get()
            .then(doc => {
              let data = doc.data()

              if (data) {
                for (let [key, value] of Object.entries(data)) {
                  this.cinema[key] = value
                }
              }
            })

        cinemaHalls.get()
            .then(doc => {
              let data = doc.docs.map(el => {
                return {...el.data(), id: el.id}
              })

              this.halls = data
            })

      }
    },
    getCinemaLang() {
      if (!this.cinema.currentLang) {
        this.cinema.currentLang = navigator.language || navigator.userLanguage
      }

      let ref = db.collection('Language').doc('Cinema')
          .collection('editPage').doc(this.cinema.currentLang)

      ref.get()
          .then(doc => {
            this.cinemaLang = doc.data()
          })
    },
    uploadLogotypeImage() {
      if (this.cinema.logotypeImageFile) {
        let storageRef = firebase.storage().ref()
        let imageRef = storageRef.child(`Cinemas/Logotype.jpg`);

        imageRef
            .put(this.cinema.logotypeImageFile)
            .then(() => imageRef.getDownloadURL())
            .then(link => this.cinema.logotypeImage = link)

        this.cinema.logotypeImageFile = null
      }
    },
    uploadTopBannerImage() {
      if (this.cinema.topBannerImageFile) {
        let storageRef = firebase.storage().ref()
        let imageRef = storageRef.child(`Cinemas/TopBanner.jpg`);

        imageRef
            .put(this.cinema.topBannerImageFile)
            .then(() => imageRef.getDownloadURL())
            .then(link => this.cinema.topBannerImage = link)

        this.cinema.topBannerImageFile = null
      }
    },
    uploadImages() {
      let storageRef = firebase.storage().ref()

      if (this.cinema.imagesFiles.length) {
        this.cinema.imagesFiles.forEach((el) => {
          let imageRef = storageRef.child(`Cinemas/RowImages/image-${el.index}.jpg`);

          imageRef
              .put(el.file)
              .then(() => imageRef.getDownloadURL())
              .then(link => this.cinema.images.splice(el.index, 1, link))
        })

        this.cinema.imagesFiles = []
      }
    },
    saveToDatabase() {
      let editPage = db.collection('Cinemas').doc('data')
          .collection('editPage')

      let id = this.getId()

      editPage.doc(id).set({
        title: this.cinema.title,
        description: this.cinema.description,
        conditions: this.cinema.conditions,
        logotypeImage: this.cinema.logotypeImage,
        topBannerImage: this.cinema.topBannerImage,
        images: this.cinema.images,
        seo: this.cinema.seo,
        currentLang: this.cinema.currentLang,
        isInit: true,
        id: this.cinema.id,
        isFetching: false
      })
    },
    async saveCinema() {
      this.cinema.isFetching = true
      await this.saveHalls()

      await this.facadeUploadImages()
      await this.saveToDatabase()

      this.cinema.isFetching = false
      this.$router.push({name: 'cinemas'})
    },
    getHallLang() {
      if (!this.hallsCurrentLang) {
        this.hallsCurrentLang = navigator.language || navigator.userLanguage
      }

      let ref = db.collection('Language').doc('Cinema')
          .collection('hallEdit').doc(this.hallsCurrentLang)

      ref.get()
          .then(doc => {
            this.hallLang = doc.data()
          })
    },
    uploadHallImages(hall, index) {
      let globIndex = index
      let storageRef = firebase.storage().ref()

      if (hall.imagesFiles && hall.imagesFiles.length) {

        hall.imagesFiles.forEach((el, index) => {
          let imageRef = storageRef.child(`Cinemas/Halls/${this.getId()}/RowImages/image-${index}.jpg`);

          imageRef
              .put(el.file)
              .then(() => imageRef.getDownloadURL())
              .then(link => this.halls[globIndex].images.splice(el.index, 1, link))
        })

        this.cinema.imagesFiles = []

      }
    },
    uploadSchemeHallImage(hall, index) {
      if (hall.hallSchemeImageFile) {
        let storageRef = firebase.storage().ref()
        let imageRef = storageRef.child(`Cinemas/Halls/${this.getId()}/schemeImage.jpg`);

        imageRef
            .put(hall.hallSchemeImageFile)
            .then(() => imageRef.getDownloadURL())
            .then(link => this.halls[index].hallSchemeImage = link)

        this.halls[index].hallSchemeImageFile = null
      }
    },
    uploadTopBannerHallImage(hall, index) {
      if (hall.topBannerImageFile) {
        let storageRef = firebase.storage().ref()
        let imageRef = storageRef.child(`Cinemas/Halls/${this.getId()}/topBanner.jpg`);

        imageRef
            .put(hall.topBannerImageFile)
            .then(() => imageRef.getDownloadURL())
            .then(link => this.halls[index].topBannerImage = link)

        this.halls[index].topBannerImageFile = null
      }
    },
    facadeUploadHallFiles(hall, index) {
      this.uploadSchemeHallImage(hall, index)
      this.uploadTopBannerHallImage(hall, index)
      this.uploadHallImages(hall, index)
    },
    async deleteHallFiles(id) {
      let storage = firebase.storage();

      let ref = storage.ref('Cinemas/Halls/' + id)

      await ref.delete()
    },
    async deleteHalls() {
      for await (let id of this.hallsNeedRemove) {
        let ref = db.collection('Cinemas').doc('data').collection('halls').doc(this.cinema.id).collection('halls').doc(id)

        await this.deleteHallFiles()
        ref.delete()
      }

      this.hallsNeedRemove = []
    },
    async saveHallsToDatabase(hall) {
      let id = this.getId()

      let halls = db.collection('Cinemas').doc('data')
          .collection('halls').doc(id).collection('halls')

      let hallId

      if (hall.id) {
        hallId = hall.id
      } else {
        hallId = halls.doc().id
      }

      await halls.doc(hallId).set({
        hallNumber: hall.hallNumber,
        description: hall.description,
        hallSchemeImage: hall.hallSchemeImage,
        topBannerImage: hall.topBannerImage,
        images: hall.images,
        seo: hall.seo,
        isInit: true,
        id: hallId,
        date: hall.date,
        isFetching: false
      })
    },
    async saveHalls() {
      await this.deleteHalls()

      for await (let [index, value] of this.halls.entries()) {
        await this.facadeUploadHallFiles(value, index)
        await this.saveHallsToDatabase(value)
      }
    },
    facadeUploadImages() {
      this.uploadImages()
      this.uploadLogotypeImage()
      this.uploadTopBannerImage()
    },
    getId() {
      if (this.cinema.id) {
        return this.cinema.id
      }

      if (this.$route.params.id === 'addCinema') {
        return this.cinema.id = db.collection('Cinemas').doc('data').collection('editPage').doc().id
      }

      if (this.$route.params.id !== 'addCinema') {
        return this.cinema.id = this.$route.params.id
      }
    },
  },
  mounted() {
    this.getCinemaLang()
    this.getData()
  }
}
</script>

<style scoped>

</style>