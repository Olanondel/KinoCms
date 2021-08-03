<template>
  <div class="float-r">
    <button type="button" class="btn btn-primary"><i class="fa fa-plus" aria-hidden="true"></i> {{text}}</button>
  </div>
</template>

<script>
export default {
  name: "PlusButton",
  props: { text: String }
}
</script>

<style scoped>
.float-r {
  display: flex;
  justify-content: flex-end;
}
</style>