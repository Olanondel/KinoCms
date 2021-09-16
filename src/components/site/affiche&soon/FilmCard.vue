<template>
  <div class="col-3 mb-4">
    <div class="card">
      <div class="card-header text-center">{{header}}</div>
      <img class="card-img-top" :src="image" alt="Card image cap">
      <div class="card-body">
        <router-link :to="{ name: 'filmInfo', params: { id }, query: { from } }" class="card-title btn-block text-center">{{ title }}</router-link>
      </div>
      <div class="card-footer">
        <router-link to="" class="btn btn-block btn-info">Купить</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilmCard",
  props: ['image', 'title', 'id', 'from', 'header'],
  mounted() {}
}
</script>

<style scoped>
.card-img-top {
  max-width: 100%;
  height: auto;
  object-fit: cover;
}
</style>