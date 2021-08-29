<template>
  <nav class="main-header navbar navbar-expand navbar-dark nav-flex">

    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
      </li>
    </ul>


    <select
        class="form-control select2 select2-hidden-accessible lang-changer"
        data-select2-id="1"
        tabindex="-1"
        aria-hidden="true"
        v-model="lang"
    >
      <option value="ru">Русский</option>
      <option value="ua">Украинский</option>
    </select>
  </nav>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "Header",
  data() {
    return {
      lang: this.currentLang
    }
  },
  computed: mapGetters(['currentLang']),
  methods: mapActions(['getLang']),
  watch: {
    lang() {
      this.getLang(this.lang)
    }
  },
  mounted() {
    this.lang = this.$store.state.lang.lang
  }
}
</script>

<style scoped>
.nav-flex {
  justify-content: space-between;
  align-items: center;
}

.lang-changer {
  margin-right: 25px;
  max-width: 140px;
}
</style>