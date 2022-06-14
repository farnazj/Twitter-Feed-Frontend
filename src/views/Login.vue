<template>
  <v-container fluid class="px-0">
    <!-- <custom-toolbar></custom-toolbar> -->

    <v-row class="pt-8 full-height-login" justify="center" align="center" no-gutters fill-height >

      <v-col cols="12" sm="8" md="6" lg="6">
        <v-alert v-model="alert" type="error">
          {{alertMessage}}
        </v-alert>

        <v-row no-gutters justify="center" align="center" >
          <v-col md="9" xs="10" :class="{ 'mt-7': $vuetify.breakpoint.smAndDown, 'mb-3': $vuetify.breakpoint.smAndDown} ">
             <v-form>
          <v-card>
            <v-container fluid>
              <v-row justify="center" no-gutters>
                <v-card-title primary-title >
                  <h3 class="headline">Log into your account</h3>
                </v-card-title>
              </v-row>

              <v-row no-gutters>
                <v-text-field v-model="email" tabindex="1"
                  label="Email" @keyup.enter="login" required>
                </v-text-field>
              </v-row>

              <v-row no-gutters>
                <v-text-field v-model="password" type="password" tabindex="2"
                  label="Password" @keyup.enter="login" required>
                </v-text-field>
              </v-row>

              <!-- <v-row no-gutters>
                <a @click.prevent="goToPasswordReset">Forgot your password?</a>
              </v-row> -->

            </v-container>

            <v-row justify="center" no-gutters>
              <v-card-actions class="mb-2">
                <v-btn tabindex="3" depressed color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-row>

            <v-divider ></v-divider>
            <v-row justify="center" no-gutters>
              <v-card-title primary-title>
                <h3 class="headline">Or sign up</h3>
              </v-card-title>
            </v-row>

            <v-row justify="center" no-gutters>
              <v-card-actions>
                <v-btn tabindex="4" depressed @click="goToSignup">Go to signup</v-btn>
              </v-card-actions>
            </v-row>

          </v-card>
        </v-form>
          </v-col>
        </v-row>

       
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
// import customToolbar from '@/components/CustomToolbar'
export default {
  name: 'login-view',
  components: {
    // 'custom-toolbar': customToolbar
  },
  data(){
    return {
      email : "",
      password : "",
      alert: false,
      alertMessage: ''
    }
  },
  methods: {
   login: function() {
     let email = this.email;
     let password = this.password;
     this.$store.dispatch('auth/login',
      {
        'email': email,
        'password': password
      })
      .then(() => {
        this.$router.push('/');
      })
      .catch(err => {
        this.alertMessage = err.response.data.message;
        this.alert = true;
      })
    },
    goToSignup: function() {
      this.$router.push({ name: 'signup' });
    },
    // goToPasswordReset: function() {
    //   this.$router.push({ name: 'forgotPassword' });
    // }
  }
}
</script>
<style scoped>
.intro-container {
  color: #ECEFF1;
}
.custom-list-item {
  list-style-type: none;
}
.intro-text {
  line-height: 1.9rem !important;
}
.full-height-login {
  height: 97vh;
}
</style>