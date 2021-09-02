<template>
  <Preloader v-if="!isInit"/>
  <div v-else class="cinemas">
    <h2 class="title">Список Кинотеатров</h2>
    <div class="cinemas-list">

      <Cinema
          v-for="(cinema, index) in cinemas"
          :key="cinema.id"
          @removeCinema="removeCinema"
          :index="index"
          :id="cinema.id"
          :logotype="cinema.logotypeImage"
          :title="cinema.title"
          :isFetching="cinema.isFetching"
      />

      <div class="cinema">
        <router-link to="/cinemaConfig/addCinema">
          <div class="add">
            <a class="f">
              <i class="icon fa fa-plus"></i>
            </a>
          </div>
          <div class="cinema__text">Добавить</div>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
import Cinema from "../../../components/admin/cinemas/Cinema";
import db from '@/firebase/firebaseInit.js';
import Preloader from "../../../components/admin/general/Preloader";
import {mapGetters} from 'vuex'
import firebase from "firebase";

export default {
  components: {Preloader, Cinema},
  name: "cinemas",
  data() {
    return {
      cinemas: [],
      hallsNeedRemove: [],
      imageNeedRemoveList: {},
      isInit: false,
    }
  },
  computed: mapGetters(['currentLang']),
  methods: {
    async removeCinema(index, id) {
      this.cinemas[index].isFetching = true
      let ref = db.collection('Cinemas').doc('data').collection('editPage').doc(this.currentLang).collection(this.currentLang).doc(id)

      await this.getHalls(id)
      await this.removeHalls(id)

      await this.removeCinemaImages(id, index)

      await ref.delete()
      this.cinemas.splice(index, 1)
    },
    async removeCinemaImages(id, index) {
      let ref = await firebase.storage().ref()

      await Promise.all([this.removeLogotype(ref, id, index), this.removeRowImages(ref, id, index), this.removeTopBanner(ref, id, index)])
    },
    async getHalls(id) {
      let ref = db.collection('Cinemas').doc('data').collection('halls').doc(id).collection(this.currentLang)
      let res = await ref.get()
      let result = res.docs

      if (result) {
        result.forEach(el => {
          let hall = el.data()

          this.imageNeedRemoveList[hall.id] = hall.images
          this.hallsNeedRemove.push(hall.id)
        })
      }

    },
    async removeHalls(id) {
      await Promise.all(this.hallsNeedRemove.map(async elId => {
        let ref = db.collection('Cinemas').doc('data').collection('halls').doc(id).collection(this.currentLang).doc(elId)

        await Promise.all([this.removeHallsFiles(id, elId), this.removeHallRowImages(id, elId), ref.delete()])
      }))
    },
    async removeHallsFiles(id, hallId) {
      let storageRef = firebase.storage().ref()
      let schemeImage = storageRef.child(`Cinemas/Halls/${id}/${this.currentLang}/${hallId}/schemeImage.jpg`)
      let topBannerImage = storageRef.child(`Cinemas/Halls/${id}/${this.currentLang}/${hallId}/topBanner.jpg`)

      await Promise.all([schemeImage.delete(), topBannerImage.delete()])
    },
    async removeHallRowImages(id, hallId) {
      let storageRef = firebase.storage()
      let ref = storageRef.ref()

      let images = this.imageNeedRemoveList[hallId]

      if (images && images.length) {
        await Promise.all(images.map(async (el, index) => {
          if (el.length) {
            let imageRef = ref.child(`Cinemas/Halls/${id}/${this.currentLang}/${hallId}/RowImages/image-${index}.jpg`)

            await imageRef.delete()
          }
        }))
      }
    },
    async removeLogotype(ref, id, index) {
      if (this.cinemas[index].logotypeImage.length) {
        let logoRef = ref.child(`Cinemas/Cinemas/${id}/${this.currentLang}/Logotype.jpg`)

        await logoRef.delete()
      }
    },
    async removeTopBanner(ref, id, index) {
      if (this.cinemas[index].topBannerImage.length) {
        let logoRef = ref.child(`Cinemas/Cinemas/${id}/${this.currentLang}/TopBanner.jpg`)

        await logoRef.delete()
      }
    },
    async removeRowImages(ref, id, index) {
      await Promise.all(this.cinemas[index].images.map(async (refString, index) => {
        if (refString.length) {
          let imageRef = ref.child(`Cinemas/Cinemas/${id}/${this.currentLang}/RowImages/image-${index}.jpg`)

          await imageRef.delete()
        }
      }))
    },
    async getData() {
      let ref = db.collection('Cinemas')
          .doc('data')
          .collection('editPage').doc(this.currentLang).collection(this.currentLang)

      this.cinemas = []

      let doc = await ref.get()

      if (doc.docs.length) {
        let data = doc.docs.map(el => {
          return {...el.data(), id: el.id}
        })

        this.cinemas = data
      }

      this.isInit = true

    }
  },
  watch: {
    currentLang() {
      this.getData()
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style scoped>
.cinemas {
  max-width: 1100px;
  margin: 0 auto;
}

.cinemas-list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
}

.cinema {
  width: 25%;
  margin-bottom: 30px;
}

.cinema__text {
  text-align: center;
  height: 10%;
}

.add {
  width: 100%;
  height: 180px;
  min-height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;
}

.icon {
  font-size: 150px;
}
</style>