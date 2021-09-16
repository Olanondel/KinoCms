<template>
  <div>
    <Header />
    <Navigation />

    <div class="content-wrapper px-4 py-2">
      <section class="content">
        <slot />
      </section>
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from "./Header";
import Navigation from "./Navigation";
import Footer from "./Footer";
export default {
  name: "AdminLayout",
  components: {Footer, Navigation, Header},
  mounted() {
    document.body.classList.add('dark-mode')
    document.body.classList.remove('sidebar-collapse')
  }
}
</script>

<style scoped>

</style>