<template>
  <tr>
    <td>{{index+1}}</td>
    <td>{{hall.hallNumber}}</td>
    <td>
      <time :datetime="hall.date">{{hall.date}}</time>
    </td>
    <td class="btns">
      <router-link :to="{name: 'hallEdit', params: { id: 'id', index }}"><i class="fa fa-edit"></i></router-link>
      <a @click.prevent="remove" href=""><i class="fa fa-trash-alt"></i></a>
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
    },
    hall: {
      type: Object
    },
    index: Number
  },
  methods: {
    remove() {
      this.$emit('remove', this.index)
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