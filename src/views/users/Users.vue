<template>
  <Preloader v-if="!init"/>
  <div v-else>
    <h2 v-if="!users.length" style="text-align: center; margin: 20px 0">Список пользователей пуст</h2>

    <div class="card general__margin" v-else>
      <div class="card-header">
        <h3 class="card-title">Пользователи</h3>
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"><i class="fas fa-search"></i></span>
          </div>
          <input type="search" class="form-control" placeholder="Search" v-model="searchText">
        </div>
      </div>
      <!-- /.card-header -->
      <div class="card-body">


        <table id="example2" class="table table-bordered table-hover dataTable dtr-inline" role="grid"
               aria-describedby="example2_info">
          <UsersTableHeader :checkMode="checkMode"/>
          <tbody>
          <UsersTableRow
              v-for="(user, index) in filteredUsers"
              :key="user.id"
              :data="user"
              @remove="removeUser"
              :index="index"
              :checkMode="checkMode"
              @addTo="addToMailing"
              :contactType="contactType"
          />
          </tbody>
        </table>

        <div class="row" v-if="false">
          <div class="col-sm-12 col-md-5">
            <div class="dataTables_info" id="example2_info" role="status" aria-live="polite">Showing 1 to 10 of 57
              entries
            </div>
          </div>
          <div class="col-sm-12 col-md-7">
            <div class="dataTables_paginate paging_simple_numbers" id="example2_paginate">
              <ul class="pagination">
                <li class="paginate_button page-item previous disabled" id="example2_previous"><a href="#"
                                                                                                  aria-controls="example2"
                                                                                                  data-dt-idx="0"
                                                                                                  tabindex="0"
                                                                                                  class="page-link">Previous</a>
                </li>
                <li class="paginate_button page-item active"><a href="#" aria-controls="example2" data-dt-idx="1"
                                                                tabindex="0" class="page-link">1</a></li>
                <li class="paginate_button page-item "><a href="#" aria-controls="example2" data-dt-idx="2"
                                                          tabindex="0" class="page-link">2</a></li>
                <li class="paginate_button page-item "><a href="#" aria-controls="example2" data-dt-idx="3"
                                                          tabindex="0" class="page-link">3</a></li>
                <li class="paginate_button page-item "><a href="#" aria-controls="example2" data-dt-idx="4"
                                                          tabindex="0" class="page-link">4</a></li>
                <li class="paginate_button page-item "><a href="#" aria-controls="example2" data-dt-idx="5"
                                                          tabindex="0" class="page-link">5</a></li>
                <li class="paginate_button page-item "><a href="#" aria-controls="example2" data-dt-idx="6"
                                                          tabindex="0" class="page-link">6</a></li>
                <li class="paginate_button page-item next" id="example2_next"><a href="#" aria-controls="example2"
                                                                                 data-dt-idx="7" tabindex="0"
                                                                                 class="page-link">Next</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <SaveButton @saveEvent="startMailing" text="Отправить" v-if="checkMode"/>
    </div>
  </div>
</template>

<script>
import Preloader from "../../components/general/Preloader";
import UsersTableHeader from "../../components/users/UsersTableHeader";
import UsersTableRow from "../../components/users/UsersTableRow";
import server from '../../requests/requests'
import SaveButton from "../../components/general/SaveButton";

export default {
  components: {SaveButton, UsersTableRow, UsersTableHeader, Preloader},
  name: "users",
  data() {
    return {
      init: false,
      users: [],
      searchText: '',
      mailingList: {
        email: [],
        phone: []
      }
    }
  },
  computed: {
    filteredUsers() {
      return this.users.filter(el => {
        let arr = Object.values(el)

        return arr.some(this.includes)
      })
    },
    checkMode() {
      return this.$route.params.mode || null
    },
    contactType() {
      return this.$route.params.mode || null
    }
  },
  methods: {
    includes(el) {
      if (typeof (el) === "string") {
        if (el.toLowerCase().includes(this.searchText.toLowerCase())) {
          return true
        }
      }
    },
    async setData() {
      let users = await server.getData('Users')

      users.forEach(el => {
        this.users.push(el.data())
      })

      this.init = true
    },
    addToMailing(value, type) {
      console.log(value, type)
      this.mailingList[type].push(value)
    },
    async removeUser(id, index) {
      this.users[index].isFetching = true
      await server.removeElement(id, null, null, 'Users')
      this.users.splice(index, 1)
    },
    startMailing() {
      if (this.mailingList[this.contactType].length) {
        console.log('mails was sending')
      }
    }
  },
  mounted() {
    this.setData()
  }
}
</script>

<style scoped>
.table {
  max-width: 100%;
}

.card {
  overflow-x: auto;
}

.card-title {
  margin: 15px;
}

.input-group {
  max-width: 300px;
}
</style>