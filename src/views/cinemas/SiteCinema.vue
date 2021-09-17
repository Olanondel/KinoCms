<template>
  <div class="content-wrapper">
    <PreloaderColor v-if="loading"/>


    <template v-else>
      <div>
        <img class="img-fluid top-banner" :src="cinema.topBannerImage || require('@/assets/image/city.jpg')" alt="">
      </div>

      <div class="container pt-4 pb-4">
        <!-- Main content -->
        <section class="content">
          <div class="container-fluid">
            <div class="row mb-5">
              <div class="col-md-4">

                <!-- Profile Image -->
                <div class="card card-primary card-outline">
                  <div class="card-body ">
                    <div class="text-center">
                      <img class="img-fluid mb-3" :src="cinema.logotypeImage" alt="User profile picture">
                    </div>

                    <h2 class="text-center mb-5">{{ cinema.title }}</h2>

                    <div class="w-100">
                      <div
                        class="bg-indigo color-palette text-center  mb-3"
                        v-for="item in halls"
                        :key="item.id"
                      >
                        <router-link :to="{name: 'siteCinemaHall', params: { id: item.id}, query: { parent: cinema.id }}">
                          {{ item.hallNumber }}
                        </router-link>
                      </div>

                    </div>
                  </div>
                  <!-- /.card-body -->
                </div>
                <!-- /.card -->
              </div>
              <!-- /.col -->
              <div class="col-md-8">
                <div class="card">
                  <div class="card-body">
                    <div class="tab-content">
                      <div class="active tab-pane" id="activity">
                        <!-- Post -->
                        <div class="post">
                          <router-link :to="{name: 'schedule'}" class="btn btn-block btn-info mb-3">Расписание сеансов
                          </router-link>

                          <p class="text-left font-weight-bold">
                            <CarouselForImageArray
                              v-if="isImages"
                              number="2"
                              :slides="sliderImages"
                              :speed="3"
                            />

                            <img class="img-thumbnail img-fluid img" v-else src="@/assets/image/city.jpg" alt="">
                          </p>
                        </div>
                        <!-- /.post -->

                        <!-- /.post -->
                      </div>
                    </div>
                    <!-- /.tab-content -->
                  </div><!-- /.card-body -->
                </div>
                <!-- /.card -->
              </div>
              <!-- /.col -->
            </div>
            <!-- /.row -->
          </div><!-- /.container-fluid -->
        </section>
      </div>
    </template>

  </div>
</template>

<script>
import {getCinema, getHalls} from "../../requests/site";
import {mapGetters} from "vuex";
import PreloaderColor from "../../components/site/preloader/Preloader-color";
import CarouselForImageArray from "../../components/site/CarouselForImageArray";

export default {
  name: "SiteCinema",
  components: {CarouselForImageArray, PreloaderColor},
  data() {
    return {
      cinema: null,
      halls: [],
      loading: true
    }
  },
  methods: {
    async getCinema() {
      this.cinema = await getCinema(this.currentLang, this.$route.params.id)
    },
    async getHalls() {
      this.halls = await getHalls(this.currentLang, this.$route.params.id)
    }
  },
  computed: {
    ...mapGetters(['currentLang']),
    isImages() {
      let arr = this.cinema.images.filter(img => img.length)

      return arr.length
    },
    sliderImages() {
      return this.cinema.images.filter(img => img.length)
    }
  },
  async mounted() {
    await Promise.all([this.getCinema(), this.getHalls()])

    this.loading = false
  }
}
</script>

<style scoped>
.top-banner {
  width: 100%;
  object-fit: cover;
  max-height: 560px;
}

.card-img-top {
  object-fit: cover;
}

.img {
  min-width: 100%;
  object-fit: cover;
  max-height: 460px;
}
</style>