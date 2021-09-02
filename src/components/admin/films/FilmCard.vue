<template>
  <div class="card-wrapper">
    <router-link class="film-link" :to="{name: 'filmEdit', params: {id}, query: {from}}" :title="title">
        <div class="film-card">
      <img class="film-card__image" :src="image" :alt="title" />
      <div class="film-card__title">{{title}}</div>
    </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "FilmCard",
  props: {
    title: String,
    image: String,
    index: Number,
    from: String,
    id: String
  },
};
</script>

<style scoped>
.card-wrapper {
    width: 25%;
    padding: 0 15px;
    margin-bottom: 30px;
}

.film-link {
    color: #fff;
    cursor: pointer;
}

.film-card__image {
    width: 100%;
    height: auto;
    margin-bottom: 15px;
    max-width: 217px;
    min-width: 217px;
    max-height: 302px;
  object-fit: cover;
    min-height: 302px;
}

.film-card__title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>