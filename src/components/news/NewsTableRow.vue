<template>
  <tr>
    <td>{{title}}</td>
    <td>{{date}}</td>
    <td>{{status}}</td>
    <td class="btns">
      <router-link :to="{name: 'newsEdit', params: { id }}"><i class="fa fa-edit"></i></router-link>
      <a v-if="!isFetching" @click.prevent="remove" href=""><i class="fa fa-trash-alt"></i></a>
      <a @click.prevent v-else href=""><i class="fas fa-ban"></i></a>
    </td>
  </tr>
</template>

<script>
export default {
  name: "TableRow",
  props: {
    title: String,
    date: String,
    status: String,
    id: String,
    index: Number,
    isFetching: Boolean
  },
  methods: {
    remove() {
      this.$emit('remove', this.id, this.index)
    }
  },
}
</script>

<style scoped>
.btns {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>