<template>
  <div class="content-wrapper">

    <PreloaderColor v-if="loading" />

  <template v-else>

    <img class="img-fluid top-image" src="@/assets/image/cinema-banner.jpg" alt="">

    <div class="container">
      <h1 class="text-center mt-3 mb-3">Наши Кинотеатры</h1>

      <div class="card-deck flex-wrap">
        <div
          class="col-3 mb-3"
          v-for="item in promotions"
          :key="item.id">
          <div class="card">
            <img class="card-img-top" :src="item.mainImage" alt="Card image cap">
            <div class="card-body">
              <router-link :to="{ name: 'sitePromotion', params: { id: item.id } }">
                <h3 class="card-title font-weight-bold">
                  {{ item.title }}
                </h3>
              </router-link>
            </div>
          </div>
        </div>

      </div>
    </div>

  </template>

  </div>
</template>

<script>
import {getPromotions} from '../../requests/site'
import {mapGetters} from "vuex";
import PreloaderColor from "../../components/site/preloader/Preloader-color";

export default {
  name: "SiteCinemas",
  components: {PreloaderColor},
  data() {
    return {
      promotions: [],
      loading: true
    }
  },
  methods: {
    async getPromotions() {
      let docs = await getPromotions(this.currentLang)

      if (docs && docs.length) {
        docs.forEach(doc => {
          this.promotions.push(doc.data())
        })
      }

      this.loading = false
    }
  },
  computed: mapGetters(['currentLang']),
  mounted() {
    this.getPromotions()
  }
}
</script>

<style scoped>
.top-image {
  min-width: 100% !important;
  width: 100%;
  max-height: 560px;
  object-fit: cover;
}

.card-img-top {
  object-fit: cover !important;
}
</style>