<template>
    <v-container ref="container" class="custom-tweets-container pt-2" justify="center">
        <v-col lg="12" md="12" xl="9">
            <v-row no-gutters v-for="(tweet, index) in tweets" :key="tweet.id">
                <tweet-instance :tweet="tweet" :index="index" @assessedConfidenceOrReason="checkAssessedCount"></tweet-instance>
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
        this.emptyFeed();
        this.updateUser()
        .then(() => {
 
            this.refreshTweets()
            .then(() => {
                this.scrollDisabled = false;

                this.checkIndexForAssessment();
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
            'stage',
            'experiment'
        ])
    },
    methods: {

        checkAssessedCount: function() {

            if (this.stage == 2) {
                // console.log('this.stage', this.stage, this.experiment, this.tweetCountAssessedByUser, consts.EXPERIMENT_2)
                this.$emit('tweestsAssessed', `You have assessed ${this.tweetCountAssessedByUser} tweets.`);

                if (this.experiment == consts.EXPERIMENT_2) {
                    if (this.tweetCountAssessedByUser % consts.CHANGED_ELEMENT_THRESHOLD == 0)
                        this.unlockNextSetForAssessment();
                }
            }
                
            this.checkIfReadyToProceed();
        },

        checkIfReadyToProceed: function() {

            console.log('checking if ready to proceed. feed loading is finished?', this.taskLoadingIsFinished)
            console.log('stage', this.stage)
            if (this.taskLoadingIsFinished ) {

                let isReasoningCountMet = this.tweets.filter(el => el.TweetAccuracyLabels && el.TweetAccuracyLabels[0].reason != '' &&  el.TweetAccuracyLabels[0].reason !== null).length >= consts.REASONING_COUNT_MIN;

                if (this.stage !=2 || this.experiment == consts.EXPERIMENT_2) {
                    console.log(' has every tweet been assessed: ', this.tweets.every(el => el.TweetAccuracyLabels && el.TweetAccuracyLabels[0].confidence != null ))

                    if (this.tweets.every(el => el.TweetAccuracyLabels && el.TweetAccuracyLabels[0].confidence != null ) && isReasoningCountMet)
                        this.$emit('readyToProceed');
                }
                else { //if stage == 2 && experiment != exp2
                    if (this.tweetCountAssessedByUser >= consts.STAGE_2_ASSESSMEMT_COUNT_MIN && isReasoningCountMet)
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
                else {
                    this.checkIndexForAssessment();
                    this.endOfResults = false;
                }
            })
        },

        checkIndexForAssessment: function() {
            if (this.stage == 2 && this.experiment == consts.EXPERIMENT_2) {
                let alreadyAssessed = this.tweets.filter(tweet => tweet.TweetAccuracyLabels.filter(label => label.assessor == 0).length).length;
                
                if (alreadyAssessed < this.tweets.length) {
                    this.setIndexForSetAssessment(alreadyAssessed - alreadyAssessed % consts.CHANGED_ELEMENT_THRESHOLD);
                }
            }
        },

        ...mapActions('auth', [
            'updateUser'
        ]),

        ...mapActions('feed', [
            'getMoreTweets',
            'refreshTweets',
            'endTaskStage',
            'unlockNextSetForAssessment',
            'setIndexForSetAssessment',
            'emptyFeed'
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