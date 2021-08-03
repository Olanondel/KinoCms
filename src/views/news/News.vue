<template>
    <section class="news">
      <h2 class="title">Список Новостей</h2>
      <PlusButton text="Создать новость" />
      <NewsTable />
    </section>
</template>

<script>
import PlusButton from "../../components/general/PlusButton";
import NewsTable from "../../components/news/NewsTable";
export default {
  components:  {NewsTable, PlusButton},
  name: "news"
}
</script>

<style scoped>
  
</style>