<template>
  <div class="general__margin radio-with-text">
    <label class="general__text">{{ text }}</label>

    <div class="general__content">
      <div class="icheck-primary d-inline">
        <input
          type="radio"
          :id="id1"
          :name="name"
          :value="value1"
          v-model="state"
          @change="changeCurrent"
        >
        <label :for="id1">{{ text1 }}</label>
      </div>

      <div class="icheck-primary d-inline">
        <input
          type="radio"
          :id="id2"
          :name="name"
          :value="value2"
          v-model="state"
          @change="changeCurrent"
        >
        <label :for="id2">{{ text2 }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RadioWithText",
  props: {
    text: String,
    name: String,
    value1: String,
    value2: String,
    text1: String,
    text2: String,
    id1: String,
    id2: String,
    current: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      state: this.current
    }
  },
  methods: {
    changeCurrent(value) {
      this.$emit('changeState', value.target.value)
    }
  },
}
</script>

<style scoped>
.radio-with-text {
  display: flex;
  align-items: center;
}

.general__content {
  display: flex;
  gap: 40px;
  justify-content: center;
  max-width: 280px;
  width: 280px;
}
</style>