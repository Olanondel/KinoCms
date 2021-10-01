<template>
  <div class="wrapper">
    <template v-if="loading">
      <Preloader />
      <div class="content-wrapper"></div>
    </template>

    <section class="schedule content-wrapper content" v-else>
      <ScheduleTable
        v-for="(day, index) in schedule"
        :key="day[2]"
        :index="index"
        :scheduleList="day[1]"
        :films="films"
        :cinemas="cinemas"
        :date="day[0]"
        :isRemoveFetching="isRemoveFetching"

        @addFilm="addFilm"
        @inputData="inputData"
        @changeDate="changeDate"
        @removeDay="removeDay"
      />

      <div class="row">
        <button @click="addDay" class="btn btn-primary mt-3 mb-3 mr-auto ml-auto">
          Добавить день
        </button>
      </div>

      <div class="row" v-if="wasChanged">
        <button :disabled="isFetching" @click="saveData" class="btn btn-block btn-success mt-3 mb-3 mr-auto ml-auto">
          Сохранить
        </button>
      </div>
    </section>
  </div>
</template>

<script>
import ScheduleTable from "../../components/admin/schedule/ScheduleTable";
import db from "../../firebase/firebaseInit";
import {mapGetters} from "vuex";
import server from '../../requests/admin/requests'
import {getCinemas} from "../../requests/site";
import Preloader from "../../components/admin/general/Preloader";

export default {
  name: "Schedule",
  components: {Preloader, ScheduleTable},
  data: () => ({
    schedule: [],
    films: [],
    wasChanged: false,
    isFetching: false,
    isRemoveFetching: false,
    cinemas: [],
    loading: true
  }),
  methods: {
    addDay() {
      this.schedule.push(['', [],
          Math.random(),
      ])
    },
    addFilm(index) {
      this.schedule[index][1].push({
        id: Math.random(),
        time: '',
        price: '',
        cinema: '',
        cinemaId: '',
        film: '',
        filmId: '',
        hall: '',
        hallId: ''
      })
    },
    inputData(payload, filmIndex, dayIndex) {
      this.schedule[dayIndex][1][filmIndex] = payload

      this.wasChanged = true
    },
    changeDate(date, index) {
      this.schedule[index][0] = date
    },
    async getCurrentFilms() {
      let data = await db.collection('Films').doc('currentFilms')
        .collection(this.currentLang).get()

      this.currentFilms = []

      if (data.docs.length) {

        data.docs.forEach(el => {
          let obj = el.data()

          this.films.push({
            title: obj.name, id: obj.id
          })
        })
      }
    },
    async saveData() {
      let allFilms = this.schedule.map(el => el[1])
      allFilms = allFilms.flat()

      let correctArray = allFilms.filter(el => {
        return !(el.cinemaId.length && el.cinema.length && el.filmId.length && el.film.length && el.hall.length && el.hallId.length && el.time.length && el.price.length)
      })

      if (!correctArray.length) {
        this.isFetching = true

        await Promise.all(this.schedule.map(async el => {
          let data = el[1]

          await server.saveToDb({data}, 'Schedule', el[0], this.currentLang)
        }))

        this.isFetching = false
        this.wasChanged = false
      } else {
        alert('Заполните все поля!')
        this.wasChanged = false
      }
    },
    async getData() {
      let docs = await server.getData('Schedule', null, this.currentLang)

      if (docs) {

        docs.forEach(el => {
          this.schedule.push([el.id, el.data().data])
        })
      }

      this.loading = false
    },
    async removeDay(index) {
      this.isRemoveFetching = true
      await server.removeSchedule(this.currentLang, this.schedule[index][0])

      this.schedule.splice(index, 1)

      this.isRemoveFetching = false
    },
    async getCinemas() {
      let docs = await getCinemas(this.currentLang)

      let cinemas

      if (docs && docs.length) {
        cinemas = docs.map(doc => {
          return {
            title: doc.data().title,
            id: doc.data().id
          }
        })
      }

      this.cinemas = cinemas
    }

  },
  computed: {
    ...mapGetters(['currentLang']),
  },
  watch: {
    currentLang() {
      this.getCurrentFilms()

      this.getData()
    }
  },
  mounted() {
    this.getCurrentFilms()
    this.getData()
    this.getCinemas()
  }
}
</script>

<style scoped>
.schedule {
  margin: 0 !important;
}
</style>