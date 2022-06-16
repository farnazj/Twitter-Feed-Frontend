<template>
    <v-container>

        <v-row no-gutters>
            <v-col cols="12" md="2"></v-col>
            <v-col md="8" lg="8">
              <v-row no-gutters v-for="tweet in tweets" :key="tweet.id">
                  <tweet-instance :tweet="tweet" @assessed="assessPreTaskTweet"></tweet-instance>
              </v-row>
          </v-col>
        </v-row>

        <v-row no-gutters v-if="preTask && preTaskLoadingIsFinished && !someNotAssessed">
          <v-btn>Proceed</v-btn>
        </v-row>
        
    </v-container>  

</template>
<script>
// import customToolbar from '@/components/CustomToolbar'
import tweet from '@/components/Tweet'
import infiniteScroll from '@/mixins/infiniteScroll'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'feed-view',
  components: {
    // 'custom-toolbar': customToolbar
    'tweet-instance': tweet
  },
  data() {
    return {
        preTaskLoadingIsFinished: false,
        preTaskTweetAssessments: {},
        someNotAssessed: false
    }
  },
  created() {
      this.refreshTweets()
      .then((tweets) => {
        for (let tweet of tweets)
          this.preTaskTweetAssessments[tweet.id] = 0;
      })
  },
  computed: {

    ...mapState('feed', [
        'preTask',
        'tweets'
    ]),
    ...mapGetters('auth', [
        'user'
    ])
  },
  methods: {

    assessPreTaskTweet: function(data) {
      console.log('event fired', data)
      this.preTaskTweetAssessments[data.id] = 1;
          
      if (Object.values(this.preTaskTweetAssessments).some(el => el == 0))
        this.someNotAssessed = true;
      else
        this.someNotAssessed = false;

    },
    extend: function() {
      let preOffset = this.offset;
      return this.getMoreTweets()
      .then((newTweets) => {

        if (this.preTask) {
          for (let tweet of newTweets)
            this.preTaskTweetAssessments[tweet.id] = 0;

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
    ...mapActions('feed', [
        'getMoreTweets',
        'refreshTweets'
    ])
  },
  mixins: [infiniteScroll]
}
</script>