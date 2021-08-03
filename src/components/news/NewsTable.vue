<template>
  <div class="card-body">
    <table class="table table-bordered">
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
        title="Три билета в подарок"
        date="01.08.2021"
        status="ВКЛ"
      />

      <NewsTableRow
          title="Три билета в подарок"
          date="01.08.2021"
          status="ВЫКЛ"
      />

      </tbody>
    </table>
  </div>
</template>

<script>
import NewsTableRow from "./NewsTableRow";
export default {
  name: "Table",
  components: {NewsTableRow}
}
</script>

<style scoped>
.table {
  max-width: 60%;
  margin: 0 auto;
}
</style>