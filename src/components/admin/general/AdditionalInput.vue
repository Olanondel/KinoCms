<template>
  <input
      type="text"
      class="form-control input-with-text__input add-input"
      :placeholder="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
  />
</template>

<script>
export default {
  name: "AdditionalInput",
  props: {
    text: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

.input-with-text__input {
  max-width: 300px;
  width: 300px;
}

.add-input {
  margin-top: 15px;
}
</style>