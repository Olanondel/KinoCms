<template>
  <div class="content-wrapper">
    <div class="container pt-4 pb-4">

      <PreloaderColor v-if="loading" />

      <section class="affiche card-deck" v-else>
        <FilmCard
          v-for="film in films"
          :key="film.id"

          :image="film.mainImage"
          :id="film.id"
          :from="$route.meta.from"
          :title="film.name"
          header="Сейчас в кино"
        />
      </section>
    </div>
  </div>
</template>

<script>
import server from '../../requests/affiche&soon/requests'
import {mapGetters} from "vuex";
import FilmCard from "../../components/site/affiche&soon/FilmCard";
import PreloaderColor from "../../components/site/preloader/Preloader-color";

export default {
  name: "Affiche",
  components: {PreloaderColor, FilmCard},
  data() {
    return {
      films: [],
      loading: true
    }
  },
  methods: {
    async getData() {
      let films = await server.getFilms(this.currentLang)

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
.affiche {
  display: flex;
  flex-wrap: wrap;
}
</style>