<template>
    <v-container class="custom-tweets-container pt-2">
        <v-row no-gutters v-for="tweet in tweets" :key="tweet.id">
            <tweet-instance :tweet="tweet" @assessed="assessPreTaskTweet"></tweet-instance>
        </v-row>
    </v-container>
</template>
<script>
import tweet from '@/components/Tweet'
import infiniteScroll from '@/mixins/infiniteScroll'

import { mapState, mapGetters, mapActions } from 'vuex'

export default {
    components: {
        'tweet-instance': tweet
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

            console.log('data chie', data)

          
                this.preTaskTweetAssessments[data.tweetId].value = data.value;
          
            if (data.reason != null)
                            this.preTaskTweetAssessments[data.tweetId].reason = data.reason;


            if (Object.values(this.preTaskTweetAssessments).some(el => el.value === null)) {
                this.someNotAssessed = true;
                console.log(JSON.stringify(Object.values(this.preTaskTweetAssessments)), 'inja')
                console.log(Object.values(this.preTaskTweetAssessments).some(el => el.value === null), 'pas chi shod')
            }
            else {
                this.someNotAssessed = false;
                this.checkIfReadyToProceed();
            }
                
        },

        checkIfReadyToProceed: function() {
            console.log('is it ready to proceed', this.preTask && this.preTaskLoadingIsFinished && !this.someNotAssessed,
            this.preTask, this.preTaskLoadingIsFinished, !this.someNotAssessed)
            if (this.preTask && this.preTaskLoadingIsFinished && !this.someNotAssessed)
                this.$emit('readyToProceed', this.preTaskTweetAssessments);
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

                console.log()
                let postOffset = this.offset;
                if (preOffset == postOffset) {
                    console.log('offset mese ham shod', preOffset, postOffset)

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