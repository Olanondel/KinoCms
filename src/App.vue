<template>
    <div>
        <Header />
        <Navigation />

        <div class="content-wrapper px-4 py-2">
            <section class="content">
                <router-view />
            </section>
        </div>
              
        <Footer />
    </div>
</template>

<script>
import Footer from '@/layout/Footer.vue';
import Header from '@/layout/Header.vue';
import Navigation from '@/layout/Navigation.vue';

export default {
  components: {
    Navigation,
    Header,
    Footer
  }
};
</script>

<style>
label {
  margin-bottom: 0;
}

.title {
  text-align: center;
  margin: 30px 0;
}

.content-wrapper>.content {
  padding: 0 80px;
}

.general__text {
  margin-right: 35px;
  width: 100px;
  min-width: 100px;
}

.general__margin {
  margin-bottom: 60px;
}

.general__button {
  margin: 0 15px;
}
</style>