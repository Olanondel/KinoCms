<template>
  <div class="schedule-checkbox">
    <div class="schedule-text">Показывать только:</div>
    <div class="form-group schedule-checkbox-list">

      <div
        class="form-check"
        v-for="type of films"
        :key="type"
      >
        <input v-model="model" :value="type" class="form-check-input" type="checkbox">
        <label class="form-check-label">{{ type }}</label>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "ScheduleCheckbox",
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Array
  },
  data() {
    return {
      films: ['3D', 'IMAX', '2D'],
    }
  },
  computed: {
    model: {
      get() {
        return this.checked
      },
      set(newValue) {
        this.$emit('change', newValue)
      }
    }
  }
}
</script>

<style scoped>
.schedule-checkbox {
  display: flex;
}

.schedule-text {
  margin-right: 15px;
}

.schedule-checkbox-list {
  display: flex;
}

.schedule-checkbox-list *:not(:last-child) {
  margin-right: 15px;
}
</style>