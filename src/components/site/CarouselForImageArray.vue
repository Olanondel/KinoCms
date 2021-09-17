<template>
  <section class="top-slider mb-5" v-if="slides.length">

    <!-- Slider main container -->
    <div :class="'swiper' + number" class="swiper">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div
          v-for="(slide, index) in slides"
          :key="index"
          class="swiper-slide"
        >
          <img class="img-fluid" :src="slide" alt="">
        </div>
      </div>
      <!-- If we need pagination -->
      <div class="swiper-pagination"></div>

      <!-- If we need navigation buttons -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      <!-- If we need scrollbar -->
      <div class="swiper-scrollbar"></div>
    </div>

  </section>
</template>

<script>
import Swiper from "swiper/swiper-bundle.min";
import 'swiper/swiper.min.css'

export default {
  name: "CarouselForImageArray",
  props: {
    slides: {
      type: Array,
    },
    number: Number,
    speed: Number
  },
  data: () => ({
    swiper: null
  }),
  methods: {
    init() {
      let swiperClass = '.swiper' + this.number

      this.swiper = new Swiper(swiperClass, {
        loop: true,
        autoplay: {
          delay: this.speed * 1000
        }
      })
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.swiper.destroy()
  }
}
</script>

<style scoped>
.swiper-slide {
  max-height: 400px;
  width: 100%;
  height: 500px;
  object-fit: cover;
}

.swiper-slide img {
  object-fit: cover;
  width: 100%;
}
</style>