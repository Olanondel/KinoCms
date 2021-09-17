<template>
  <div class="content-wrapper">

    <PreloaderColor v-if="loading"/>

    <template v-else>

      <div>
        <img class="img-fluid top-banner" :src="require('@/assets/image/city.jpg')" alt="">
      </div>

      <div class="container mb-3 mt-5">
        <div class="row mb-5">
          <h2 class="font-weight-bold mb-3 text-center w-100">Рекламодателям</h2>

          <p class="text-center">
            {{advertising.description}}
          </p>
        </div>

        <div class="row mb-5">

          <p class="text-center">
            Взаимоотношения на рекламном рынке обычно начинаются по инициативе рекламодателя. Этот субъект рынка является отправной точкой всего процесса, называемого рекламной деятельностью. Именно рекламодатель определяет ориентиры для создания рекламы и принимает решения о том, что будет рекламироваться, для кого реклама будет предназначена, какие средства лучше выбрать для распространения рекламной информации, а также продолжительность рекламы и размер рекламного бюджета. В роли рекламодателя может выступать любое физическое или юридическое лицо, являющееся источником рекламной информации для производства, размещения и последующего распространения рекламы, и оплачивающие рекламу в соответствии со сделанным заказом.
          </p>
        </div>

        <div class="row mb-5">
          <div class="col-12">
            <CarouselForImageArray
              v-if="isImg"
              number="5"
              :speed="3"
              :slides="img"
            />

            <img class="img-fluid img-thumbnail" src="@/assets/image/cinema-banner.jpg" v-else alt="">
          </div>
        </div>


      </div>

    </template>

  </div>
</template>

<script>
import PreloaderColor from "../../components/site/preloader/Preloader-color";

import server from '../../requests/admin/requests'
import {mapGetters} from "vuex";
import CarouselForImageArray from "../../components/site/CarouselForImageArray";

export default {
  name: "siteAboutCinema",
  components: {CarouselForImageArray, PreloaderColor},
  data() {
    return {
      loading: true,
      advertising: null
    }
  },
  methods: {
    async getAdvertisingData() {
      this.advertising = await server.getCurrentData('advertising', 'Pages', this.currentLang)

      this.loading = false
    }
  },
  computed: {
    ...mapGetters(['currentLang']),
    img() {
      return this.advertising.images.filter(el => el.length)
    },
    isImg() {
      return this.advertising.images.some(el => el.length)
    }
  },
  mounted() {
    this.getAdvertisingData()
  }
}
</script>

<style scoped>
.top-banner {
  width: 100%;
  object-fit: cover;
  max-height: 560px;
}

.about-image {
  max-height: 460px;
  width: 100%;
  object-fit: cover;
}
</style>