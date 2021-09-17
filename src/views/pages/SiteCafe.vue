<template>
  <div class="content-wrapper">

    <PreloaderColor v-if="loading" />

    <template v-else>

      <div class="mb-5">
        <img class="img-fluid top-banner" :src="require('@/assets/image/cafe.jpg')" alt="">
      </div>

      <div class="container">
        <div class="row mb-5">
          <h2 class="font-weight-bold mb-3 text-center w-100">Кафе - Бар</h2>

          <p class="text-center">
            {{cafe.description}}
          </p>
        </div>

        <div class="row mb-5" v-if="cafe.mainImage.length">
          <h2 class="font-weight-bold mb-3 text-center w-100">Меню</h2>

          <div class="col-8 m-auto">
            <img class="img-thumbnail img-fluid menu-image" :src="cafe.mainImage" alt="">
          </div>
        </div>
      </div>

    </template>
  </div>
</template>

<script>
import PreloaderColor from "../../components/site/preloader/Preloader-color";
import server from "../../requests/admin/requests";
import {mapGetters} from "vuex";
export default {
  name: "SiteCaffe",
  components: {PreloaderColor},
  data() {
    return {
      loading: true,
      cafe: null
    }
  },
  methods: {
    async getCafeData() {
      this.cafe = await server.getCurrentData('cafe', 'Pages', this.currentLang)

      this.loading = false
    }
  },
  computed: {
    ...mapGetters(['currentLang'])
  },
  mounted() {
    this.getCafeData()
  }
}
</script>

<style scoped>

</style>