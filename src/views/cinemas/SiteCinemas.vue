<template>
  <div class="content-wrapper">

    <img class="img-fluid top-image" src="@/assets/image/cinema-banner.jpg" alt="">

    <div class="container">
      <h1 class="text-center mt-3 mb-3">Наши Кинотеатры</h1>

      <div class="card-deck flex-wrap">
        <div
          class="col-3 mb-3"
          v-for="item in cinemas"
          :key="item.id">
          <div class="card">
            <img class="card-img-top" :src="item.logotypeImage" alt="Card image cap">
            <div class="card-body">
              <router-link :to="{ name: 'siteCinema', params: { id: item.id } }">
                <h3 class="card-title font-weight-bold">
                  {{ item.title }}
                </h3>
              </router-link>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {getCinemas} from '../../requests/site'
import {mapGetters} from "vuex";

export default {
  name: "SiteCinemas",
  data() {
    return {
      cinemas: []
    }
  },
  methods: {
    async getCinemas() {
      let docs = await getCinemas(this.currentLang)

      if (docs && docs.length) {
        docs.forEach(doc => {
          this.cinemas.push(doc.data())
        })
      }
    }
  },
  computed: mapGetters(['currentLang']),
  mounted() {
    this.getCinemas()
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