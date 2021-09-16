<template>
  <tr>
    <td>
      {{data.time}}
    </td>
    <td>
      <router-link :to="{name: 'filmInfo', params: { id: data.filmId }, query: { from: 'currentFilms' }}">
        {{data.film}}
      </router-link>
    </td>
    <td>
      {{data.hall}}
    </td>
    <td>
      {{data.price}}
    </td>
    <td class="project-actions text-right">
      <router-link class="btn btn-primary btn-sm" :to="{name: 'reserve', params: { id: data.filmId }, query: { time: data.time, hall: data.hall, price: data.price, date: date }}">
        <i class="fas fa-folder">
        </i>
        Бронировать
      </router-link>
    </td>
  </tr>
</template>

<script>
export default {
  name: "ScheduleTableRow",
  props: {
    data: Object,
    date: String
  }
}
</script>

<style scoped>

</style>