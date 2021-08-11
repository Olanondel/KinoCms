<template>
  <Preloader v-if="!init"/>
  <section v-else class="promotions">
    <h2 class="title">Список Страниц</h2>

    <PlusButton
        text="Создать Новую"
        route-name="general"
        route-id="addPage"
    />

    <NewsTable
        @remove="removeElement"
        :data="pages"
        start-text="Страниц"
        end-text="Страницу"
    />
  </section>
</template>

<script>
import PlusButton from "../../components/general/PlusButton";
import NewsTable from "../../components/news/NewsTable";
import server from '@/requests/requests'
import Preloader from "../../components/general/Preloader";

export default {
  components: {Preloader, NewsTable, PlusButton},
  name: "pages",
  data() {
    return {
      pages: [],
      init: false,
    }
  },
  methods: {
    async setData() {
      let data = await server.getData('Pages')

      data.forEach(el => {
        this.pages.push(el.data())
      })
      this.init = true
    },
    async removeElement(id, index) {
      if (id) {
        this.pages[index].isFetching = true
        try {
          await server.removeElement(id, null, null, 'Pages')
          this.pages.splice(index, 1)
          this.isFetching = false
        } catch (err) {
          alert(err)
          this.pages[index].isFetching = false
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