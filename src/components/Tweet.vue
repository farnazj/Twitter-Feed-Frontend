<template>
    <v-row no-gutters :ref="`tweet-${tweet.id}`" >
        <v-col cols="8">
            <v-card rounded="0" flat class="custom-tweet">
                <v-list-item v-if="tweet.TweetSource">
                    <v-list-item-avatar color="grey darken-3">
                        <v-img
                            class="elevation-6"
                            alt=""
                            :src="tweet.TweetSource.imageUrl"
                        ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title class="custom-list-title mr-1">{{tweet.TweetSource.name}}</v-list-item-title>
                        <v-list-item-subtitle>@{{tweet.TweetSource.username}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-card-text class="body-1" v-html="tweet.text">
                   
                </v-card-text>

            </v-card>
        </v-col>
        <v-col cols="4">

            <v-card tile :class="['pa-1', {'new-update': isANewlyUpdatedTweet, 'dummy-class': isANewlyUpdatedTweet}]" :color="assessmentContainerColor" >

                <v-row no-gutters>
                    
                    <v-spacer></v-spacer>
                    <v-icon v-if="isANewlyUpdatedTweet" color="amber darken-2" small>{{icons.newPredictionIcon}}</v-icon>
                    <v-icon v-if="stage > 0 && tweet.TweetAccuracyLabels && tweet.TweetAccuracyLabels[0].assessor == 0" small> {{icons.gavel}}</v-icon>
                </v-row>
                <v-row no-gutters class="pt-3">
                    <!-- <p v-if="stage > 1 || userLabel === null"
                    class="caption mb-0 pb-0 blue-grey--text text--darken-1">Is this tweet accurate?</p> -->

                    <v-select :items="accuracyStatus" v-model="isAccurate" hide-details
                        item-text="label" item-value="value" dense
                        outline>
                        <template v-slot:label>
                            <span class="caption">Is this tweet accurate?</span>
                        </template>

                        <template slot="item" slot-scope="data" >
                            <div :class="[data.item.color, 'subtitle-2']">
                                {{data.item.label}}
                                <v-icon small>{{icons.gavel}}</v-icon>
                            </div>
                        </template>

                        <template slot="selection" slot-scope="data" >
                            <div v-html="data.item.label" :class="[data.item.color, 'subtitle-2']">
                            </div>
                        </template>

                    </v-select>

                </v-row>

                <v-row no-gutters v-if="isTweetAssessedForAccuracy" class="pt-3">

                    <v-select :items="confidenceStatus" v-model="userConfidence" hide-details
                        item-text="label" item-value="value" dense @change="submitConfidence"
                        outline>
                        <template v-slot:label>
                            <span class="caption">
                                How confident are you?
                            </span>
                        </template>

                        <template slot="item" slot-scope="data" >
                            <div class="caption">
                                {{data.item.label}}
                            </div>
                        </template>

                        <template slot="selection" slot-scope="data" >
                            <div v-html="data.item.label" :class="'caption'">
                            </div>
                        </template>

                    </v-select>

                </v-row>


                <v-row no-gutters v-if="isTweetAssessedForAccuracy" class="pa-1 pt-2">
                    <v-textarea dense hide-details class="caption"
                        outlined rows="2"
                        v-model="reason" @focusout="submitReason"
                        >

                    <template v-slot:label>
                        <span class="caption">
                            Why do you believe so? (Optional)
                        </span>
                    </template>    
                    </v-textarea>
                </v-row>

                <v-row no-gutters class="pt-1">
                    <span class="caption blue-grey--text text--darken-3" >
                        <v-icon v-if="tweet.TweetAccuracyLabels && tweet.TweetAccuracyLabels[0].assessor == 1"
                            >
                            {{icons.robot}}
                        </v-icon> {{accuracyText}}
                    </span>
                </v-row>
                
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
import consts from '@/services/constants'
import { mapState, mapGetters, mapActions } from 'vuex'
import { mdiBellRing, mdiRobot, mdiGavel } from '@mdi/js';
var moment = require('moment');

export default {
    name: 'tweet-instance',
    components: {
    },
    data() {
        return {
            userLabel: null,
            userReason: '',
            userConfidence: null,
            accuracyStatus: [
                {
                    label: 'Accurate',
                    value: consts.ACCURACY_CODES.ACCURATE,
                    color: 'green--text text--darken-2'
                },
                {
                    label: 'Inaccurate',
                    value: consts.ACCURACY_CODES.INACCURATE,
                    color: 'red--text text--accent-3'
                }
            ],
            confidenceStatus: [
                {
                    label: 'None at all',
                    value: consts.CONFIDENCE_CODES.NONE_AT_ALL,
                },
                {
                    label: 'A little',
                    value: consts.CONFIDENCE_CODES.A_LITTLE
                },
                {
                    label: 'A moderate amount',
                    value: consts.CONFIDENCE_CODES.A_MODERATE_AMOUNT
                },
                {
                    label: 'A lot',
                    value: consts.CONFIDENCE_CODES.A_LOT
                },
                {
                    label: 'A great deal',
                    value: consts.CONFIDENCE_CODES.A_GREAT_DEAL
                }
            ],

            icons: {
                newPredictionIcon: mdiBellRing,
                robot: mdiRobot,
                gavel: mdiGavel
            }
        }
    },
    props: {
        tweet: {
            type: Object
        }
    },
    mounted() {
        this.addTweetRef( { id: this.tweet.id, ref: this.$refs[`tweet-${this.tweet.id}`] })
    },
    created() {
        // console.log(this.stage, 'stage', typeof this.stage)
    },
    computed: {

        reason: {
            get: function() {
                if (!this.tweet.TweetAccuracyLabels)
                    return this.userReason;
                else if (this.tweet.TweetAccuracyLabels[0].assessor == 1)
                    return null;
                else 
                    return this.tweet.TweetAccuracyLabels[0].reason;
            },
            set: function(newValue) {
                this.userReason = newValue;
            }

        },

        isAccurate: {
            get: function() {

                if (!this.tweet.TweetAccuracyLabels)
                    return this.userLabel;
                else if (this.tweet.TweetAccuracyLabels[0].assessor == 1)
                    return null;
                else 
                    return this.tweet.TweetAccuracyLabels[0].value;

            },
            set: function(newValue) {
                this.userLabel = newValue;

                let timeElapsed = moment().diff(this.timeLoaded);

                this.updateAccuracyLabel({
                    tweetId: this.tweet.id,
                    value: newValue,
                    timeSinceFeedLoaded: timeElapsed
                })
            //     .then(() => {
            //         this.$emit('assessed');
            //     })
            }
        },

        AIAssessmentWithheld: function() {
            return this.stage < 2 ;
        },

        isTweetAssessedForAccuracy: function() {
            return (!this.tweet.TweetAccuracyLabels && this.userLabel !== null) || 
                (this.tweet.TweetAccuracyLabels && this.tweet.TweetAccuracyLabels[0].assessor == 0);
        },
        
        accuracyText: function() {

            let accuracyVal;
            
            if (this.stage < 2) {
                accuracyVal = this.isAccurate;
                if (accuracyVal == null)
                    return '';
            }
            else {
                accuracyVal = this.tweet.TweetAccuracyLabels[0].value;
            }
                

            let assessor;
            if (typeof this.tweet.TweetAccuracyLabels === 'undefined' ||
                this.tweet.TweetAccuracyLabels[0].assessor == 0)
                assessor = 'You have marked'
            else {
                assessor = " thinks you'd consider"
            }
            
            return `${assessor} this tweet ${this.accuracyMapping(accuracyVal)}`;
            
        },

        assessmentContainerColor: function() {

            let accuracyVal;
            
            if (this.stage < 2) {
                accuracyVal = this.isAccurate;
                if (accuracyVal == null)
                    return '';
            }
            else {
                accuracyVal = this.tweet.TweetAccuracyLabels[0].value;
            }

            if (accuracyVal === null) {
                return '';
            }
            else if (accuracyVal == consts.ACCURACY_CODES.ACCURATE)
                return 'green lighten-4';

            else
                return 'red lighten-4';

        },
        
        isANewlyUpdatedTweet: function() {

            return this.newlyUpdatedTweetIds.includes(this.tweet.id);
        },

        ...mapState('feed', [
            'newlyUpdatedTweetIds',
            'timeLoaded'
        ]),
        ...mapGetters('auth', [
            'user',
            'stage',
        ])
    },
    methods: {

        submitReason: function() {
            this.updateAccuracyLabel( {
                tweetId: this.tweet.id, 
                reason: this.userReason,
                timeSinceFeedLoaded: this.timeElapsedSinceFeedLoaded
            } );
        },

        submitConfidence: function() {
        
            this.updateAccuracyLabel( {
                tweetId: this.tweet.id, 
                confidence: this.userConfidence,
                timeSinceFeedLoaded: this.timeElapsedSinceFeedLoaded
            } )
            .then(() => {
                this.$emit('assessedConfidence', this.tweet.id);
            })
        },

        accuracyMapping: function(val) {
            let mapping = { 1: 'inaccurate', 0: 'accurate' };
            return mapping[val];
        },

        ...mapActions('feed', [
            'updateAccuracyLabel',
            'addTweetRef'
        ])
    }
}
  </script>

  <style scoped>

  .custom-list-title {
    display: inline-block;
    flex: initial;
    
  }

  .new-update.dummy-class {
    border: 3px dashed;
    border-color: #FF6F00 !important;
  }

  .custom-tweet {
    border: 1px #CFD8DC solid;
    /* border-bottom: initial; */
    width: 100%;
    min-height: 160px;
  }
  </style>