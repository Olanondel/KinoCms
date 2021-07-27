<template>
  <tr>
    <td>1.</td>
    <td>1 Зал</td>
    <td>
      <time datetime="24-07-2021">24.07.2021</time>
    </td>
    <td class="btns">
      <router-link :to="{name: 'hallEdit', params: { id: id }}"><i class="fa fa-edit"></i></router-link>
      <a @click="remove" href=""><i class="fa fa-trash-alt"></i></a>
    </td>
  </tr>
</template>

<script>
export default {
  name: "HallListTableRow",
  props: {
    id: {
      type: String,
      default: 'addCinema'
    }
  },
  methods: {
    remove() {
      this.$emit('remove')
    }
  }
}
</script>

<style scoped>
.btns {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>