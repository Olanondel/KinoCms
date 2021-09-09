<template>
  <div class="container-fluid">
    <div class="row">
      <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div v-for="(item, index) in slides" :key="item.id" class="carousel-item" :class="{ active: index === 0 }">
            <img class="d-block w-100" :src="item.image" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopBanner",
  props: {
    slides: {
      type: Array,
      default: () => []
    },
    speed: {
      type: Number,
      default: 2
    }
  },
  watch: {
    slides() {
      /* eslint-disable */

      $('.carousel').carousel({
        interval: this.speed * 1000
      })
    }
  },
  beforeDestroy() {
    $('.carousel').carousel('dispose')
  }
}
</script>

<style scoped>
.carousel {
  max-height: 190px;
  width: 100vw;
  overflow: hidden;
}

.carousel-inner {
  max-height: 190px;
}

.slide {
  max-height: 190px;
  width: 100vw;

}
</style>