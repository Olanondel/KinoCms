<template>
  <div class="textarea-with-text general__margin">
    <label class="textarea-with-text__text general__text">{{text}}</label>
    <textarea
      v-model="inputText"
      class="form-control textarea-with-text__input"
      :placeholder="text"
      @input="change"
    />
  </div>
</template>

<script>
    export default {
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
        }
    }
</script>

<style scoped>
.textarea-with-text {
    display: flex;
}

.textarea-with-text__input {
    height: 160px;
    resize: none;
}
</style>