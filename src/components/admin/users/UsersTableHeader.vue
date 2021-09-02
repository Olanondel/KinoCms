<template>
  <thead>
  <tr role="row">
    <th v-if="checkMode"></th>
    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
        aria-label="Rendering engine: activate to sort column ascending">ID
    </th>
    <th class="sorting sorting_desc" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
        aria-label="Browser: activate to sort column ascending" aria-sort="descending">Дата Регистрации
    </th>
    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
        aria-label="Platform(s): activate to sort column ascending">День рождения
    </th>
    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
        aria-label="Engine version: activate to sort column ascending">Email
    </th>
    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
        aria-label="CSS grade: activate to sort column ascending">Телефон
    </th>

    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
        aria-label="CSS grade: activate to sort column ascending">ФИО
    </th>
    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
        aria-label="CSS grade: activate to sort column ascending">Псевдоним
    </th>
    <th class="sorting" tabindex="0" aria-controls="example2" rowspan="1" colspan="1"
        aria-label="CSS grade: activate to sort column ascending">Город
    </th>
    <th v-if="!checkMode"></th>
  </tr>
  </thead>
</template>

<script>
export default {
  name: "UsersTableHeader",
  props: {
    checkMode: Boolean
  }
}
</script>

<style scoped>

</style>