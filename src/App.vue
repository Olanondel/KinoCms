<template>
  <div>
    <Header/>
    <Navigation/>

    <Modal
      text="modal text you are welcome!"
      btnText="Закрыть"
      v-if="modal"
      @close="closeModal"
    />
    <div class="content-wrapper px-4 py-2">
      <section class="content">
        <router-view/>
      </section>
    </div>

    <Footer/>

    <div @click="closeModal" v-if="modal" class="modal-backdrop fade show"></div>
  </div>
</template>


<script>
import '../public/dist/css/adminlte.min.css'
import '../public/plugins/overlayScrollbars/css/OverlayScrollbars.min.css'
import '../public/plugins/fontawesome-free/css/all.min.css'
import '../public/plugins/icheck-bootstrap/icheck-bootstrap.min.css'
import '../public/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css'
import '../public/plugins/bootstrap-switch/css/bootstrap3/bootstrap-switch.min.css'

import Footer from '@/layout/Footer.vue';
import Header from '@/layout/Header.vue';
import Navigation from '@/layout/Navigation.vue';
import Modal from "./components/general/Modal";

export default {
  components: {
    Modal,
    Navigation,
    Header,
    Footer
  },
  data() {
    return {
      modal: false
    }
  },
  methods: {
    closeModal() {
      this.modal = false
    },
    async getUsers() {
      await this.$store.dispatch('getUsers')

      this.init = true
    }
  },
  async mounted() {
    // await this.getUsers()
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

.content-wrapper > .content {
  /*padding: 0 80px;*/
}

.general__text {
  margin-right: 20px;
  width: 80px;
  min-width: 80px;
}

.general__margin {
  margin-bottom: 60px;
}

.general__button {
  margin: 0 15px;
}
</style>