<template>
  <div class="general__margin select-with-text">
    <label class="general__text">{{ text }}</label>

    <select
        class="custom-select select-content"
        :value="state"
        @change="$emit('change', $event.target.value)"
    >
      <option selected disabled value="">Выберите {{ text }}</option>
      <option>Киев</option>
      <option>Одеса</option>
      <option>Николаев</option>
      <option>Умань</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "SelectWithText",
  model: {
    prop: 'state',
    event: 'change'
  },
  props: {
    text: String,
    state: {
      type: String,
    }
  },
}
</script>

<style scoped>
.select-with-text {
  display: flex;
  align-items: center;
}

.select-content {
  max-width: 280px;
  width: 280px;
}
</style>