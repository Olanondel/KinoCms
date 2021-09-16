<template>
  <section>
    <div style="height: 92vh" v-if="trailer.length">
      <TrailerSection :src="trailer"/>
    </div>

    <div class="content-wrapper">
      <div class="container pt-4 pb-4">
        <div class="schedule">

        </div>

        <section class="about">
          <div class="logo-block">
            <img :src="mainImage" class="img-thumbnail img-fluid logo" alt="">
          </div>

          <div class="description-wrapper">
            <div class="description">
              <router-link to="to" class="btn btn-info buy-ticket">Купить билет</router-link>

              <h2 class="own-title">{{ title }}</h2>

              <div class="description-text">{{ description }}</div>
            </div>
          </div>
        </section>

        <section class="about">
          <div class="logo-block">
            <img :src="mainImage" class="img-thumbnail img-fluid logo" alt="">
          </div>

          <div class="description-wrapper">
            <div class="description">
              <div id="carouselExampleControls" class="carousel slide" data-ride="carousel" ref="filmCarousel">
                <div class="carousel-inner">
                  <div
                    class="carousel-item own-slide-item"
                    :class="{active: !index}"
                    v-for="(img, index) in img"
                    :key="index"
                  >
                    <img class="d-block w-100 img-fluid img-thumbnail" :src="img" alt="First slide">
                  </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  </section>
</template>

<script>
import server from '../../requests/filmCard/filmCard'
import {mapGetters} from "vuex";
import TrailerSection from "../../components/site/affiche&soon/TrailerSection";

export default {
  name: "FilmCard",
  components: {TrailerSection},
  data() {
    return {
      trailer: '',
      mainImage: '',
      title: '',
      description: '',
      images: []
    }
  },
  methods: {
    async getData() {
      let data = await server.getData(this.currentLang, this.$route.params.id, this.$route.query.from)

      if (data) {
        this.trailer = data.trailer
        this.mainImage = data.mainImage
        this.description = data.description
        this.images = data.images
        this.title = data.name
      }
    },
  },
  computed: {
    ...mapGetters(['currentLang']),
    img() {
      return this.images.filter(el => el)
    }
  },
  async mounted() {
    document.body.classList.remove('dark-mode')

    await this.getData()
  }
}
</script>

<style scoped>
.carousel-inner {
  height: 100%;
}

.own-slide-item img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.about {
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
}

.logo-block {
  flex: 0 1 40%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  max-width: 75%;
}

.description-wrapper {
  flex: 0 1 60%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.description {
  flex: 0 1 80%;
}

.own-title {
  margin-bottom: 10px;
}

.description-text {
  text-align: justify;
}

.buy-ticket {
  padding-left: 80px;
  padding-right: 80px;
  margin-bottom: 10px;
}
</style>