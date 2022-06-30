<template>
    <v-container class="ma-0 pa-0" fill-height fluid>

        <!-- <v-row no-gutters class="> -->
            <v-col md="3" lg="2" class="demo-tweets-sidebar" >
              <v-row no-gutters class="new-predictions pt-2" v-if="stage > 1">
                <tweets-demo-container mode="newlyUpdated" class="pr-6"></tweets-demo-container>
              </v-row>

              <v-row v-if="revealProceed" no-gutters justify="center" :class="{'full-height': stage < 2}">
                <v-col cols="12" align-self="center">
                  <v-row justify="center">
                    <v-btn tile outlined @click="submitTask" :disabled="proceedBtnDisabled" class="ml-2">{{proceedBtnText}}</v-btn>
                  </v-row>
                </v-col>
              </v-row>

            </v-col>

            <v-col md="9" lg="10" class="pt-6" >
              <tweets-container @readyToProceed="enableProceed" ></tweets-container>
            </v-col>
        <!-- </v-row> -->
        
    </v-container>  

</template>
<script>
import tweetsContainer from '@/components/TweetsContainer.vue'
import tweetsDemoContainer from '@/components/TweetsDemoContainer.vue'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'feed-view',
  components: {
    'tweets-container': tweetsContainer,
    'tweets-demo-container': tweetsDemoContainer
  },
  data() {
    return {
      revealProceed: false,
      proceedBtnDisabled: false,
    }
  },
  computed: {

    proceedBtnText: function() {

      if (this.stage == 0) {
        return 'Proceed to the Task';
      }
      else {
        if (this.stage == 1)
          return 'Proceed';
        else if (this.stage == 2)
          return 'All looks good!';
      }
    },
    ...mapGetters('auth', [
      'user',
      'stage'

    ])
  },
  methods: {

    enableProceed: function() {
      this.revealProceed = true;
    },

    submitTask: function() {
      this.updateUserCondition()
      .then(() => {
        this.$router.push({ name: 'waitingPage' });
      })
    },
    ...mapActions('auth', [
      'updateUserCondition'
    ])
  }
}
</script>

<style scoped>
.new-predictions {
  height: 85vh;
  border-right: 1px #CFD8DC solid;
  border-bottom: 1px #CFD8DC solid;
  overflow: scroll;
}

.full-height {
  height: 85vh;
}

</style>