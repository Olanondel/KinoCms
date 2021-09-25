<template>
  <section class="content-wrapper pt-5 pb-5">
    <div class="container">
      <h2 class="text-center display-4">Search</h2>
      <div class="row mb-5">
        <div class="col-md-8 offset-md-2">
          <form>
            <div class="input-group">
              <input v-model="search" type="search" class="form-control form-control-lg" placeholder="Type your keywords here">
              <div class="input-group-append">
                <button @click.prevent="filter" class="btn btn-lg btn-default">
                  <i class="fa fa-search"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="row" v-if="filteredFilms.length">
        <div
          v-for="film in filteredFilms"
          :key="film.id"
          class="film col-8 m-auto mb-5"
        >
          <div class="image-wrapper">
            <router-link :to="{ name: 'filmInfo', params: { id: film.id }, query: { from: film.from } }">
              <img :src="film.mainImage" alt="" class="img-fluid img-thumbnail film-image">
            </router-link>
          </div>
          <div class="info">
            <h2 class="text-left">
              <router-link :to="{ name: 'filmInfo', params: { id: film.id }, query: { from: film.from } }">
                {{film.name}}
              </router-link>
            </h2>

            <div>{{film.description}}</div>
          </div>
        </div>
      </div>

      <div v-else class="row">
        <h1 class="text-center m-auto">Результатов нет, попробуйте изменить запрос!</h1>
      </div>
    </div>
  </section>
</template>

<script>
import server from '../requests/affiche&soon/requests'
import {mapGetters} from "vuex";

export default {
  name: "Search",
  data() {
    return {
      films: [],
      filteredFilms: [],
      search: this.$route.query.search,
    }
  },
  methods: {
    async getFilms() {
      this.films = [...await server.getFilms(this.currentLang), ...await server.getFutureFilms(this.currentLang)]
    },
    filter() {
      let arr = [...this.films]

      this.filteredFilms = []

      this.filteredFilms = arr.filter(el => {
        return el.name.trim().toLowerCase().includes(this.search.trim().toLowerCase())
      })
    }
  },
  watch: {
    '$route.query.search'() {
      this.search = this.$route.query.search
      this.filter()
    }
  },
  computed: mapGetters(['currentLang']),
  async mounted() {
   await this.getFilms()
    this.filter()
  }
}
</script>

<style scoped>
.film {
  display: flex;
  max-height: 300px;
  overflow: hidden;
  margin-bottom: 65px !important;
}

.image-wrapper {
  flex: 0 0 30%;
  margin-right: 25px;
}

.info {

}
</style>