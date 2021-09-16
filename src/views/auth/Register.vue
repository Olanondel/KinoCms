<template>
  <section class="register">
    <div class="register-box">
      <div class="card card-outline card-primary">
        <div class="card-header text-center">
          <router-link class="h1" :to="{name: 'statistic'}"><b>Kino</b>CMS</router-link>
        </div>
        <div class="card-body">
          <p class="login-box-msg">Register a new membership</p>

          <form>
            <div class="input-group mb-3">
              <input required v-model="firstName" type="text" class="form-control" placeholder="First Name">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-user"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input required v-model="lastName" type="text" class="form-control" placeholder="Last Name">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-user"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input required v-model="email" type="email" class="form-control" placeholder="Email">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input required v-model="password" type="password" class="form-control" placeholder="Password">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input required v-model="confirmPassword" type="password" class="form-control"
                     placeholder="Retype password">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-8">
                <div class="icheck-primary">
                  <input required v-model="termsAgree" type="checkbox" id="agreeTerms" name="terms" value="agree">
                  <label for="agreeTerms">
                    I agree to the terms
                  </label>
                </div>
              </div>
              <!-- /.col -->
              <div class="col-4">
                <button @click.prevent="registerWithRedirect" class="btn btn-primary btn-block">Register</button>
              </div>
              <!-- /.col -->
            </div>
          </form>

          <hr>

          <router-link :to="{name: 'login'}" class="text-center">I already have a membership</router-link>
        </div>
        <!-- /.form-box -->
      </div><!-- /.card -->
    </div>
  </section>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "Register",
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAgree: false,
    }
  },
  methods: {
    ...mapActions(['register']),
    async registerWithRedirect() {
      if (this.allFields) {
        await this.register({email: this.email, password: this.password, firstName: this.firstName, lastName: this.lastName})

        this.$router.push('/')
      } else if (this.password === this.confirmPassword && this.termsAgree && !(this.fullName.split(' ').length === 2)) {
        alert('Полное имя должно состоять из 2-х слов!')
      } else if (this.password === this.confirmPassword && !this.termsAgree) {
        alert('Вы должны принять условия использования!')
      } else {
        alert('Пароли не совпадают!')
      }
    }
  },
  computed: {
    allFields() {
      return (
          this.firstName &&
          this.lastName &&
          this.password.length &&
          this.password === this.confirmPassword &&
          this.termsAgree
      )
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