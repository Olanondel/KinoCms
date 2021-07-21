<template>
  <div class="film-type-wrap general__margin">
    <label for="" class="general__text">Тип кино</label>
    <div class="film__types">
      <div class="icheck-primary d-inline film-type">
        <input type="checkbox" id="checkboxPrimary1" v-model="data" value="3d" @change="change" />
        <label for="checkboxPrimary1">3D </label>
      </div>

      <div class="icheck-primary d-inline film-type">
        <input type="checkbox" id="checkboxPrimary2" v-model="data" value="2d" @change="change" />
        <label for="checkboxPrimary2">2D </label>
      </div>

      <div class="icheck-primary d-inline film-type">
        <input type="checkbox" id="checkboxPrimary3" v-model="data" value="imax" @change="change" />
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
      default: () => []
    }
  },
  data() {
    return {
      data: this.value
    }
  },
  methods: {
    change() {
      this.$emit('change', this.data)
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