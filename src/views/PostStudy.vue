<template>
    <v-container class="pa-4">
      <v-row no-gutters justify="center">
          <v-col cols="12" lg="8" align-self="center">
            <p class="body-1 pt-8">
                The next stage of the study involves you filling out a survey on your experience using the system and your personalized AI. Please fill it out now 
                <a :href="constructedLink" target="_blank">here</a>
            </p>
        </v-col>
        </v-row>
    </v-container>
</template>

<script>
import userServices from '@/services/userServices'
import constants from '@/services/constants'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'post-study-view',
  components: {
  },
  data() {
    return {
      mturkCode: ''
    }
  },
  created() {

    userServices.getUserMTurkCode()
    .then((resp) => {
      this.mturkCode = resp.data.code;
      this.logout();
    })
  },
  computed: {
    shownLink: function() {
      return constants.QUALTRICKS_LINK;
    },
    constructedLink: function() {
      return `${constants.QUALTRICKS_LINK}?id=${this.user.id}&q=${this.mturkCode}`;
    },
    ...mapGetters('auth', [
      'user'
    ]),
  },
  methods: {
    ...mapActions('auth', [
      'logout'
    ])
  }
}
</script>