<template>
  <div class="login-box">
    <!-- /.login-logo -->
    <div class="card card-outline card-primary">
      <div class="card-header text-center">
        <router-link class="h1" :to="{name: 'statistic'}"><b>Kino</b>CMS</router-link>
      </div>
      <div class="card-body">
        <p class="login-box-msg">Sign in to start your session</p>

        <form>
          <div class="input-group mb-3">
            <input v-model="email" type="email" class="form-control" placeholder="Email">
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-envelope"></span>
              </div>
            </div>
          </div>
          <div class="input-group mb-3">
            <input v-model="password" type="password" class="form-control" placeholder="Password">
            <div class="input-group-append">
              <div class="input-group-text">
                <span class="fas fa-lock"></span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-8">
              <div class="icheck-primary">
                <input v-model="rememberMe" type="checkbox" id="remember">
                <label for="remember">
                  Remember Me
                </label>
              </div>
            </div>
            <!-- /.col -->
            <div class="col-4">
              <button @click.prevent="loginWithRedirect" class="btn btn-primary btn-block">Sign In</button>
            </div>
            <!-- /.col -->
          </div>
        </form>

        <p class="mb-1">
          <router-link to="">I forgot my password</router-link>
        </p>
        <p class="mb-0">
          <router-link :to="{name: 'register'}" class="text-center">Register a new membership</router-link>
        </p>
      </div>
      <!-- /.card-body -->
    </div>
    <!-- /.card -->
  </div>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "Login",
  data() {
    return {
      email: 'prbaoleg@gmail.com',
      password: 'zfvnmmn',
      rememberMe: false
    }
  },
  methods: {
    ...mapActions(['login']),
    async loginWithRedirect() {
      try {
        await this.login({email: this.email, password: this.password})

        await this.$router.push({name: 'statistic'})
      } catch (e) { console.log(e) }
    }
  },
  mounted() {
    document.body.classList.add('login-page')
  },
  beforeDestroy() {
    document.body.classList.remove('login-page')
  }
}
</script>

<style scoped>
.register {
  max-width: 600px;
  text-align: center;
  margin: 0 auto;
}
</style>