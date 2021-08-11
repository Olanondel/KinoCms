<template>
  <Preloader v-if="!init"/>
  <section v-else class="promotions">
    <h2 class="title">Список Акций</h2>

    <PlusButton
        text="Создать Акцию"
        route-name="promotionEdit"
        route-id="addPromotion"
    />

    <NewsTable
        @remove="removePromotion"
        :data="promotions"
        to="promotionEdit"
        start-text="Акций"
        end-text="Акцию"
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
  name: "news",
  data() {
    return {
      promotions: [],
      init: false,
    }
  },
  methods: {
    async setData() {
      let data = await server.getData('Promotions')

      data.forEach(el => {
        this.promotions.push(el.data())
      })

      this.init = true
    },
    async removePromotion(id, index) {
      if (id) {
        this.promotions[index].isFetching = true
          await server.removeElement(id, this.promotions[index].mainImage, this.promotions[index].images, 'Promotions')
          this.promotions.splice(index, 1)
          this.isFetching = false
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