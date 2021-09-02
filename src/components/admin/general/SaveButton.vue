<template>
  <div class="save__btn general__margin">
    <button :disabled="isFetching" @click="saveEvent" class="btn btn-success btn-lg">{{ text }}</button>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Сохранить'
    },
    isFetching: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    saveEvent() {
      this.$emit('saveEvent')
    }
  }
}
</script>

<style scoped>
.save__btn {
  text-align: center;
  width: 100%;

}
</style>