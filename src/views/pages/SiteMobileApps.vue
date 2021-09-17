<template>
  <div class="content-wrapper">

    <PreloaderColor v-if="loading" />

    <template>

      <div class="mb-5">
        <img class="img-fluid top-banner" :src="require('@/assets/image/mobile-apps.jpg')" alt="">
      </div>

      <div class="container">
        <div class="row justify-content-around">

          <div class="col-4">
            <img class="img-thumbnail img-fluid" src="@/assets/image/gmarket.png" alt="">
          </div>

          <div class="col-4">
            <img class="img-thumbnail img-fluid" src="@/assets/image/appstore.png" alt="">
          </div>

        </div>
      </div>

    </template>

  </div>
</template>

<script>
import PreloaderColor from "../../components/site/preloader/Preloader-color";
export default {
  name: "SiteMobileApps",
  components: {PreloaderColor},
  data() {
    return {
      loading: false
    }
  }
}
</script>

<style scoped>

</style>