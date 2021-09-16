<template>
  <div class="row justify-content-around">
    <h4 class="row-title">Ряд {{rowIndex + 1}}</h4>

    <ul class="places">
      <li
        class="mr-1"
        v-for="item in placeCount"
        :key="item"
      >
        <button
          class="btn-secondary btn"
          @click="toggleToCart(item)"
          :class="{ 'btn-danger': inCart(rowIndex, item) }"
        >{{item}}</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "PlacesRow",
  props: {
    rowIndex: Number,
    placeCount: Number,
    cart: Array
  },
  methods: {
    toggleToCart(place) {
      this.$emit('toggleToCart', [this.rowIndex, place])
    },
    removeFromCart(place) {
      this.$emit('removeFromCart', [this.rowIndex, place])
    },
    inCart(row, place) {
        return this.cart.some(el => el.row === row && el.place === place)
    }
  },
}
</script>

<style scoped>
.row-title {
  flex: 0 0 auto;
}

.places {
  flex: 0 1 800px;
  display: flex;
  justify-content: center;
}
</style>