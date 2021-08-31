<template>
  <div class="switcher">
    <span class="switcher-text">{{ stateText }}</span>

    <input
        type="checkbox"
        name="my-checkbox"
        data-on-color="success"
        data-off-color="danger"
        checked
        :isChecked="isChecked"
        @change="$emit('change', $event.target.checked)"
    >
  </div>
</template>

<script>
export default {
  name: "SwitcherWithText",
  model: {
    prop: 'isChecked',
    event: 'change'
  },
  props: {
    isChecked: Boolean,
    stateText: String
  },
  data() {
    return {

    }
  },
  methods: {
    changeState(e) {
      this.$emit('changeState', e.target.checked)
    },
    switcherInit() {
      /* eslint-env jquery */

      let switcherState = $("[name='my-checkbox']")
      switcherState.bootstrapSwitch('state', this.isChecked);

      switcherState.on('switchChange.bootstrapSwitch', function () {
        $(this)[0].dispatchEvent(new Event("change"))
      })
    },
  },
  mounted() {
    this.switcherInit()
  }
}
</script>

<style scoped>
.switcher {
  display: inline-block;
}

.switcher-text {
  margin-right: 15px;
}
</style>