<template>
  <tr>
    <td>{{title}}</td>
    <td>{{date}}</td>
    <td>{{status}}</td>
    <td class="btns">
      <router-link :to="{name: 'newsEdit'}"><i class="fa fa-edit"></i></router-link>
      <a @click.prevent="remove" href=""><i class="fa fa-trash-alt"></i></a>
    </td>
  </tr>
</template>

<script>
export default {
  name: "TableRow",
  props: {
    title: String,
    date: String,
    status: String
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