<template>
  <div class="radio_flex general__margin">
    <label class="radio_text">Выбрать пользователей кому слать: </label>

    <div class="radio_buttons">
      <div class="icheck-primary d-inline">
        <input
            type="radio"
            :id="'radio' + id1"
            :name="'radio_' + name"
            :value="value1"
            @change="$emit('change', $event.target.value)"
        >
        <label :for="'radio' + id1">{{text1}}</label>
      </div>

      <div class="icheck-primary d-inline">
        <input
            type="radio"
            :id="'radio' + id2"
            :name="'radio_' + name"
            :value="value2"
            @change="$emit('change', $event.target.value)"
        >
        <label :for="'radio' + id2">{{text2}}</label>
      </div>
    </div>

    <router-link :to="{name: to, params: { mode: from }}">
      <button type="button" class="btn btn-secondary btn-xs">Выбрать пользователей</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "RadioWithButtonAndText",
  props: {
    id1: String,
    id2: String,
    text1: String,
    text2: String,
    value1: String,
    value2: String,
    name: String,
    to: String,
    from: String
  }
}
</script>

<style scoped>
.radio_flex {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  flex-wrap: wrap;
}

.radio_buttons {
  display: flex;
  justify-content: space-between;
  gap: 40px;
}
</style>