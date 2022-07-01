<template>
    <v-container ref="container" class="custom-tweets-container pt-2" justify="center">
        <v-col lg="9" md="9">
            <v-row no-gutters v-for="tweet in tweets" :key="tweet.id">
                <tweet-instance :tweet="tweet"  @assessedConfidence="checkAssessedCount" class="pt-1"></tweet-instance>
            </v-row>

            <tweet-loading></tweet-loading>
        </v-col>
    </v-container>
</template>
<script>
import tweet from '@/components/Tweet'
import tweetLoading from '@/components/TweetLoading.vue'
import infiniteScroll from '@/mixins/infiniteScroll'
import consts from '@/services/constants'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    components: {
        'tweet-instance': tweet,
        'tweet-loading': tweetLoading
    },
    data() {
        return {
            taskLoadingIsFinished: false
        }
    },
    created() {
        this.scrollDisabled = true;
        this.updateUser()
        .then(() => {
 
            this.refreshTweets()
            .then(() => {
                this.scrollDisabled = false; 
            
            })
        })

    },
    computed: {

        tweetCountAssessedByUser: function() {
            return this.tweets.filter(tweet => tweet.TweetAccuracyLabels.filter(label => label.assessor == 0 && label.confidence != null).length).length;
        },

        ...mapState('feed', [
            'tweets',
            'offset'
        ]),
        ...mapGetters('auth', [
            'user',
            'stage'
        ])
    },
    methods: {

        checkAssessedCount: function() {
            if (this.stage == 2) {
                this.$emit('tweestsAssessed', `You have assessed ${this.tweetCountAssessedByUser} tweets.`);
            }
                
            this.checkIfReadyToProceed();
        },

        checkIfReadyToProceed: function() {

            console.log('feed loading is finished?', this.taskLoadingIsFinished)
            console.log('stage', this.stage)
            if (this.taskLoadingIsFinished ) {
                if (this.stage == 1 || this.stage == 0) {
                    if (this.tweets.every(el => el.TweetAccuracyLabels && el.TweetAccuracyLabels[0].confidence != null ))
                        this.$emit('readyToProceed');
                }
                else { //if stage == 2
                    if (this.tweetCountAssessedByUser >= consts.STAGE_2_ASSESSMEMT_COUNT_MIN)
                       this.$emit('readyToProceed');
                }
                
            }
        },

        extend: function() {
            
            let preOffset = this.offset;
            return this.getMoreTweets()
            .then((newTweets) => {

                let postOffset = this.offset;
                if (preOffset == postOffset) {

                    this.endOfResults = true;
                    this.taskLoadingIsFinished = true;
                    
                    this.checkIfReadyToProceed();
                }
                else
                    this.endOfResults = false;
            })
        },

        ...mapActions('auth', [
            'updateUser'
        ]),

        ...mapActions('feed', [
            'getMoreTweets',
            'refreshTweets',
            'endTaskStage'
        ])

    },
    mixins: [infiniteScroll]
    }
</script>

<style scoped>

.custom-tweets-container {
    height: 100vh;
    overflow: scroll;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}

.custom-tweets-container::-webkit-scrollbar {
    display: none;
}

</style>