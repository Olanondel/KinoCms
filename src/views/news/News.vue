<template>
  <Preloader v-if="!init" />
    <section v-else class="news">
      <h2 class="title">Список Новостей</h2>

      <PlusButton text="Создать новость" />

      <NewsTable
          @remove="removeNews"
          :data="news"
          :isFetching="isFetching"
      />
    </section>
</template>

<script>
import PlusButton from "../../components/general/PlusButton";
import NewsTable from "../../components/news/NewsTable";
import server from '@/requests/newsPage'
import Preloader from "../../components/general/Preloader";
export default {
  components:  {Preloader, NewsTable, PlusButton},
  name: "news",
  data() {
    return {
      news: [],
      init: false,
      isFetching: false,
    }
  },
  methods: {
    async setData() {
      let data = await server.getNews()

      data.forEach(el => {
        this.news.push(el.data())
      })

      this.init = true
    },
    async removeNews(id, index) {
      if (id) {
        this.isFetching = true
        try {
          await server.removeNews(id, this.news[index].mainImage, this.news[index].images)
          this.news.splice(index, 1)
          this.isFetching = false
        } catch (err) {
          alert(err)
          this.isFetching = false
        }
      }
    },
  },
  mounted() {
    this.setData()
  }
}
</script>

<style scoped>
  
</style>