<template>
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex" v-if="!isAuth">
        <div class="image">
          <img
            :src="require('../../../public/dist/img/user2-160x160.jpg')"
            class="img-circle elevation-2"
            alt="User Image"
          />
        </div>
        <div class="info">
          Олег Паршегуба
        </div>
      </div>

      <!-- SidebarSearch Form -->
      <!-- <div class="form-inline">
        <div class="input-group" data-widget="sidebar-search">
          <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
          <div class="input-group-append">
            <button class="btn btn-sidebar">
              <i class="fas fa-search fa-fw"></i>
            </button>
          </div>
        </div>
      </div> -->

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul
          class="nav nav-pills nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <NavItem to="statistic" text="Статистика" icon="fa-images" />
          <NavItem to="banners" text="Баннера/Слайдеры" icon="fa-images" />
          <NavItem to="films" text="Фильмы" icon="fa-film" />
          <NavItem to="cinemas" text="Кинотеатры" icon="fa-photo-video" />
          <NavItem to="news" text="Новости" icon="fa-newspaper" />
          <NavItem to="promotions" text="Акции" icon="fa-socks" />
          <NavItem to="pages" text="Страницы" icon="fa-file" />
          <NavItem to="users" text="Пользователи" icon="fa-users" />
          <NavItem to="mailing" text="Рассылка" icon="fa-reply" />
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>

<script>
import NavItem from "../../components/admin/navigation/NavItem.vue";
import {mapGetters} from "vuex";
export default {
  components: { NavItem },
  computed: mapGetters(['isAuth'])
};
</script>

<style scoped>

.register {
  justify-content: center;
}

</style>
