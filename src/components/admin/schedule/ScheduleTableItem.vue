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
          @click="setTarget(film.id, film.title)"
          class="form-control"
        >
          {{ film.title }}
        </li>
      </ul>
    </td>
    <td>
      <input type="number" class="form-control" v-model="hall" @input="inputData">
    </td>
    <td>
      <span class="tag tag-success">
        <input type="number" class="form-control" v-model="price" @input="inputData">
      </span>
    </td>
  </tr>
</template>

<script>
export default {
  name: "ScheduleTableItem",
  props: {
    params: {
      type: Object,
    },
    index: Number,
    films: Array
  },
  data() {
    return {
      time: this.params.time,
      film: this.params.film,
      hall: this.params.hall,
      price: this.params.price,
      filmId: null,
      showList: false
    }
  },
  methods: {
    inputData() {
      this.$emit('inputData', {time: this.time, film: this.film, hall: this.hall, price: this.price, filmId: this.filmId}, this.index)
    },
    setTarget(id, title) {
      this.film = title
      this.filmId = id

      this.hideList()
    },
    hideList() {
      this.showList = false
    },
    showSearch() {
      this.showList = true
    },
  },
  computed: {
    filmsList() {
      let values = Object.values(this.films)

      return values.filter(el => el.title.toLowerCase().trim().startsWith(this.film.toLowerCase()))
    }
  },
  watch: {
    film() {

    }
  },
  mounted() {
    console.log(this.films)
  }
}
</script>

<style scoped>

</style>