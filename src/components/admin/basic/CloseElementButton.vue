<template>
    <i v-if="!isFetching" @click.prevent="remove" class="far fa-times-circle slide-edit__close"></i>
    <i v-else class="fas fa-ban slide-edit__close"></i>
</template>

<script>
// Must use with position relative parrent
export default {
  name: "CloseElementButton.vue",
  props: {
    index: Number,
    isFetching: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    remove() {
      this.$emit('remove', this.index)
    }
  }
}
</script>

<style scoped>
.slide-edit__close {
  position: absolute;
  top: -10px;
  right: -10px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
}
</style>