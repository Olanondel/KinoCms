<template>
  <tr>
    <td>
      <input class="form-control" type="time" v-model="time" @input="inputData">
    </td>
    <td>
      <input
        type="text"
        placeholder="название фильма"
        class="form-control"
        v-model="film" @input="inputData"
        @click="showSearch"
      >

      <ul v-if="showList" style="width: 100%">
        <li
          v-for="(film) in filmsList"
          :key="film.id"
          @click="setTarget(film)"
          class="form-control"
        >
          {{ film.title }}
        </li>
      </ul>
    </td>
    <td>
      <input type="text" class="form-control cinema-input" v-model="cinema">

      <ul class="cinema-list" v-if="filteredCinemas.length">
        <li
          v-for="(item, index) in filteredCinemas"
          :key="item.id"
          class="cinema-list-item form-control"
          @click="setCinema(index)"
        >
          {{item.title}}
        </li>
      </ul>
    </td>
    <td>
      <input @focus="showHallList = true" type="text" class="form-control" v-model="hall" @input="inputData">

      <ul class="cinema-list" v-if="halls.length && showHallList">
        <li
          v-for="hall in halls"
          :key="hall.id"
          class="cinema-list-item form-control"
          @click="setHall(hall)"
        >
          {{hall.hallNumber}}
        </li>
      </ul>
    </td>
    <td>
      <span class="tag tag-success">
        <input type="number" class="form-control" v-model="price" @input="inputData">
      </span>
    </td>
  </tr>
</template>

<script>
import {mapGetters} from "vuex";
import {getHalls} from "../../../requests/site";

export default {
  name: "ScheduleTableItem",
  props: {
    params: {
      type: Object,
    },
    index: Number,
    films: Array,
    cinemas: Array
  },
  data() {
    return {
      time: this.params.time,
      film: this.params.film,
      hall: this.params.hall || '',
      hallId: this.params.hallId || '',
      price: this.params.price,
      cinema: this.params.cinema,
      cinemaId: this.params.cinemaId || '',
      filmId: null,
      showList: false,
      halls: [],
      showHallList: false,
    }
  },
  methods: {
    setHall(hall) {
      this.hall = hall.hallNumber
      this.hallId = hall.id

      this.showHallList = false
      this.inputData()
    },
    inputData() {
      console.log(this.cinema)

      this.$emit('inputData', {time: this.time, film: this.film, filmId: this.filmId, cinema: this.cinema, cinemaId: this.cinemaId, hall: this.hall, hallId: this.hallId, price: this.price,}, this.index)
    },
    setTarget(film) {
      this.film = film.title
      this.filmId = film.id

      this.inputData()

      this.hideList()
    },
    hideList() {
      this.showList = false
    },
    showSearch() {
      this.showList = true
    },
    async setCinema(index) {


      this.cinema = this.filteredCinemas[index].title
      this.cinemaId = this.filteredCinemas[index].id

      this.inputData()

      this.halls = await getHalls(this.currentLang, this.filteredCinemas[index].id)
    },

  },
  computed: {
    filmsList() {
      let values = Object.values(this.films)

      return values.filter(el => el.title.toLowerCase().trim().startsWith(this.film.toLowerCase()))
    },
    filteredCinemas() {
      let arr = []
      let ready = false

      if (this.cinema.length) {
        arr = this.cinemas.filter(el => {

          if (el.title.trim().toLowerCase() === this.cinema.trim().toLowerCase()) {
            ready = true
            return false
          }

          return el.title.trim().toLowerCase().includes(this.cinema.trim().toLowerCase())
        })
      } else {
        arr = []
      }

      return ready ? [] : arr
    },
    ...mapGetters(['currentLang'])
  },
  watch: {
    film() {

    },
    cinema() {
      this.inputData()
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.cinema-input {
  position: relative;
}

.cinema-list {
  position: absolute;
  z-index: 100;
}

.cinema-list-item {
  margin-bottom: 2px;
  cursor: pointer;
}

.cinema-list-item:hover {
  border: 1px solid lightseagreen;
}
</style>