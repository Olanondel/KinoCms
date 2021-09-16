<template>
  <section class="site wrapper">
    <Header/>

    <router-view/>

    <Footer/>
  </section>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";

export default {
  name: "SiteLayout",
  components: {Footer, Header},
  data() {
    return {
      bgBanner: '',
      carouselSpeed: 0,
      topBannerSlides: []
    }
  },
  methods: {
    changeBg(payload) {
      this.bgBanner = payload.link
      this.topBannerSlides = payload.config.slidesConfig
      this.carouselSpeed = payload.config.speed
    }
  },
  created() {
    document.body.classList.remove('dark-mode', 'sidebar-mini')
    document.body.classList.add('sidebar-collapse')
  }
}
</script>

<style scoped>

</style>