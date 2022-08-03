<template>
    <v-container class="ma-0 pa-0" fill-height fluid>

        <v-row no-gutters v-if="!waiting && !stopDisplay">
            <v-col md="3" lg="3" class="demo-tweets-sidebar" >
              <v-row no-gutters class="new-predictions pt-2" v-if="stage > 1 && newlyUpdatedTweetIds.length">
                <tweets-demo-container mode="newlyUpdated" class="pr-6"></tweets-demo-container>
              </v-row>

              <v-row  no-gutters justify="center" :class="{'full-height': stage < 2, 'mt-6': true}">
                <v-col cols="12" lg="6" md="8" align-self="center">
                  <!-- <v-row justify="center"> -->
                    <v-btn tile outlined @click="submitTask" :disabled="proceedBtnDisabled || !revealProceed" class="ml-2" color="indigo darken-4" large
                    >{{proceedBtnText}}</v-btn>
                  <!-- </v-row> -->
                </v-col>
              </v-row>

              <v-row no-gutters justify="center" class="mt-3">
                <p class="body-2 blue--text text--darken-4">{{portionText}}</p>
              </v-row>
              <v-row no-gutters justify="center">
                <p class="caption blue--text text--darken-4">{{rationaleText}}</p>
              </v-row>

            </v-col>

            <v-col md="9" lg="9" class="mt-6" >
              <tweets-container @readyToProceed="enableProceed" @tweetsAssessed="displayPortion"></tweets-container>
            </v-col>
        </v-row>
        
    </v-container>  

</template>
<script>
import tweetsContainer from '@/components/TweetsContainer.vue'
import tweetsDemoContainer from '@/components/TweetsDemoContainer.vue'
import constants from '@/services/constants'
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
      portionText: '',
      rationaleText: '',
      stopDisplay: false
    }
  },
  created() {

    this.getTweetCount()
    .then(() => {
      this.portionText = `You have assessed 0 of ${this.tweetCountForFeed} tweets`;
      this.rationaleText = `and provided reasoning for 0 tweets.`
    })
  },

  computed: {

    proceedBtnText: function() {

      if (this.stage == 0 || this.stage == 1 || this.experiment == constants.EXPERIMENT_2) 
        return 'Proceed';
      else
        return 'Proceed'; //'All looks good!';
      
    },
    ...mapGetters('auth', [
      'user',
      'stage'
    ]),
    ...mapState('feed', [
      'newlyUpdatedTweetIds',
      'waiting',
      'tweetCountForFeed'
    ])
  },
  methods: {

    displayPortion: function(countObj) {
      this.portionText = `You have assessed ${countObj.assessedCount} of ${this.tweetCountForFeed} tweets`;
      let pluralized = countObj.rationaleCount == 1 ? '' : 's'
      this.rationaleText = `and provided reasoning for ${countObj.rationaleCount} tweet${pluralized}.`
    },

    enableProceed: function() {
      this.revealProceed = true;
    },

    submitTask: function() {
      if (this.stage == 0 || this.stage == 1) {
        this.stopDisplay = true;
        this.updateUserCondition()
        .then(() => {
          this.$router.push({ name: 'waitingPage' });
        })
      }
      else {
        this.finishStudy()
        .then(() => {
          this.closeConnection()
          .then(() => {
            this.$router.push({ name: 'postStudy' });
          })
          
        })

      }
      
    },
    ...mapActions('auth', [
      'updateUserCondition',
      'finishStudy'
    ]),
    ...mapActions('websocket', [
      'closeConnection'
    ]),
    ...mapActions('feed', [
      'getTweetCount'
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