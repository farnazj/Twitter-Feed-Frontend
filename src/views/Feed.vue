<template>
    <v-container>

        <v-row no-gutters>
            <v-col cols="12" md="2"></v-col>
            <v-col md="8" lg="6">
              <v-row no-gutters v-for="tweet in tweets" :key="tweet.id">
                  <tweet-instance :tweet="tweet"></tweet-instance>
              </v-row>
          </v-col>
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
        preTaskLoadingIsFinished: false
    }
  },
  created() {
    console.log('inside feed')
      this.refreshTweets();
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
      extend: function() {
      let preOffset = this.offset;
      return this.getMoreTweets()
      .then(() => {
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