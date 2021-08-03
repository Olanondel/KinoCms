<template>
  <div class="lang-tabs">
    <slot />
    <div class="icheck-success d-inline">
      <input @change="change" type="radio" name="r3" id="radioSuccess1" value="ru" v-model="picked" />
      <label for="radioSuccess1">Русский</label>
    </div>

    <div class="icheck-success d-inline">
      <input @change="change(value)" type="radio" name="r3" id="radioSuccess2" value="ua" v-model="picked" />
      <label for="radioSuccess2">Українська</label>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentLang: {
      type: String,
      default: 'ru'
    }
  },
  data() {
      return {
        picked: this.currentLang
      }
    },
  methods: {
    change() {
      this.$emit('changeLang', this.picked)
    }
  }
};
</script>

<style scoped>
.lang-tabs {
  display: flex;
  justify-content: flex-end;
  gap: 30px;
  margin: 0 30% 30px 0;
  align-items: center;
}
</style>