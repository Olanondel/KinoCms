<template>
  <div class="content-wrapper" style="min-height: 1416px;">
    <div class="content container">

      <PreloaderColor v-if="loading" />
      <!-- Content Header (Page header) -->
      <section class="content-header" v-else>
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1>Расписание</h1>
            </div>
            <div class="col-sm-6">

            </div>
          </div>
        </div><!-- /.container-fluid -->
      </section>

      <!-- Main content -->
      <section class="content">

        <!-- Default box -->
        <div class="card" v-for="card in schedule" :key="card[0]">
          <div class="card-header">
            <h3 class="card-title">{{card[0]}}</h3>

            <div class="card-tools">
              <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
          <div class="card-body p-0" style="display: none;">
            <table class="table table-striped projects">
              <thead>
              <tr>
                <th style="width: 8%">
                  ВРЕМЯ
                </th>
                <th style="width: 25%">
                  ФИЛЬМ
                </th>
                <th style="width: 8%">
                  ЗАЛ
                </th>
                <th style="width: 10% ;">
                  ЦЕНА В ГРН
                </th>
                <th style="width: 10%">
                  БРОНИРОВАТЬ
                </th>
                <th style="width: 40%">

                </th>
              </tr>
              </thead>
              <tbody>
              <ScheduleTableRow
                v-for="(item, index) in sort(card[1])"
                :key="index"
                :data="item"
                :date="card[0]"
              />
              </tbody>
            </table>
          </div>
          <!-- /.card-body -->
        </div>
        <!-- /.card -->

      </section>
      <!-- /.content -->
    </div>
  </div>
</template>

<script>
import server from "../../requests/admin/requests";
import {mapGetters} from "vuex";
import ScheduleTableRow from "../../components/site/schedule/ScheduleTableRow";
import PreloaderColor from "../../components/site/preloader/Preloader-color";

export default {
  name: "SiteSchedule",
  components: {PreloaderColor, ScheduleTableRow},
  data() {
    return {
      schedule: [],
      loading: true
    }
  },
  methods: {
    async getData() {
      let docs = await server.getData('Schedule', null, this.currentLang)

      if (docs) {
        docs.forEach(el => {
          this.schedule.push([el.id, el.data().data])
        })
      }

      this.loading = false
    },
    sortForTime(prop, arr) {

      return arr.sort(function (a, b) {

        if (a[prop] < b[prop]) {
          return -1;
        } else if (a[prop] > b[prop]) {
          return 1;
        } else {
          return 0;
        }
      });
    },
    sort(arr) {
      let copy = [...arr]

      this.sortForTime('time', copy)

      return copy
    }
  },
  computed: {
    ...mapGetters(['currentLang']),
  },
  mounted() {
    this.getData()
  }
}
</script>

<style scoped>

</style>