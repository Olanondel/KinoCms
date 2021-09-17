<template>
  <div class="content-wrapper">

    <PreloaderColor v-if="loading"/>

    <template>

      <div class="mb-5">
        <img class="img-fluid top-banner" :src="require('@/assets/image/news.png')" alt="">
      </div>

      <div class="container">
        <div class="content-wrapper">
          <!-- Content Header (Page header) -->
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Контакты</h1>
                </div>
                <div class="col-sm-6">
                </div>
              </div>
            </div><!-- /.container-fluid -->
          </section>

          <!-- Main content -->
          <section
            class="content mb-5"
            v-for="item in news"
            :key="item.id"
          >
            <div class="container">
              <div class="row">
                <div class="col-5">

                  <!-- Profile Image -->
                  <div class="card card-primary card-outline">
                    <div class="card-body box-profile">
                      <div class="text-center">
                        <img class="img-fluid img-thumbnail" :src="item.mainImage || require('../../assets/image/empty.jpg')" alt="User profile picture">
                      </div>
                    </div>
                    <!-- /.card-body -->
                  </div>
                  <!-- /.card -->

                  <!-- About Me Box -->

                  <!-- /.card -->
                </div>
                <!-- /.col -->
                <div class="col-7">
                  <div class="card">
                    <div class="card-header p-2">
                      <h2 class="font-weight-bold">{{item.title}}</h2>

                      <p class="font-weight-bold">
                        {{item.address}}
                      </p>

                      <img class="img-thumbnail img-fluid mb-3" src="@/assets/image/news-item.jpg" alt="">

                      <p class="font-weight-bold text-center">
                        {{item.description}}
                      </p>
                    </div><!-- /.card-header -->
                    <div class="card-body">

                      <!-- /.tab-content -->
                    </div><!-- /.card-body -->
                  </div>
                  <!-- /.nav-tabs-custom -->
                </div>
                <!-- /.col -->
              </div>
              <!-- /.row -->
            </div><!-- /.container-fluid -->
          </section>
          <!-- /.content -->
        </div>
      </div>

    </template>

  </div>
</template>

<script>
import PreloaderColor from "../../components/site/preloader/Preloader-color";
import server from "../../requests/admin/newsPage";
import {mapGetters} from "vuex";
export default {
  name: "SiteNews",
  components: {PreloaderColor},
  data() {
    return {
      loading: false,
      news: []
    }
  },
  methods: {
    async setData() {
      let data = await server.getNews(this.currentLang)

      data.forEach(el => {
        this.news.push(el.data())
      })

      this.init = true
    },
  },
  computed: {
    ...mapGetters(['currentLang'])
  },
  mounted() {
    this.setData()
  }
}
</script>

<style scoped>

</style>