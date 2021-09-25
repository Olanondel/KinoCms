<template>
  <div class="content-wrapper" style="min-height: 1416px;">
    <div class="content container">

      <PreloaderColor v-if="loading"/>
      <!-- Content Header (Page header) -->
      <section class="content-header" v-else>
        <div class="container-fluid">
          <div class="row mb-3">
            <div class="col-sm-6">
              <h1>Расписание</h1>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-4">
              <ScheduleCheckbox v-model="showedFilms"/>
            </div>

            <div class="col-8 option-filters">
              <div class="col-2">
                <ScheduleOptions v-model="filtersFor.cinema" text="Кинотеатр" :options="cinemaList"/>
              </div>
              <div class="col-2">
                <ScheduleOptions v-model="filtersFor.date" text="Дата" :options="dateList"/>
              </div>
              <div class="col-2">
                <ScheduleOptions v-model="filtersFor.films" text="Фильм: все" :options="filmList"/>
              </div>
              <div class="col-2">
                <ScheduleOptions v-model="filtersFor.hall" text="Зал: все" :options="hallList"/>
              </div>
            </div>
          </div>

        </div><!-- /.container-fluid -->
      </section>

      <!-- Main content -->
      <section class="content">

        <!-- Default box -->
        <div class="card" ref="card" v-for="card in filteredForDate" :key="card[0]">
          <div class="card-header">
            <h3 class="card-title">{{ card[0] }}</h3>

            <div class="card-tools">
              <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <div class="card-body p-0" style="display: none;">
            <table class="table table-striped projects">
              <thead>
              <tr>
                <th style="width: 8%">
                  ВРЕМЯ
                </th>
                <th style="width: 25%">
                  ФИЛЬМ
                </th>
                <th style="width: 25%">
                  Кинотеатр
                </th>
                <th style="width: 8%">
                  ЗАЛ
                </th>
                <th style="width: 10% ;">
                  ЦЕНА В ГРН
                </th>
                <th style="width: 10%">
                  БРОНИРОВАТЬ
                </th>
                <th style="width: 40%">

                </th>
              </tr>
              </thead>
              <tbody>
              <ScheduleTableRow
                v-for="(item, index) in sort(card[1])"
                :key="index"
                :data="item"
                :date="card[0]"
              />
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->

      </section>
      <!-- /.content -->
    </div>
  </div>
</template>

<script>
import server from "../../requests/admin/requests";
import {mapGetters} from "vuex";
import ScheduleTableRow from "../../components/site/schedule/ScheduleTableRow";
import PreloaderColor from "../../components/site/preloader/Preloader-color";
import ScheduleOptions from "../../components/site/schedule/ScheduleOptions";
import ScheduleCheckbox from "../../components/site/schedule/ScheduleCheckbox";
import filmServer from '../../requests/affiche&soon/requests'

export default {
  name: "SiteSchedule",
  components: {ScheduleCheckbox, ScheduleOptions, PreloaderColor, ScheduleTableRow},
  data() {
    return {
      schedule: [],
      loading: true,
      filtersFor: {
        cinema: '',
        date: '',
        films: '',
        hall: ''
      },
      showedFilms: [],
      filmData: null
    }
  },
  methods: {
    async getData() {
      let docs = await server.getData('Schedule', null, this.currentLang)

      if (docs) {
        docs.forEach(el => {
          this.schedule.push([el.id, el.data().data])
        })
      }

      await this.getFilms()

      this.schedule = this.schedule.map(el => {
        return [el[0], el[1] = el[1].map(el => {
          let films = this.filmData.filter(film => film.id === el.filmId)
          console.log('films', films)

          if (films.length) {
            console.log('ataka titanov', films[0].types)
            return {...el, types: films[0].types}
          }

          return {...el, types: []}
        })]
      })

      this.loading = false
    },
    async getFilms() {
      let current = await filmServer.getFutureFilms(this.currentLang)
      let future = await filmServer.getFilms(this.currentLang)

      this.filmData = [...current, ...future]
    },
    sortForTime(prop, arr) {

      return arr.sort(function (a, b) {

        if (a[prop] < b[prop]) {
          return -1;
        } else if (a[prop] > b[prop]) {
          return 1;
        } else {
          return 0;
        }
      });
    },
    sort(arr) {
      let copy = [...arr]

      this.sortForTime('time', copy)

      return copy
    }
  },
  computed: {
    ...mapGetters(['currentLang']),
    scheduleList() {
      let arr = this.schedule.map(el => el[1])

      return arr.flat()
    },
    dateList() {
      return this.schedule.map(el => {
        return el[0]
      })
    },
    cinemaList() {
      let arr = []

      this.scheduleList.forEach(el => {
        if (!arr.includes(el.cinema)) {
          arr.push(el.cinema)
        }
      })

      return arr
    },
    hallList() {
      let arr = []

      if (this.filtersFor.cinema.length) {
        this.scheduleList.forEach(el => {
          if (!arr.includes(el.hall) && el.cinema === this.filtersFor.cinema && el.hall.length) {
            arr.push(el.hall)
          }
        })
      }

      return arr
    },
    filmList() {
      let arr = []

      this.scheduleList.forEach(el => {
        if (!arr.includes(el.film)) {
          arr.push(el.film)
        }
      })

      return arr
    },
    filteredForDate() {
      let arr = [...this.schedule]

      if (this.filtersFor.date.length) {
        arr = this.schedule.filter(el => el[0] === this.filtersFor.date)
      }

      if (this.filtersFor.cinema.length) {
        arr = arr.map(el => {
          return [el[0], el[1].filter(el => el.cinema === this.filtersFor.cinema)]
        })
      }

      if (this.filtersFor.films.length) {
        arr = arr.map(el => {
          return [el[0], el[1].filter(el => el.film === this.filtersFor.films)]
        })
      }

      if (this.filtersFor.hall.length) {
        arr = arr.map(el => {
          return [el[0], el[1].filter(el => el.hall === this.filtersFor.hall)]
        })
      }

      if (this.showedFilms.length) {
        arr = arr.map(schedule => {
          return [schedule[0], schedule[1].filter(el => {
            let arr = el.types.filter(type => {
              return this.showedFilms.includes(type.toUpperCase())
            })

            return arr.length
          })]
        })
      }

      return arr
    },
  },
  mounted() {
    this.getData()
  }
}
</script>

<style scoped>
.option-filters {
  display: flex;
}
</style>