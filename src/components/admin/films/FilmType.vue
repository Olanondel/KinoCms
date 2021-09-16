<template>
  <div class="film-type-wrap general__margin">
    <label class="general__text">{{ text }}</label>
    <div class="film__types">
      <div class="icheck-primary d-inline film-type">
        <input type="checkbox" id="checkboxPrimary1" v-model="types" value="3d" @change="change"/>
        <label for="checkboxPrimary1">3D </label>
      </div>

      <div class="icheck-primary d-inline film-type">
        <input type="checkbox" id="checkboxPrimary2" v-model="types" value="2d" @change="change"/>
        <label for="checkboxPrimary2">2D </label>
      </div>

      <div class="icheck-primary d-inline film-type">
        <input type="checkbox" id="checkboxPrimary3" v-model="types" value="imax" @change="change"/>
        <label for="checkboxPrimary3">IMAX </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
    },
    text: String
  },
  data() {
    return {
      types: this.value
    }
  },
  methods: {
    change() {
      this.$emit('change', this.types)
    }
  },
  watch: {
    value() {
      this.types = this.value
    }
  }
};
</script>

<style scoped>
.film-type-wrap {
  display: flex;
}

.film-type {
  margin-right: 30px;
}
</style>