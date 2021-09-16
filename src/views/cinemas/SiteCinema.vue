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
                  </div>
                  <!-- /.card-body -->
                  <div class="card-footer">
                    <h2 class="text-center">{{ cinema.title }}</h2>
                  </div>
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
                          <router-link :to="{name: 'schedule'}" class="btn btn-block btn-info mb-3">Расписание сеансов</router-link>

                          <p class="text-left font-weight-bold">
                            {{cinema.description}}
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

            <div class="row">
                <div class="col-4 w-100">
                  <div
                    class="bg-indigo color-palette text-center"
                    v-for="item in halls"
                    :key="item.id"
                  ><span>{{item.hallNumber}}</span></div>

                </div>
            </div>
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

export default {
  name: "SiteCinema",
  components: {PreloaderColor},
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
  computed: mapGetters(['currentLang']),
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
</style>