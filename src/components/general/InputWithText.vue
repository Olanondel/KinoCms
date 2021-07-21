<template>
  <div class="input-with-text general__margin">
    <label class="input-with-text__text general__text">{{text}}</label>
    <input
      @input="change"
      type="text"
      class="form-control input-with-text__input"
      :placeholder="text"
      v-model="inputText"
    />
  </div>
</template>

<script>

export default {
  name: 'InputWithText',
  props: {
    text: String,
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputText: this.value
    }
  },
  methods: {
    change() {
      this.$emit('change', this.inputText)
    }
  },
};
</script>

<style scoped>
.input-with-text {
  display: flex;
}

.input-with-text__input {
  max-width: 340px;
}
</style>