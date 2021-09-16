<template>
  <div class="content-wrapper">
    <div class="container pt-4 pb-4">

      <PreloaderColor v-if="loading" />

      <div class="soon card-deck" v-else>

        <FilmCard
          v-for="film in films"
          :key="film.id"

          :image="film.mainImage"
          :title="film.name"
          :id="film.id"
          :from="$route.meta.from"
          header="Скоро в кино"
        />

      </div>
    </div>
  </div>
</template>

<script>
import server from '../../requests/affiche&soon/requests'
import FilmCard from "../../components/site/affiche&soon/FilmCard";
import {mapGetters} from "vuex";
import PreloaderColor from "../../components/site/preloader/Preloader-color";

export default {
  name: "Soon",
  components: {PreloaderColor, FilmCard},
  data() {
    return {
      films: [],
      loading: true
    }
  },
  methods: {
    async getData() {
      let films = await server.getFutureFilms(this.currentLang)

      this.films = films ? films : []

      this.loading = false
    }
  },
  computed: mapGetters(['currentLang']),
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
.film-gallery {
  padding: 15px;
  display: flex;
  min-height: 100%;
  height: 100%;
  margin: 0 -15px;

}

</style>