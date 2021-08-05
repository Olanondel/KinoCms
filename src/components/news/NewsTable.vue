<template>
  <div class="card-body" >
    <div v-show="!data.length">
      <h3>Список новостей пуст. Начните создавать свою первую новость!</h3>
    </div>
    <table class="table table-bordered" v-show="data.length">
      <thead>
      <tr>
        <th>Название</th>
        <th>Дата Создания</th>
        <th style="width: 10px">Статус</th>
        <th style="width: 40px">Edit</th>
      </tr>
      </thead>
      <tbody>

      <NewsTableRow
        v-for="(news, index) in data"
        :key="news.id"
        :title="news.title"
        :date="news.date"
        :status="news.stateText"
        :id="news.id"
        :index="index"
        :isFetching="isFetching"
        @remove="remove"
      />

      </tbody>
    </table>
  </div>
</template>

<script>
import NewsTableRow from "./NewsTableRow";
export default {
  name: "Table",
  components: {NewsTableRow},
  props: {
    data: Array,
    isFetching: Boolean
  },
  methods: {
    remove(id, index) {
      this.$emit('remove', id, index)
    }
  }
}
</script>

<style scoped>
.table {
  max-width: 60%;
  margin: 0 auto;
}
</style>