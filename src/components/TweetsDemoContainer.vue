<template>
    <v-container class="custom-tweets-container px-3" v-if="demoTweets.length">

        <v-row  no-gutters justify="center">

            <v-row no-gutters justify="center">

                <v-icon large color="blue lighten-1">{{ icons.tweetIcon }}</v-icon>
                <v-icon color="amber darken-1">{{ icons.newPredictionIcon }}</v-icon>
                <span class="subtitle-2"> Updated Predictions</span>

            </v-row>

            <v-expansion-panels accordion class="pt-2" multiple v-model="panel">
                <v-expansion-panel>
                    <v-expansion-panel-header>At a Glance</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-row no-gutters  v-html="aggregateInfo"></v-row>
                        
                    </v-expansion-panel-content>
                </v-expansion-panel>

                <v-expansion-panel >
                    <v-expansion-panel-header>In More Detail</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-row no-gutters >
                            <p class="body-2">
                                The most recent tweets where AI has changed its prediction of your assessment. You can click on each one to scroll it into view.
                            </p>
                        </v-row>
                        <v-row no-gutters v-for="tweet in demoTweets" :key="tweet.id">
                            <v-card rounded="0" flat class="custom-demo-tweet mt-2"  @click="scrollTweetIntoView(tweet.id)">
                                <v-list-item v-if="tweet.TweetSource">
                                    <v-list-item-avatar color="grey darken-3" size="25">
                                        <v-img
                                            class="elevation-6"
                                            alt=""
                                            :src="tweet.TweetSource.imageUrl"
                                        ></v-img>
                                    </v-list-item-avatar>

                                    <v-list-item-content class="pb-1">
                                        <v-list-item-title class="custom-demo-tweet-title mr-1">{{tweet.TweetSource.name}}</v-list-item-title>
                                        <v-list-item-subtitle class="custom-demo-tweet-username">@{{tweet.TweetSource.username}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-card-text class="demo-tweet-text py-1">
                                    {{demoTweetText(tweet)}}
                                </v-card-text>

                            </v-card>
                        </v-row>            
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-row>
    </v-container>
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { mdiTwitter, mdiBellRing } from '@mdi/js';

export default {
    name: 'tweet-instance',
    components: {
    },
    data() {
        return {
            textSizeToShow: 130,
            icons: {
                newPredictionIcon: mdiBellRing,
                tweetIcon: mdiTwitter
            },
            panel: [0]
        }
    },
    props: [ 'mode' ],
    computed: {
        demoTweets: function() {
            console.log(this.$refs, 'refs')
            if (this.mode == 'newlyUpdated') {
                return this.tweets.filter(el => this.newlyUpdatedTweetIds.includes(el.id));
            }
        },
        aggregateInfo: function() {
            let changedTweets = this.demoTweets;
            let positives = changedTweets.filter(el => el.TweetAccuracyLabels[0].value == 1);
            let negatives = changedTweets.filter(el => el.TweetAccuracyLabels[0].value == 0);

            let positivePlural = positives.length > 1 ? 's have' : ' has';
            let negativePlural = negatives.length > 1 ? 's have' : ' has';

            return `<p class="caption mb-1">The AI has changed its predictions of your assessments for ${changedTweets.length} tweets.</p>
            <p class="caption mb-1">${positives.length} new tweet${positivePlural} been assessed as inaccurate.</p>
            <p class="caption mb-1">${negatives.length} new tweet${negativePlural} been assessed as accurate.</p>
            `
        },

        ...mapState('feed', [
            'tweets',
            'newlyUpdatedTweetIds',
            'tweetRefs'
        ])
    },
    methods: {
        demoTweetText: function(tweet) {
            let ellipsis = tweet.text.length > this.textSizeToShow ? '...' : '';
            return tweet.text.substring(0, this.textSizeToShow) + ellipsis
        },
        scrollTweetIntoView: function(tweetId) {
            this.tweetRefs[tweetId].scrollIntoView({behavior: 'smooth'});
        }
    }

}

</script>

<style scoped>

  .custom-demo-tweet {
    border: 1px #CFD8DC solid;
    width: 100%;
    cursor: pointer;
  }

  .demo-tweet-text {
    line-height: 1rem;
    font-size: 0.7rem !important;
  }

  .custom-demo-tweet-title {
    font-size: 0.8rem
  }
  
  .custom-demo-tweet-username {
    font-size: 0.75rem;
  }


</style>