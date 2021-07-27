<template>
  <div class="table-wrap general__margin">
    <div class="card hall-list">
      <div class="card-header">
        <h3 class="card-title">Список залов</h3>
      </div>
      <!-- /.card-header -->
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th style="width: 10px">#</th>
            <th>Название</th>
            <th>Дата создания</th>
            <th style="width: 100px"></th>
          </tr>
          </thead>
          <tbody>

          <HallListTableRow
              :id="id"
          />

          </tbody>
        </table>
      </div>
      <!-- /.card-body -->
      <div class="card-footer clearfix" v-show="false">
        <ul class="pagination pagination-sm m-0 float-right">
          <li class="page-item"><a class="page-link" href="#">«</a></li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">»</a></li>
        </ul>
      </div>
    </div>
    <div class="add-hall-wrap">
      <router-link :to="{name: 'hallEdit', params: { id: id }}" class="btn btn-primary add-hall"><i
          class="fa fa-plus"></i>Создать Зал
      </router-link>
    </div>
  </div>
</template>

<script>
import HallListTableRow from "./HallListTableRow";

export default {
  name: "HallList",
  props: {
    id: {
      type: String,
      default: 'addCinema'
    }
  },
  components: {HallListTableRow},
  data() {
    return {}
  }
}
</script>

<style scoped>
.table-wrap {
  margin-left: 135px;
}

.add-hall-wrap {
  text-align: center;
}
</style>