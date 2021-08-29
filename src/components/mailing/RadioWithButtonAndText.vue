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

    <router-link :to="{name: to, params: { mode: checkMode, type: from, messageText }}">
      <button type="button" class="btn btn-warning btn-xs">Выбрать пользователей</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "RadioWithButtonAndText",
  props: {
    messageText: {
      type: String,
      default: ''
    },
    id1: String,
    id2: String,
    text1: {
      type: String,
      default: 'Все пользователи'
    },
    text2: {
      type: String,
      default: 'Выборочно'
    },
    value1: {
      type: String,
      default: 'all'
    },
    value2: {
      type: String,
      default: 'selective'
    },
    name: String,
    to: {
      type: String,
      default: 'users'
    },
    checkMode: {
      type: Boolean,
      default: false
    },
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