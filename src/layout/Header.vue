<template>
  <nav class="main-header navbar navbar-expand-md navbar-light navbar-white">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <span class="brand-text font-weight-light">Film<span style="color: orange">Hub</span></span>
      </router-link>

      <div class="collapse navbar-collapse order-3" id="navbarCollapse">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link :to="{name: 'affiche'}" class="nav-link">Афиша</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'schedule'}" class="nav-link">Расписание</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'soon'}" class="nav-link">Скоро</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'siteCinemas'}" class="nav-link">Кинотеатры</router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">Акции</a>
          </li>
          <li class="nav-item dropdown">
            <a id="dropdownSubMenu1" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="nav-link dropdown-toggle">О Кинотеатре</a>
            <ul aria-labelledby="dropdownSubMenu1" class="dropdown-menu border-0 shadow" style="left: 0px; right: inherit;">
              <li><a href="#" class="dropdown-item">Новости</a></li>
              <li><a href="#" class="dropdown-item">Реклама</a></li>
              <li><a href="#" class="dropdown-item">Кафе</a></li>
              <li><a href="#" class="dropdown-item">Мобильные приложения</a></li>
              <li><a href="#" class="dropdown-item">Контакты</a></li>
            </ul>
          </li>
        </ul>

        <!-- SEARCH FORM -->
        <form class="form-inline ml-0 ml-md-3">
          <div class="input-group input-group-sm">
            <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
            <div class="input-group-append">
              <button class="btn btn-navbar" type="submit">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- Right navbar links -->
      <ul class="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto" v-if="isAuth">
        <!-- Notifications Dropdown Menu -->
        <li class="nav-item dropdown">
          <a class="nav-link" data-toggle="dropdown" href="#">
            <i class="far fa-bell"></i>
          </a>
          <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <div class="dropdown-divider"></div>
            <router-link :to="{name: 'statistic'}" class="dropdown-item" v-if="this.isAdmin">
              <i class="fas fa-envelope mr-2"></i> CMS
            </router-link>
            <div class="dropdown-divider"></div>
            <router-link :to="{name: 'profile'}" class="dropdown-item">
              <i class="fas fa-envelope mr-2"></i> Профиль
            </router-link>
            <a href="#" @click.prevent="logout" class="dropdown-item">
              <i class="fas fa-envelope mr-2"></i> Выйти
            </a>
            <div class="dropdown-divider"></div>
          </div>
        </li>
      </ul>
      <ul class="order-1 order-md-3 navbar-nav navbar-no-expand ml-auto" v-else>
        <router-link :to="{name: 'login'}">Login</router-link>
        <span style="padding: 0 12px">|</span>
        <router-link :to="{name: 'register'}">Register</router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "Header",
  data() {
    return {
      lang: this.currentLang
    }
  },
  computed: mapGetters(['currentLang', 'isAuth', 'isAdmin']),
  watch: {
    lang() {
      this.$store.commit('setLang', this.lang)
    }
  },
  methods: {
    ...mapActions(['logout'])
  },
  mounted() {
    this.lang = this.$store.state.lang.lang
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logotype {
  height: auto;
  width: 100%;

  max-width: 200px;
}

.content {
  flex: 1 1 auto;
  align-items: center;
  flex-wrap: wrap;
}

.top-content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  border-bottom: 1px solid black;
  gap: 35px;
}

.search {
  max-width: 350px;
}

.social-list {
  flex: 1 1 auto;
  display: flex;
  justify-content: space-between;
  max-width: 300px;
  list-style: none;
  flex-wrap: wrap;
  gap: 10px;
}

.social-list i {
  font-size: 30px;
}

.phones {
  display: flex;
  flex-direction: column;
}

.navbar-nav {
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}

.bottom-content {
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;
}

.nav-list-wrapper {
  flex: 1 1 auto;
}

.lang-changer {
  max-width: 135px;
}

a {
  color: rgba(0,0,0,.5);
}
</style>