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
import PlusButton from "../../../components/admin/general/PlusButton";
import NewsTable from "../../../components/admin/news/NewsTable";
import server from '../../../requests/admin/requests'
import Preloader from "../../../components/admin/general/Preloader";
import {mapGetters} from "vuex";

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
      let data = await server.getData('Pages', null, this.currentLang)

      this.pages = []

      if (data) {
        data.forEach(el => {
          this.pages.push(el.data())
        })
      } else {
        Object.assign(this.$data, this.$options.data.call(this), {lang: this.lang, init: true, id: this.id, to: 'general'})
      }

      this.init = true
    },
    async removeElement(id, index) {
      if (id) {
        this.pages[index].isFetching = true

        try {
          await server.removeElement(id, this.pages[index].mainImage, this.pages[index].images, 'Pages', this.currentLang)
          this.pages.splice(index, 1)
          this.isFetching = false
        } catch (err) {
          alert(err)
          this.pages[index].isFetching = false
        }
      }
    },
  },
  computed: mapGetters(['currentLang']),
  watch: {
    currentLang() {
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