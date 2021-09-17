<template>
  <div style="">
    <Component :is="component">
      <router-view />
    </Component>
  </div>
</template>


<script>
import '../public/dist/css/adminlte.min.css'
import '../public/plugins/overlayScrollbars/css/OverlayScrollbars.min.css'
import '../public/plugins/fontawesome-free/css/all.min.css'
import '../public/plugins/icheck-bootstrap/icheck-bootstrap.min.css'
import '../public/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css'
import '../public/plugins/bootstrap-switch/css/bootstrap3/bootstrap-switch.min.css'
import 'swiper/swiper.min.css'

import AdminLayout from "./layout/admin/AdminLayout";
import LoginLayout from "./layout/LoginLayout";
import SiteLayout from "./layout/SiteLayout";

export default {
  components: {
    AdminLayout, LoginLayout, SiteLayout
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
  computed: {
    component() {
      return (this.$route.meta.layout || 'Admin') + 'Layout'
    }
  },
  async mounted() {
    this.getUsers()
  }
};
</script>

<style>

.card {
  height: 100%;
}

.card-img-top {
  max-height: 300px;
  min-height: 300px;
  height: 300px;
  object-fit: contain;
}

.dropdown-menu-lg {
  min-width: auto !important;
}

.main {
  max-width: 1085px;
  padding: 14px 15px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: white;
}

.content-wrapper {}

a {

}

a:hover {
  color: black;
}

h2 {
  font-weight: bold;
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

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

.top-banner {
  width: 100%;
  object-fit: cover;
  max-height: 560px;
}
</style>