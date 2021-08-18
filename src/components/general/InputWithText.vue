<template>
  <div class="input-with-text general__margin">
    <label class="input-with-text__text general__text">{{ text }}</label>
    <div class="general__input">
      <input
          :type="type"
          class="form-control input-with-text__input"
          :placeholder="text"
          :value="value"
          @input="$emit('input', $event.target.value)"
      />

      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  name: 'InputWithText',
  props: {
    text: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  }
};
</script>

<style scoped>
.input-with-text {
  display: flex;
  align-items: center;
}

.input-with-text__input, general__input {
  max-width: 280px;
  width: 280px;
}
</style>