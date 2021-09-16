<template>
  <div class="content-wrapper" :style="{ background: 'url(' + bg + ')' }">
    <div class="container pt-4 pb-4">

      <PreloaderFf v-if="loading" />

      <template v-else>
        <Carousel number="1" :slides="topSliderSlides" :speed="topSliderSpeed" />

        <section class="current-wrapper film-wrapper mb-5">
          <h2 class="mb-3">Смотрите сегодня, <span class="date-text">12 сентября</span></h2>

          <div class="current-films card-deck">
            <FilmCard
              v-for="current in currentFilms"
              :key="current.id"

              :image="current.mainImage"
              :title="current.name"
              :id="current.id"
              from="currentFilms"
            />
          </div>
        </section>

        <section class="current-wrapper film-wrapper mb-5">
          <h2 class="mb-3">Смотрите скоро</h2>

          <div class="current-films card-deck">
            <FilmCard
              v-for="future in futureFilms"
              :key="future.id"

              :image="future.mainImage"
              :title="future.name"
              :id="future.id"
              from="futureFilms"
            />
          </div>
        </section>

        <section class="current-wrapper film-wrapper mb-5" v-if="topSliderSlides.length">
          <h2 class="mb-3">Новости и Акции</h2>

          <Carousel number="2" :speed="newsSliderSpeed" :slides="newsSliderSlides" />
        </section>
      </template>

    </div>
  </div>
</template>

<script>
import server from '../requests/site'
import {mapGetters} from "vuex";
import FilmCard from "../components/site/affiche&soon/FilmCard";
import Carousel from "../components/site/main/Carousel";
import PreloaderFf from "../components/site/preloader/Preloader-ff";

export default {
  name: 'Main',
  components: {PreloaderFf, Carousel, FilmCard},
  data: () => ({
    bg: '',
    topSliderSlides: [],
    topSliderSpeed: 0,
    currentFilms: [],
    futureFilms: [],
    newsSliderSlides: [],
    newsSliderSpeed: 2,
    loading: true,
    swiper: null
  }),
  methods: {
    async getData() {
      let [bg, topSlider] = await server.getBannersData(this.currentLang)
      let [current, future] = await server.getFilmsData(this.currentLang)
      let newsData = await server.getNewsSliderData(this.currentLang)

      this.bg = bg.photoOnBackground
      this.topSliderSlides = topSlider.slidesConfig
      this.topSliderSpeed = topSlider.speed * 1000

      this.currentFilms = current || []
      this.futureFilms = future || []

      this.newsSliderSlides = newsData.slidesConfig
      this.newsSliderSpeed = newsData.speed * 1000

      this.loading = false
    }
  },
  computed: mapGetters(['currentLang']),
  async mounted() {
    await this.getData()
  },
}
</script>

<style scoped>
.container {
  background-color: #fff;
}

.carousel-item {
  max-height: 500px;
  height: 500px;
  object-fit: cover;
}

.date-text {
  font-weight: normal;
}
</style>