<template>
  <div class="images-row-wrap general__margin">
    <label class="input-with-two-button__text general__text">{{ text }}</label>
    <div class="images-row">
      <ImagesRowImage 
        v-for="(image, index) in data"
        :key="index"
        :image="image"
        :index="index"
        @change="change"
      />
    </div>
  </div>
</template>

<script>
import ImagesRowImage from './ImagesRowImage.vue';
export default {
  components: { ImagesRowImage },
  name: "ImageRow",
  props: {
    text: {
      type: String,
      default: "Размер: 1000х190",
    },
    data: Array
  },
  methods: {
    change(file, index) {
      this.$emit('change', file, index)
    }
  }
};
</script>

<style scoped>
.images-row-wrap {
  display: flex;
}

.images-row {
    display: flex;
    overflow-x: auto;
    max-width: auto;
    margin: 0 -15px;
    width: 100%;
}
</style>