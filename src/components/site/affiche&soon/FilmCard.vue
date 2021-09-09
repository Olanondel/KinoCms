<template>
  <div class="film-card">
    <div class="status">Сейчас в кино</div>

    <img src="@/assets/image/empty.jpg" class="card-image" alt="">

    <div class="title-block">
      <router-link to="" class="title">Сила воли</router-link>
    </div>

    <router-link to="" class="btn btn-block btn-warning btn-sm">Купить</router-link>
  </div>
</template>

<script>
export default {
  name: "film-card"
}
</script>

<style scoped>
.film-card {
  flex: 0 1 20%;
  padding: 15px;
}

.status {
  text-align: center;
  margin-bottom: 4px;
}

.card-image {
  max-width: 100%;
  height: auto;
  min-height: 220px;
  object-fit: cover;
}

.title-block {
  text-align: center;
  padding: 8px 0;
}

.title {
  text-align: center;
}
</style>