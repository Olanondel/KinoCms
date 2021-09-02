<template>
  <div class="card-body general__margin" >
    <div v-show="!data.length">
      <h3>Список {{startText}} пуст. Начните создавать свою первую {{endText}}!</h3>
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
        v-for="(promotion, index) in data"
        :key="promotion.id"
        :title="promotion.title"
        :date="promotion.date"
        :status="promotion.stateText"
        :index="index"
        :isFetching="promotion.isFetching"
        @remove="remove"
        :to="promotion.to"
        :id="promotion.id"
        :not-delete="promotion.notDelete"
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
    isFetching: Boolean,
    startText: String,
    endText: String,
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

h3 {
  text-align: center;
}
</style>