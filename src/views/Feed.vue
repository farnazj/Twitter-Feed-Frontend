<template>
    <v-container class="mx-1 mt-2" fill-height>

        <v-row no-gutters>
            <v-col cols="12" md="3" align-self="center" class="custom-sidebar" >
              <v-row v-if="preTask && preTaskLoadingIsFinished && !someNotAssessed"  no-gutters justify="center" >
                <v-btn tile outlined @click="submitPreTask" :disabled="proceedBtnDisabled">Proceed to the Task</v-btn>
              </v-row>

            </v-col>
            <v-col md="9" lg="8" offset-md="3" offset-lg="4">
              <v-row no-gutters v-for="tweet in tweets" :key="tweet.id">
                  <tweet-instance :tweet="tweet" @assessed="assessPreTaskTweet"></tweet-instance>
              </v-row>
          </v-col>
        </v-row>
        
    </v-container>  

</template>
<script>
import tweet from '@/components/Tweet'
import infiniteScroll from '@/mixins/infiniteScroll'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'feed-view',
  components: {
    'tweet-instance': tweet
  },
  data() {
    return {
        preTaskLoadingIsFinished: false,
        preTaskTweetAssessments: {},
        someNotAssessed: true,
        proceedBtnDisabled: false
    }
  },
  created() {
      this.refreshTweets()
      .then((tweets) => {
        if (this.preTask) {
          for (let tweet of tweets) {
            this.preTaskTweetAssessments[tweet.id] = {};
          }

        }
        
      })
  },
  computed: {

    ...mapState('feed', [
        'preTask',
        'tweets',
        'offset'
    ]),
    ...mapGetters('auth', [
        'user'
    ])
  },
  methods: {

    assessPreTaskTweet: function(data) {
      console.log('dobare call shod', data)
      this.preTaskTweetAssessments[data.tweetId] = { value: data.value, reason: data.reason};
          
      if (Object.values(this.preTaskTweetAssessments).some(el => !(Object.keys(el).length)))
        this.someNotAssessed = true;
      else
        this.someNotAssessed = false;
    },

    extend: function() {
      let preOffset = this.offset;
      return this.getMoreTweets()
      .then((newTweets) => {

        if (this.preTask) {
          for (let tweet of newTweets) {
            this.preTaskTweetAssessments[tweet.id] = {};
          }

           this.someNotAssessed = true;
        }

        let postOffset = this.offset;
        if (preOffset == postOffset) {

            this.endOfResults = true;

            if (this.preTask)
              this.preTaskLoadingIsFinished = true;
                  }
        else
          this.endOfResults = false;
      })
    },

    submitPreTask: function() {

      this.proceedBtnDisabled = true;
      this.proceedToMainTask(this.preTaskTweetAssessments)
      .then(() => {
        this.$router.push({ name: 'waitingPage' })
      })
    },

    ...mapActions('feed', [
        'getMoreTweets',
        'refreshTweets',
        'proceedToMainTask'
    ])
  },
  mixins: [infiniteScroll]
}
</script>

<style scoped>
.custom-sidebar {
  position: fixed;
  width: 20vw;
}

</style>