<template>
  <div class="cinema">
    <router-link class="cinema__link" :to="'/cinemaConfig/' + id">
      <div class="image-wrap">
        <CloseElementButton :isFetching="isFetching" @remove="removeCinema(index, id)" />
        <img class="cinema-image" :src="logotype || require('@/assets/image/empty.jpg')" alt="cinema">
      </div>
      <div class="cinema__text">{{title || 'Без названия'}}</div>
    </router-link>
  </div>
</template>

<script>
import CloseElementButton from '@/components/basic/CloseElementButton.vue'
export default {
  name: "Cinema",
  props: {
    index: Number,
    id: String,
    isFetching: Boolean,
    logotype: {
      type: String
    },
    title: {
      type: String
    }
  },
  components: {CloseElementButton},
  methods: {
    removeCinema(index, id) {
      this.$emit('removeCinema', index, id)
    }
  }
}
</script>

<style scoped>
.cinema {
  width: 25%;
  margin-bottom: 30px;
}

.cinema__link {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 15px;
}

.image-wrap {
  position: relative;
}

.cinema-image {
  max-width: 100%;
  width: 100%;
  margin-bottom: 15px;
  height: 180px;
  min-height: 180px;
  object-fit: cover;
}

.cinema__text {
  text-align: center;
}
</style>