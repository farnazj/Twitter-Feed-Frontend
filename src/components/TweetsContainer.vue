<template>
    <v-container ref="container" class="custom-tweets-container pt-2" justify="center">
        <v-row no-gutters v-for="tweet in tweets" :key="tweet.id">
            <tweet-instance :tweet="tweet" @assessed="assessPreTaskTweet"></tweet-instance>
        </v-row>
        <tweet-loading></tweet-loading>
    </v-container>
</template>
<script>
import tweet from '@/components/Tweet'
import tweetLoading from '@/components/TweetLoading.vue'
import infiniteScroll from '@/mixins/infiniteScroll'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    components: {
        'tweet-instance': tweet,
        'tweet-loading': tweetLoading
    },
    data() {
        return {
            preTaskLoadingIsFinished: false,
            preTaskTweetAssessments: {},
            someNotAssessed: true
        }
    },
    created() {
        this.scrollDisabled = true;
        this.updateUser()
        .then(() => {
            let prom;
            if (this.user.completedPreTask) {
                prom = this.endPreTask()
            }
            else
                prom = new Promise((resolve)=> resolve());
            
            prom
            .then(() => {
                this.refreshTweets()
                .then((tweets) => {
                    this.scrollDisabled = false; 

                    if (this.preTask) {
                        for (let tweet of tweets) {
                        this.preTaskTweetAssessments[tweet.id] = { value: null, reason: '' };
                        }

                        this.someNotAssessed = true;
                    }
                
                })
            })
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

            this.preTaskTweetAssessments[data.tweetId].value = data.value;
          
            if (data.reason != null)
                this.preTaskTweetAssessments[data.tweetId].reason = data.reason;

            if (Object.values(this.preTaskTweetAssessments).some(el => el.value === null)) {
                this.someNotAssessed = true;
            }
            else {
                this.someNotAssessed = false;
                this.checkIfReadyToProceed();
            }
                
        },

        checkIfReadyToProceed: function() {
            if (this.preTaskLoadingIsFinished ) {
                if (this.preTask && !this.someNotAssessed)
                    this.$emit('readyToProceed', this.preTaskTweetAssessments);
                else if (!this.preTask) {
                    if (this.user.UserConditions[0] == 'RQ1A') {
                        if (this.tweets.every(el => el.TweetAccuracyLabels))
                            this.$emit('readyToProceed')
                    }

                }
            }
            
        },

        extend: function() {
            
            let preOffset = this.offset;
            return this.getMoreTweets()
            .then((newTweets) => {

                if (this.preTask) {
                    for (let tweet of newTweets) {
                        this.preTaskTweetAssessments[tweet.id] = { value: null, reason: '' };
                    }
                    
                    this.someNotAssessed = true;
                }

                let postOffset = this.offset;
                if (preOffset == postOffset) {

                    this.endOfResults = true;

                    if (this.preTask)
                        this.preTaskLoadingIsFinished = true;
                    
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
            'endPreTask'
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