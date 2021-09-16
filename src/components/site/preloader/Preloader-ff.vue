<template>
  <section class="preloader-wrapper d-flex justify-content-center align-content-center">
    <img class="own-preloader" src="@/assets/preloader/spiner-fff.gif" alt="alt">
  </section>
</template>

<script>
export default {
  name: "Preloader-ff"
}
</script>

<style scoped>
.preloader-wrapper {
  width: 100%;
  height: 350px;
}

.preloader {
  max-width: 40px;
  height: auto;
}
</style>