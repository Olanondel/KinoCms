<template>
    <Preloader v-if="!isInit" />
  <div v-else class="cinemas">
    <h2 class="title">Список Кинотеатров</h2>
    <div class="cinemas-list">

      <Cinema
          v-for="(cinema, index) in reverseCinemas"
          :key="cinema.id"
          @removeCinema="removeCinema"
          :index="index"
          :id="cinema.id"
          :logotype="cinema.logotypeImage"
          :title="cinema.title"
      />

      <div class="cinema">
        <router-link :to="{name: 'cinemaEdit', params: { id: 'addCinema' }}">
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
import Cinema from "../../components/cinemas/Cinema";
import db from '@/firebase/firebaseInit.js';
import Preloader from "../../components/general/Preloader";
export default {
  components:  {Preloader, Cinema},
  name: "cinemas",
  data() {
    return {
      cinemas: [],
      isInit: false
    }
  },
  computed: {
    reverseCinemas() {
      let arr = this.cinemas
      return arr.reverse()
    }
  },
  methods: {
    removeCinema(index, id) {
      let ref = db.collection('Cinemas').doc('data').collection('editPage').doc(id)

      ref.delete().then(() => {
        this.cinemas.splice(index, 1)
      })
    },
    getData() {
      let ref = db.collection('Cinemas')
          .doc('data')
          .collection('editPage')

      ref.get()
        .then(doc => {
          let data = doc.docs.map(el => {
            return {...el.data(), id: el.id}
          })

          this.cinemas = data
          this.isInit = true
        })

    }
  },
  created() {
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