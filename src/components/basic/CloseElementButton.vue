<template>
  <a @click.prevent="remove" class="slide-edit__close">
    <i class="far fa-times-circle">

    </i
  ></a>
</template>

<script>
// Must use with position relative parrent
export default {
  name: "CloseElementButton.vue",
  props: {
    index: Number
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