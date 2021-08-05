<template>
  <div class="float-r general__margin">
    <router-link
        :to="{name: 'newsEdit', params: { id: 'addNews' }}"
        type="button"
        class="btn btn-primary"><i
        class="fa fa-plus"
        aria-hidden="true"></i> {{text}}</router-link>
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