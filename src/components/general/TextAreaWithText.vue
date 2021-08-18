<template>
  <div class="textarea-with-text general__margin">
    <label class="textarea-with-text__text general__text">{{text}}</label>
    <textarea
      class="form-control textarea-with-text__input"

      :placeholder="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
    export default {
        props: {
          text: {
            type: String,
            default: 'Описание'
          },
          value: {
            type: String,
            default: ''
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