<template>
  <div class="content-wrapper">
    <PreloaderColor v-if="loading"/>

    <template v-else>

      <div class="mb-5">
        <img class="img-fluid top-banner" :src="require('@/assets/image/contacts.jpg')" alt="">
      </div>

      <div class="container">
        <div class="content-wrapper">
          <!-- Content Header (Page header) -->
          <section class="content-header">
            <div class="container-fluid">
              <div class="row mb-2">
                <div class="col-sm-6">
                  <h1>Контакты</h1>
                </div>
                <div class="col-sm-6">
                </div>
              </div>
            </div><!-- /.container-fluid -->
          </section>

          <!-- Main content -->
          <section
            class="content mb-5"
            v-for="item in contacts"
            :key="item.id"
          >
            <div class="container">
              <div class="row">
                <div class="col-5">

                  <!-- Profile Image -->
                  <div class="card card-primary card-outline">
                    <div class="card-body box-profile">
                      <div class="text-center">
                        <img class="img-fluid img-thumbnail" :src="item.logoImage" alt="User profile picture">
                      </div>

                      <ul class="list-group list-group-unbordered mb-3">
                        <li class="list-group-item">
                          <b>Followers</b> <a class="float-right">1,322</a>
                        </li>
                      </ul>
                    </div>
                    <!-- /.card-body -->
                  </div>
                  <!-- /.card -->

                  <!-- About Me Box -->

                  <!-- /.card -->
                </div>
                <!-- /.col -->
                <div class="col-7">
                  <div class="card">
                    <div class="card-header p-2">
                      <h2 class="font-weight-bold">{{item.title}}</h2>

                      <p class="font-weight-bold">
                        {{item.address}}
                      </p>

                      <img class="img-thumbnail img-fluid" src="@/assets/image/gmaps.jpg" alt="">
                    </div><!-- /.card-header -->
                    <div class="card-body">

                      <!-- /.tab-content -->
                    </div><!-- /.card-body -->
                  </div>
                  <!-- /.nav-tabs-custom -->
                </div>
                <!-- /.col -->
              </div>
              <!-- /.row -->
            </div><!-- /.container-fluid -->
          </section>
          <!-- /.content -->
        </div>
      </div>

    </template>

  </div>
</template>

<script>
import PreloaderColor from "../../components/site/preloader/Preloader-color";
import server from '../../requests/admin/pages/contacts'
import {mapGetters} from "vuex";

export default {
  name: "SiteContacts",
  components: {PreloaderColor},
  data() {
    return {
      loading: false,
      contacts: []
    }
  },
  methods: {
    async getContacts() {
      let data = await server.getData(this.currentLang)

      if (data[1].docs && data[1].docs.length) {
        data[1].docs.forEach(el => {
          this.contacts.push(el.data())
        })
      }
    }
  },
  computed: {
    ...mapGetters(['currentLang'])
  },
  mounted() {
    this.getContacts()
  }
}
</script>

<style scoped>

</style>