<template>
  <v-container>

    <!-- <custom-toolbar></custom-toolbar> -->

    <v-row justify="center" align="center" fill-height class="mt-12 full-height">
      <v-col xs="10" sm="8" md="6" lg="4" align-self="center">
        <v-alert v-model="alert" :type="type">
          {{alertMessage}}
        </v-alert>

        <v-form ref="signupForm" lazy-validation>
          <v-card>
            <v-container fluid>
              <v-row justify="center">
                <v-card-title primary-title>
                  <h3 class="headline">Sign up for an account</h3>
                </v-card-title>
              </v-row>

              <v-row no-gutters>
                <v-text-field v-model="user.email" type="email" label="Email"
                  tabindex="4" required :rules="formRules.emailRules">
                </v-text-field>
              </v-row>

              <v-row no-gutters>
                <v-text-field v-model="user.password" type="password" label="Password"
                  tabindex="5" required :rules="formRules.passwordRules">
                </v-text-field>
              </v-row>

              <v-row no-gutters>
                <v-text-field v-model="match" type="password" label="Type password again"
                  tabindex="6" required>
                </v-text-field>
              </v-row>


            </v-container>

            <v-row no-gutters justify="center">
              <v-card-actions class="mb-2">
                <v-btn tabindex="7" depressed color="primary" @click="signup" :disabled="buttonDisabled">
                  Signup</v-btn>
              </v-card-actions>
            </v-row>

            <v-divider></v-divider>

            <v-row no-gutters justify="center">
              <v-card-title primary-title>
                <h3 class="headline">Or Log in</h3>
              </v-card-title>
            </v-row>

            <v-row no-gutters justify="center">
              <v-card-actions>
                <v-btn tabindex="8" depressed @click="goToLogin">Go to login</v-btn>
              </v-card-actions>
            </v-row>

          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
// import customToolbar from '@/components/CustomToolbar'
import consts from '@/services/constants'
export default {
  name: 'signup-view',
  components: {
    // 'custom-toolbar': customToolbar
  },
  props: {
    mode: {
      required: false
    }
  },
  data(){
    return {
      user: {
        email: "",
        password : "",
        // type: 'info'
      },
      match: "",
      formRules: {
        emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [
          v => (!!v && v) === this.match ||
             'Values do not match'
        ]
      },
      alert: false,
      alertMessage: '',
      type: 'info',
      buttonDisabled: false
    }
  },
  computed: {
     siteName: function() {
      return consts.SITE_NAME;
    }
  },
  methods: {
    signup: function() {
      if (this.$refs.signupForm.validate()) {
        let data = this.user;
        if (this.mode)
          data.specialGroup = this.mode;
        this.$store.dispatch('auth/signup', data)
        .then(response => {
          this.type = 'info';
          this.alertMessage = response.data.message;
          this.alert = true;
          this.buttonDisabled = true;
        })
        .catch(err => {
          this.alertMessage = err.response.data.message;
          this.type = 'error';
          this.alert = true;
        })
      }
    },
    goToLogin: function() {
      this.$router.push({ name: 'login' });
    },
    validateField () {
        this.$refs.signupForm.validate()
    }
  },
  watch: {
    match: 'validateField'
  }
}
</script>