<template>
  <div class="content-wrapper">
    <PreloaderColor v-if="loading"/>

    <template v-else>
      <img src="@/assets/image/hall.jpg" class="img-fluid hall-image" alt="">

      <div class="container pt-4 pb-4">
        <!-- Main content -->
        <section class="content">
          <div class="container-fluid">
            <div class="row">
              <div class="col-md-4">

                <!-- Profile Image -->
                <div class="card card-primary card-outline">
                  <div class="card-body ">
                    <div class="text-center">
                      <img class="img-fluid mb-3" :src="film.mainImage" alt="User profile picture">
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
                          <h2 class="text-left">{{ film.name }}</h2>

                          <p class="text-left">
                            {{ film.description }}
                          </p>
                        </div>
                        <!-- /.post -->

                        <div class="post d-flex justify-content-between align-content-center">
                          <div class="info">
                            <h3>{{ $route.query.date }}, {{ $route.query.time }}, ЗАЛ #{{ $route.query.hall }}</h3>
                            <h3>Цена: {{ $route.query.price }} грн</h3>
                          </div>
                          <div class="cart d-flex align-content-center">
                            <h5>Ваш заказ: Билетов: {{ cart.length }}, Сумма: {{ currentSum }}</h5>
                          </div>
                        </div>


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


        <div class="container mt-4 mb-5">
          <div class="row">
            <div class="col-12">
              <div class="post">
                <div class="monitor mb-3">
                  <img class="img-fluid" src="@/assets/image/monitor.png" alt="">
                </div>

                <div class="places-block">
                  <PlacesRow
                    v-for="(item, index) in hallScheme"
                    :key="index"
                    :rowIndex="index"
                    :place-count="item[0]"
                    @toggleToCart="toggleToCart"
                    :cart="cart"
                    class="mb-2"
                  />
                </div>
              </div>

              <div class="post">
                <p class="text-center"><b>Стоимость услуги бронирования - 3грн за каждое место.</b></p>
                <p class="text-center"><b>ЗАБРОНИРОВАННЫЕ БИЛЕТЫ НУЖНО ВЫКУПИТЬ В КАССЕ КИНОТЕАТРА НЕ ПОЗДНЕЕ ЧЕМ ЗА ПОЛЧАСА ДО
                  НАЧАЛА СЕАНСА.</b></p>
              </div>

              <!-- Post -->
              <div class="post clearfix d-flex justify-content-center">
                <div>
                  <button @click="reserve" class="btn btn-success mr-3" :disabled="isFetching">Забронировать</button>
                  <button @click="buy" class="btn btn-success" :disabled="isFetching">Купить</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import db from "../../firebase/firebaseInit";
import {mapGetters} from "vuex";
import PreloaderColor from "../../components/site/preloader/Preloader-color";
import PlacesRow from "../../components/site/schedule/PlacesRow";
import {reserve, getCart} from "../../requests/site";

export default {
  name: "Reserve",
  components: {PlacesRow, PreloaderColor},
  data() {
    return {
      film: null,
      loading: true,
      hallScheme: [
        [12],
        [14],
        [15],
        [13],
        [13],
        [13],
        [13],
        [13],
        [13],
        [16],
      ],
      cart: [],
      reserveSum: 0,
      isFetching: false
    }
  },
  methods: {
    async getCurrentFilm() {
      let data = await db.collection('Films').doc('currentFilms')
        .collection(this.currentLang).doc(this.$route.params.id).get()

      this.films = []

      if (data.exists) {
        this.film = data.data()
      }

      this.loading = false
    },
    toggleToCart([row, place]) {

      this.reserveSum = 0

      if (!this.cart.some(el => el.row === row && el.place === place)) {
        this.cart.push({row, place})
      } else {
        this.removeFromCart([row, place])
      }
    },
    removeFromCart([row, place]) {
      console.log(this.cart.filter(el => {
        return el.row !== row && el.place !== place
      }))

      this.cart = this.cart.filter(el => !(el.row === row && el.place === place))
    },
    async reserve() {
      this.isFetching = true

      this.reserveSum = this.currentSum + ( this.cart.length * 3 )

      await reserve(this.uid, this.cart, this.reserveSum)

      alert(`Успешно, к оплате: ${this.reserveSum}`)
      this.isFetching = false
    },
    async buy() {
      this.isFetching = true

      this.reserveSum = 0

      await reserve(this.uid, this.cart)

      alert(`Успешно, к оплате: ${this.currentSum}`)
      this.isFetching = false
    },
    async getCart() {
      let {cart, reserveSum} = await getCart(this.uid)

      this.cart = cart
      this.reserveSum = reserveSum
    }
  },
  computed: {
    ...mapGetters(['currentLang', 'currentUser', 'uid']),
    currentSum() {
      return this.$route.query.price * this.cart.length
    }
  },
  watch: {
    currentLang() {
      this.getCurrentFilm()
    },
  },
  mounted() {
    this.getCurrentFilm()
    this.getCart()
  }
}
</script>

<style scoped>
.hall-image {
  max-height: 500px;
  object-fit: cover;
  width: 100%;
}


</style>