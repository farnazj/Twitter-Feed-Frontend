<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
//import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
    }
  },
  created() {
    if (this.isLoggedIn) {
      this.establishConnection();
    }
  },
  computed : {
    isLoggedIn : function() {
      return this.$store.getters['auth/isLoggedIn'];
    }
  },
  methods: {
    ...mapActions('websocket', [
      'establishConnection'
    ]),
  
    logout: function () {
      this.$store.dispatch['auth/logout']
      .then(() => {
        this.$router.push('/login');
      })
    }
  }
}
</script>