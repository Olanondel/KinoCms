<template>
  <Preloader v-if="!init" />
    <section v-else class="news">
      <h2 class="title">Список Новостей</h2>

      <PlusButton
          text="Создать новость"
          route-id="addNews"
          route-name="newsEdit"
      />

      <NewsTable
          @remove="removeNews"
          :data="news"
          to="newsEdit"
          start-text="Новостей"
          end-text="Новость"
      />
    </section>
</template>

<script>
import PlusButton from "../../../components/admin/general/PlusButton";
import NewsTable from "../../../components/admin/news/NewsTable";
import server from '../../../requests/admin/newsPage'
import Preloader from "../../../components/admin/general/Preloader";
import {mapGetters} from 'vuex'

export default {
  components:  {Preloader, NewsTable, PlusButton},
  name: "news",
  data() {
    return {
      news: [],
      init: false,
    }
  },
  methods: {
    async setData() {
      let data = await server.getNews(this.currentLang)

      data.forEach(el => {
        this.news.push(el.data())
      })

      this.init = true
    },
    async removeNews(id, index) {
      if (id) {
        this.news[index].isFetching = true
        try {
          await server.removeNews(id, this.news[index].mainImage, this.news[index].images, this.currentLang)
          this.news.splice(index, 1)
          this.isFetching = false
        } catch (err) {
          alert(err)
          this.news[index].isFetching = false
        }
      }
    },
  },
  computed: mapGetters(["currentLang"]),
  watch: {
    currentLang() {
      this.init = false
      this.news = []

      this.setData()
    }
  },
  mounted() {
    this.setData()
  }
}
</script>

<style scoped>
  
</style>