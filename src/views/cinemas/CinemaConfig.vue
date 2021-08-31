<template>
  <div>
    <router-view

        :cinema="cinema"
        :cinemaLang="cinemaLang"
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
        @url="editSeoUrl"
        @title="editSeoTitle"
        @keywords="editSeoKeywords"
        @description="editSeoDescription"

        :hallLang="hallLang"
        :halls="halls"
        :hallsCurrentLang="hallsCurrentLang"
        @saveHall="saveHall"
        @getLang="getHallLang"
    />
  </div>
</template>

<script>
import db from '@/firebase/firebaseInit'
import firebase from "firebase";
import {mapGetters} from 'vuex'

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
    editSeoUrl(url) {
      this.cinema.seo.url = url
    },
    editSeoTitle(title) {
      this.cinema.seo.title = title
    },
    editSeoKeywords(keywords) {
      this.cinema.seo.keywords = keywords
    },
    editSeoDescription(description) {
      this.cinema.seo.description = description
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
    removeHall(index) {
      if (this.halls[index].id) {
        this.hallsNeedRemove.push(this.halls[index].id)
      }

      this.halls.splice(index, 1)
    },


    async getData() {
      this.isNew()

      await this.getCinemas()
      await this.getHalls()

      this.cinema.isInit = true
    },
    async getCinemas() {
      let ref = db.collection('Cinemas').doc('data').collection('editPage').doc(this.currentLang).collection(this.currentLang).doc(this.getId())

      let res = await ref.get()
      let cinemas = res.data()

      if (cinemas) {
        for (let [key, value] of Object.entries(cinemas)) {
          this.cinema[key] = value
        }
      } else {
        this.cinema = {
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
          id: this.id,

          currentLang: '',
          isInit: false,
          isFetching: false,
        }
      }
    },
    async getHalls() {
      let ref = db.collection('Cinemas').doc('data').collection('halls').doc(this.getId()).collection(this.currentLang)

      let res = await ref.get()
      let halls = res.docs

      this.halls = []

      if (halls && halls.length) {
        this.halls = halls.map(el => {
          return {...el.data(), id: el.id}
        })
      }
    },
    isNew() {
      if (this.$route.params.id === 'addCinema') {
        this.cinema.isInit = true
        return
      }
    },
    async getCinemaLang() {
      let ref = db.collection('Language').doc('Cinema')
          .collection('editPage').doc(this.currentLang)

      let doc = await ref.get()

      this.cinemaLang = doc.data()
    },
    async uploadLogotypeImage(id) {
      if (this.cinema.logotypeImageFile) {
        let storageRef = firebase.storage().ref()
        let imageRef = storageRef.child(`Cinemas/Cinemas/${id}/${this.currentLang}/Logotype.jpg`);

        await imageRef.put(this.cinema.logotypeImageFile)
        this.cinema.logotypeImage = await imageRef.getDownloadURL()

        this.cinema.logotypeImageFile = null
      }
    },
    async uploadTopBannerImage(id) {
      if (this.cinema.topBannerImageFile) {
        let storageRef = firebase.storage().ref()
        let imageRef = storageRef.child(`Cinemas/Cinemas/${id}/${this.currentLang}/TopBanner.jpg`);

        await imageRef.put(this.cinema.topBannerImageFile)
        this.cinema.topBannerImage = await imageRef.getDownloadURL()

        this.cinema.topBannerImageFile = null
      }
    },
    async uploadImages(id) {
      let storageRef = firebase.storage().ref()

      if (this.cinema.imagesFiles.length) {

        await Promise.all([this.cinema.imagesFiles.map(async el => {
          let imageRef = storageRef.child(`Cinemas/Cinemas/${id}/${this.currentLang}/RowImages/image-${el.index}.jpg`)

          await imageRef.put(el.file)
          this.cinema.images.splice(el.index, 1, await imageRef.getDownloadURL())
        })])


        this.cinema.imagesFiles = []
      }
    },
    saveToDatabase(id) {

      let editPage = db.collection('Cinemas').doc('data')
          .collection('editPage').doc(this.currentLang).collection(this.currentLang)

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
      let id = this.id || this.getId()

      if (id !== 'id') {
        this.cinema.isFetching = true
        await this.saveHalls(id)

        await this.facadeUploadImages(id)
        await this.saveToDatabase(id)

        this.cinema.isFetching = false

        this.$router.push({name: 'cinemas'})
      }
    },
    async getHallLang() {
      if (!this.hallsCurrentLang) {
        this.hallsCurrentLang = navigator.language || navigator.userLanguage
      }

      let ref = db.collection('Language').doc('Cinema')
          .collection('hallEdit').doc(this.currentLang)

      let doc = await ref.get()

      this.hallLang = doc.data()

    },
    async uploadHallImages(hall, index) {
      let globIndex = index
      let storageRef = firebase.storage().ref()

      if (hall.imagesFiles && hall.imagesFiles.length) {

        await Promise.all(hall.imagesFiles.map(async el => {
          let imageRef = storageRef.child(`Cinemas/Halls/${this.getId()}/${this.currentLang}/${hall.id}/RowImages/image-${el.index}.jpg`);

          await imageRef.put(el.file)
          this.halls[globIndex].images.splice(el.index, 1, await imageRef.getDownloadURL())
        }))

        this.cinema.imagesFiles = []
      }
    },
    async uploadSchemeHallImage(hall, index) {
      console.log(hall.id)
      if (hall.hallSchemeImageFile) {
        let storageRef = firebase.storage().ref()
        let imageRef = storageRef.child(`Cinemas/Halls/${this.getId()}/${this.currentLang}/${hall.id}/schemeImage.jpg`);

        await imageRef.put(hall.hallSchemeImageFile)
        this.halls[index].hallSchemeImage = await imageRef.getDownloadURL()

        this.halls[index].hallSchemeImageFile = null
      }
    }
    ,
    async uploadTopBannerHallImage(hall, index) {
      if (hall.topBannerImageFile) {
        let storageRef = firebase.storage().ref()
        let imageRef = storageRef.child(`Cinemas/Halls/${this.getId()}/${this.currentLang}/${hall.id}/topBanner.jpg`);

        await imageRef.put(hall.topBannerImageFile)
        this.halls[index].topBannerImage = await imageRef.getDownloadURL()

        this.halls[index].topBannerImageFile = null
      }
    }
    ,
    async facadeUploadHallFiles(hall, index) {
      await Promise.all([
        await this.uploadSchemeHallImage(hall, index),
        await this.uploadTopBannerHallImage(hall, index),
        await this.uploadHallImages(hall, index)
      ])
    }
    ,
    async deleteHallFiles(id) {
      let storage = firebase.storage();

      console.log(id)

      let schemeImage = storage.ref(`Cinemas/Halls/${id}/${this.currentLang}/schemeImage.jpg`)
      let topBannerImage = storage.ref(`Cinemas/Halls/${id}/${this.currentLang}/topBanner.jpg`)

      await schemeImage.delete()
      await topBannerImage.delete()
    },
    async deleteHalls() {
      if (this.hallsNeedRemove && this.hallsNeedRemove.length) {
        for await (let id of this.hallsNeedRemove) {
          let ref = db.collection('Cinemas').doc('data').collection('halls').doc(this.getId()).collection(this.currentLang).doc(id)

          await Promise.all([this.deleteHallFiles(id), ref.delete()])
        }
      }

      this.hallsNeedRemove = []
    }
    ,
    async saveHallsToDatabase(hall, link) {

      await link.doc(hall.id).set({
        hallNumber: hall.hallNumber,
        description: hall.description,
        hallSchemeImage: hall.hallSchemeImage,
        topBannerImage: hall.topBannerImage,
        images: hall.images,
        seo: hall.seo,
        isInit: true,
        id: hall.id,
        date: hall.date,
        isFetching: false
      })
    }
    ,
    async saveHalls(id) {
      await this.deleteHalls(id)

      let halls = db.collection('Cinemas').doc('data')
          .collection('halls').doc(id).collection(this.currentLang)

      for await (let [index, value] of this.halls.entries()) {
        if (!value.id) {
          value.id = halls.doc().id
        }

        await this.facadeUploadHallFiles(value, index)
        await this.saveHallsToDatabase(value, halls)
      }
    }
    ,
    async facadeUploadImages(id) {
      await Promise.all([
        this.uploadImages(id),
        this.uploadLogotypeImage(id),
        this.uploadTopBannerImage(id)])
    }
    ,
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
    }
  }
  ,
  computed: {
    ...mapGetters(['currentLang'])
  },
  watch: {
    currentLang() {
      this.getData()
      this.getCinemaLang()
    }
  },
  async mounted() {
    await this.getData()
    await this.getCinemaLang()
  }
}
</script>

<style scoped>

</style>