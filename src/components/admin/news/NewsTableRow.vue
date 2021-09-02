<template>
  <tr>
    <td>{{title}}</td>
    <td>{{date}}</td>
    <td>{{status}}</td>
    <td class="btns">
      <router-link :to="{name: to, params: { id }}"><i class="fa fa-edit"></i></router-link>
      <template v-if="!notDelete">
        <a v-if="!isFetching" @click.prevent="remove" href=""><i class="fa fa-trash-alt"></i></a>
        <a @click.prevent v-else href=""><i class="fas fa-ban"></i></a>
      </template>
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
    isFetching: Boolean,
    to: String,
    notDelete: {
      type: Boolean,
      default: false
    }
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