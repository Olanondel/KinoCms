<template>
  <Preloader v-if="!init"/>
  <section class="films" v-else>
    <div class="currentListWrapper">
      <h2 class="title">Список фильмов текущих</h2>
      <section class="currentList">
        <FilmCard
            v-for="(film, index) in currentFilms"
            :key="film.title"
            :index="index"
            :title="currentFilms[index].name"
            :image="currentFilms[index].mainImage"
            :id="currentFilms[index].id"
            from="currentFilms"
        />
      </section>
      <div class="add-film">
        <router-link to="films/addToCurrent" class="btn btn-primary btn-lg">Добавить фильм</router-link>
      </div>
    </div>

    <div class="futureListWrapper">
      <h2 class="title">Список фильмов которые покажут скоро</h2>
      <section class="futureList">
        <FilmCard
            v-for="(film, index) in futureFilms"
            :key="film.title"
            :index="index"
            :title="futureFilms[index].name"
            :image="futureFilms[index].mainImage"
            :id="futureFilms[index].id"
            from="futureFilms"
        />
      </section>
      <div class="add-film">
        <router-link to="films/addToFuture" class="btn btn-primary btn-lg">Добавить фильм</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import db from '../../../firebase/firebaseInit'
import FilmCard from "../../../components/admin/films/FilmCard.vue";
import Preloader from '../../../components/admin/general/Preloader.vue';
import {mapGetters} from 'vuex'

export default {
  components: {FilmCard, Preloader,},
  name: "films",
  data() {
    return {
      currentFilms: [],
      futureFilms: [],
      init: false
    };
  },
  methods: {
    async getCurrentFilms() {
      let data = await db.collection('Films').doc('currentFilms')
          .collection(this.currentLang).get()

      this.currentFilms = []

      if (data.docs.length) {
        data.docs.forEach(el => this.currentFilms.push(el.data()))
      }
    },
    async getFutureFilms() {
      let data = await db.collection('Films').doc('futureFilms')
          .collection(this.currentLang).get()

      this.futureFilms = []

      if (data.docs.length) {
        data.docs.forEach(el => this.futureFilms.push(el.data()))
      }
    },
    async initialize() {
      await this.getCurrentFilms()
      await this.getFutureFilms()
      this.init = true
    }
  },
  computed: mapGetters(['currentLang']),
  watch: {
    async currentLang() {
      await this.initialize()
    }
  },
  created() {
    this.initialize()
  }
};
</script>

<style scoped>
.films {
  max-width: 960px;
  margin: 0 auto;
}

.currentList,
.futureList {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
}

.add-film {
  text-align: center;
  margin-bottom: 80px;
}
</style>