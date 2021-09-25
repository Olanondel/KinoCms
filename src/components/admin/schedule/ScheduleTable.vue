<template>
  <div class="mt-3 mb-5">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <div class="d-flex justify-content-between">
              <input type="date" class="form-control" v-model="dayDate" @input="changeDate" style="max-width: 160px">

              <button :disabled="isRemoveFetching" @click="removeDay" class="btn btn-danger">Удалить</button>
            </div>

          </div>
          <!-- /.card-header -->
          <div class="card-body table-responsive p-0">
            <table class="table table-hover text-nowrap">
              <thead>
              <tr>
                <th style="width: 200px">ВРЕМЯ</th>
                <th>ФИЛЬМ</th>
                <th style="width: 140px">Кинотеатр</th>
                <th style="width: 140px">ЗАЛ</th>
                <th style="width: 140px">ЦЕНА В ГРН</th>
              </tr>
              </thead>
              <tbody>
              <ScheduleTableItem
                v-for="(item, index) in sortForTime('time', scheduleList)"
                :key="index"
                :index="index"
                :params=item
                @inputData="inputData"
                :films="films"
                :cinemas="cinemas"
              />
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->
      </div>
    </div>

    <div class="row">
      <button @click="addFilm" class="btn btn-block btn-secondary btn-xs">
        Добавить фильм
      </button>
    </div>
  </div>
</template>

<script>
import ScheduleTableItem from "./ScheduleTableItem";

export default {
  name: "ScheduleTable",
  components: {ScheduleTableItem},
  props: {
    scheduleList: {
      type: Array,
      default: () => []
    },
    index: Number,
    films: Array,
    cinemas: Array,
    date: String,
    isRemoveFetching: Boolean
  },
  data() {
    return {
      dayDate: this.date
    }
  },
  methods: {
    addFilm() {
      this.$emit('addFilm', this.index)
    },
    inputData(payload, index) {
      this.$emit('inputData', payload, index, this.index)
    },
    changeDate() {
      this.$emit('changeDate', this.dayDate, this.index)
    },
    removeDay() {
      this.$emit('removeDay', this.index)
    },
    sortForTime(prop, arr) {

      let copy = [...arr]

      return copy.sort(function (a, b) {

        if (a[prop] < b[prop]) {
          return -1;
        } else if (a[prop] > b[prop]) {
          return 1;
        } else {
          return 0;
        }
      });
    },
  }
}
</script>

<style scoped>

</style>