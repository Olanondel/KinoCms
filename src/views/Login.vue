<template>
  <section class="register">
    <div class="card card-info">
      <div class="card-header">
        <h3 class="card-title">Login</h3>
      </div>
      <!-- /.card-header -->
      <!-- form start -->
      <form class="form-horizontal">
        <div class="card-body">
          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-10">
              <input
                  type="email"
                  class="form-control"
                  id="inputEmail3"
                  placeholder="Email"
                  v-model="email"
              >
            </div>
          </div>
          <div class="form-group row">
            <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-10">
              <input
                  type="password"
                  class="form-control"
                  id="inputPassword3"
                  placeholder="Password"
                  v-model="password"
              >
            </div>
          </div>
        </div>
        <!-- /.card-body -->
        <div class="card-footer">
          <button
              type="submit"
              class="btn btn-info"
              @click.prevent="loginWithRedirect({email, password})"
              @keypress.enter="loginWithRedirect({email, password})"
          >
            Login
          </button>
        </div>
        <!-- /.card-footer -->
      </form>
    </div>
  </section>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    ...mapActions(['login']),
    async loginWithRedirect() {
      await this.login({email: this.email, password: this.password})

      await this.$router.push({name: 'statistic'})
    }
  },
  mounted() {
  },
}
</script>

<style scoped>
.register {
  max-width: 600px;
  text-align: center;
  margin: 0 auto;
}
</style>