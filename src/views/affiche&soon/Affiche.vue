<template>
  <div ref="affiche" class="affiche">

    <div class="film-gallery">
      <FilmCard
        v-for="film in films"
        :key="film.id"

        :image="film.mainImage"
        :title="film.name"
      />
    </div>

  </div>
</template>

<script>
import server from '../requests/affiche&soon/requests'

import FilmCard from "../components/site/affiche&soon/FilmCard";
import {mapGetters} from "vuex";
export default {
  name: "Affiche",
  components: {FilmCard},
  data() {
    return {
      films: []
    }
  },
  methods: {
    async getData() {
      let films = await server.getFilms(this.currentLang)

      this.films = films ? films : []
    }
  },
  computed: mapGetters(['currentLang']),
  watch: {
    currentLang() {
      this.getData()
    }
  },
  mounted() {
    this.$refs.affiche.classList.add('dark-mode')

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
}

.film-gallery {
  margin: 0 -15px;
}

</style>