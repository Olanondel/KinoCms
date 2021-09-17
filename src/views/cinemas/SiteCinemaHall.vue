<template>
  <div class="content-wrapper">
    <PreloaderColor v-if="loading"/>

    <div v-else class="content-wrapper">
      <img class="img-fluid top-banner" :src="hall.topBannerImage || require('@/assets/image/city.jpg')" alt="">

      <!-- Content Header (Page header) -->
      <section class="content-header">
        <div class="container">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1>Зал - {{hall.hallNumber}}</h1>
            </div>
          </div>
        </div><!-- /.container-fluid -->
      </section>

      <!-- Main content -->
      <section class="content">
        <div class="container">
          <div class="row">
            <div class="col-4">

              <!-- Profile Image -->
              <div class="card card-primary card-outline">
                <div class="card-body box-profile">
                  <div class="text-center">
                    <img class=" img-fluid" :src="hall.hallSchemeImage" alt="User profile picture">
                  </div>

                  <h1 class="font-weight-bold text-center">{{hall.hallNumber}}</h1>

                  <p class="text-muted text-center font-weight-bold">The best Hall EVER</p>

                  <ul class="list-group list-group-unbordered mb-3">
                    <li class="list-group-item">
                      <b>Followers</b> <a class="float-right">1,322</a>
                    </li>
                  </ul>

                  <div>
                    <h2>Описание зала</h2>

                    <p class="font-weight-bold">
                      {{hall.description}}
                    </p>
                  </div>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->

            </div>
            <!-- /.col -->
            <div class="col-8">

              <div class="mb-5">
                <img class="img-fluid img-thumbnail" :src="hall.hallSchemeImage" alt="">
              </div>

              <div>
                <p class="text-left font-weight-bold">
                  <CarouselForImageArray
                    v-if="isImages"
                    number="3"
                    :slides="sliderImages"
                    :speed="3"
                  />

                  <img class="img-thumbnail img-fluid img" v-else src="@/assets/image/city.jpg" alt="">
                </p>
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

<script>
import PreloaderColor from "../../components/site/preloader/Preloader-color";
import {getHall} from "../../requests/site";
import {mapGetters} from "vuex";
import CarouselForImageArray from "../../components/site/CarouselForImageArray";

export default {
  name: "SiteCinemaHall",
  components: {CarouselForImageArray, PreloaderColor},
  data() {
    return {
      loading: false,
      hall: null
    }
  },
  methods: {
    async getHall() {
      this.hall = await getHall(this.currentLang, this.$route.query.parent, this.$route.params.id)
    }
  },
  computed: {
    ...mapGetters(['currentLang']),
    isImages() {
      let arr = this.hall.images.filter(el => el.length)

      return arr.length
    },
    sliderImages() {
      let arr = this.hall.images.filter(el => el.length)

      return arr
    }
},
  mounted() {
    this.getHall()
  }
}
</script>

<style scoped>
.top-banner {
  width: 100%;
  object-fit: cover;
  max-height: 560px;
}
</style>