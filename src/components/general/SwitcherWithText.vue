<template>
  <div class="switcher">
    <span class="switcher-text">{{ stateText }}</span>

    <input
        type="checkbox"
        name="my-checkbox"
        data-on-color="success"
        data-off-color="danger"
        checked
        :isChecked="isCheck"
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
    isCheck: Boolean,
    stateText: String
  },
  data() {
    return {
    }
  },
  methods: {
    changeState(e) {
      console.log('be changed')

      this.$emit('changeState', e.target.checked)
    },
    switcherInit() {
      /* eslint-env jquery */

      $("[name='my-checkbox']").bootstrapSwitch('state', $(this).prop('checked'));

      $('input[name="my-checkbox"]').on('switchChange.bootstrapSwitch', function () {
        $(this)[0].dispatchEvent(new Event("change"))
      })
    },
  },
  watch: {

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