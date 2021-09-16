<template>
  <div class="wrapper">
    <section class="schedule content-wrapper content">
      <ScheduleTable
        v-for="(day, index) in schedule"
        :key="index"
        :index="index"
        :scheduleList="day[1]"
        :films="films"
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

export default {
  name: "Schedule",
  components: {ScheduleTable},
  data: () => ({
    schedule: [],
    films: [],
    wasChanged: false,
    isFetching: false,
    isRemoveFetching: false
  }),
  methods: {
    addDay() {
      this.schedule.push(['', [{
        time: '',
        film: '',
        hall: '',
        price: ''
      }]])
    },
    addFilm(index) {
      this.schedule[index][1].push({
        time: '',
        film: '',
        hall: '',
        price: ''
      })
    },
    inputData(payload, filmIndex, dayIndex) {
      this.schedule[dayIndex][1][filmIndex] = payload

      this.wasChanged = true
    },
    changeDate(date, index) {
      this.schedule[index][0]= date
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
      this.isFetching = true

      await Promise.all(this.schedule.map(async el => {
        let data = el[1]

        await server.saveToDb({data}, 'Schedule', el[0], this.currentLang)
      }))

      this.isFetching = false
    },
    async getData() {
      let docs = await server.getData('Schedule', null, this.currentLang)

      if (docs) {
        console.log(docs)

        docs.forEach(el => {
          this.schedule.push([el.id, el.data().data])
        })
      }
    },
    async removeDay(index) {
      this.isRemoveFetching = true
      await server.removeSchedule(this.currentLang, this.schedule[index][0])

      this.schedule.splice(index, 1)

      this.isRemoveFetching = false
    }
  },
  computed: mapGetters(['currentLang']),
  watch: {
    currentLang() {
      this.getCurrentFilms()

      this.getData()
    }
  },
  mounted() {
    this.getCurrentFilms()

    this.getData()
  }
}
</script>

<style scoped>
.schedule {
  margin: 0 !important;
}
</style>