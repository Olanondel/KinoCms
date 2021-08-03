<template>
  <div class="switcher">
    <span class="switcher-text">{{stateText}}</span>
    <input
        type="checkbox"
        checked data-toggle="toggle"
        data-onstyle="outline-success"
        data-offstyle="outline-danger"
        :isCheck="checked"
        @change="$emit('change', $event.target.checked)"
    >
  </div>
</template>

<script>
export default {
  name: "SwitcherWithText",
  model: {
    prop: 'isCheck',
    event: 'change'
  },
  props: {
    checked: Boolean,
    stateText: String
  },
  computed: {
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