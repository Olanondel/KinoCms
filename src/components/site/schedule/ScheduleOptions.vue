<template>
  <div class="form-group">
    <select v-model="value" @input="$emit('input', $event.target.value)" class="form-control">
      <option value="">{{text}}</option>
      <option
        v-for="(option, index) in options"
        :key="index"
      >{{option}}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    options: Array,
    value: String,
    text: String
  },
  name: "BaseOptions",
  data() {
    return {
      select: ''
    }
  }
}
</script>

<style scoped>

</style>