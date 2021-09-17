<template>
  <div class="content-wrapper">
    <PreloaderColor v-if="loading"/>


    <template v-else>
      <div>
        <img class="img-fluid top-banner" :src="require('@/assets/image/city.jpg')" alt="">
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
                      <img class="img-fluid mb-3" :src="promotion.mainImage" alt="User profile picture">
                    </div>

                    <h2 class="text-center mb-5">{{ promotion.title }}</h2>
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
                          <h4 class=" text-center font-weight-bold">
                            {{promotion.description}}
                          </h4>
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
import {getPromotion} from "../../requests/site";
import {mapGetters} from "vuex";
import PreloaderColor from "../../components/site/preloader/Preloader-color";

export default {
  name: "SiteCinema",
  components: {PreloaderColor},
  data() {
    return {
      promotion: null,
      loading: true
    }
  },
  methods: {
    async getPromotion() {
      this.promotion = await getPromotion(this.currentLang, this.$route.params.id)
    }
  },
  computed: {
    ...mapGetters(['currentLang']),
    isImages() {
      let arr = this.promotion.images.filter(img => img.length)

      return arr.length
    },
    sliderImages() {
      return this.promotion.images.filter(img => img.length)
    }
  },
  async mounted() {
    await this.getPromotion()

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