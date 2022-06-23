<template>
    <v-container class="ma-0 pa-0" fill-height>

        <v-row no-gutters>
            <v-col md="3" lg="4" class="demo-tweets-sidebar" >
              <v-row no-gutters class="new-predictions pt-2" v-if="!preTask">
                <tweets-demo-container mode="newlyUpdated" class="pr-6"></tweets-demo-container>
              </v-row>

              <v-row v-if="revealProceed" no-gutters justify="center" :class="{'full-height': preTask}">
                <v-col cols="12" align-self="center"> 
                  <v-btn tile outlined @click="submitPreTask" :disabled="proceedBtnDisabled">Proceed to the Task</v-btn>
                </v-col>
              </v-row>

            </v-col>

            <v-col md="9" lg="8" class="pt-6" >
              <tweets-container @readyToProceed="enableProceed" ></tweets-container>
            </v-col>
        </v-row>
        
    </v-container>  

</template>
<script>
import tweetsContainer from '@/components/TweetsContainer.vue'
import tweetsDemoContainer from '@/components/TweetsDemoContainer.vue'
import { mapState, mapActions } from 'vuex'

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
      preTaskTweetAssessments: null
    }
  },
  computed: {

    ...mapState('feed', [
        'preTask'
    ])
  },
  methods: {

    enableProceed: function(data) {
      if (this.preTask)
        this.preTaskTweetAssessments = data;
      
      this.revealProceed = true;
    },

    submitPreTask: function() {

      this.proceedBtnDisabled = true;
      this.proceedToMainTask(this.preTaskTweetAssessments)
      .then(() => {
        this.$router.push({ name: 'waitingPage' })
      })
    },
    ...mapActions('feed', [
      'proceedToMainTask'
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

.demo-tweets-sidebar {

}

.full-height {
  height: 85vh;
}

</style>