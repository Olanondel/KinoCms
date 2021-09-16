<template>
  <tr>
    <td v-if="checkMode">
      <div class="custom-control custom-checkbox">
        <input
            class="custom-control-input"
            @change="$emit('addTo', $event.target.value, contactType)"
            type="checkbox"
            :id="data.id"
            :value="data[contactType]"
        >
        <label :for="data.id" class="custom-control-label"></label>
      </div>
    </td>
    <td>{{ subId }}</td>
    <td>{{data.creationalDate}}</td>
    <td>{{data.dob}}</td>
    <td>{{data.email}}</td>
    <td>{{data.phone}}</td>
    <td>{{fullName}}</td>
    <td>{{data.nickname}}</td>
    <td>{{data.city}}</td>
    <td class="btns" v-if="!checkMode">
      <router-link :to="{name: 'userEdit', params: { id: data.id, index }}"><i class="fa fa-edit"></i></router-link>
      <a v-if="!data.isFetching" @click.prevent="$emit('remove', data.id, index)" href=""><i class="fa fa-trash-alt"></i></a>
      <a @click.prevent v-else href=""><i class="fas fa-ban"></i></a>

    </td>
  </tr>
</template>

<script>
export default {
  name: "UsersTableRow",
  props: {
    data: Object,
    index: Number,
    checkMode: Boolean,
    contactType: String
  },
  computed: {
    fullName() {
      return this.data.firstName + ' ' + this.data.lastName
    },
    subId() {
      return (this.data.id ? this.data.id.substr(0, 3) : '')
    }
  }
}
</script>

<style scoped>
.btns {
  display: flex;
  justify-content: center;
  gap: 6px;
}

td {
  text-overflow: ellipsis;
}

</style>