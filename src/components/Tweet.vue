<template>
    <v-row no-gutters :ref="`tweet-${tweet.id}`"  class="pt-2">
        <v-col cols="7">
            <v-card rounded="0" flat class="custom-tweet">
                <v-list-item v-if="tweet.TweetSource">
                    <v-list-item-avatar color="grey darken-3">
                        <v-img
                            class="elevation-6"
                            alt=""
                            :src="imageUrl"
                        ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title class="custom-list-title mr-1">{{tweet.TweetSource.name}}</v-list-item-title>
                        <v-list-item-subtitle>@{{tweet.TweetSource.username}}</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-card-text class="body-1" v-html="tweetText" @copy="preventCopy">   
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

                <v-row no-gutters >
                    <span class="caption">This tweet is</span>
                       <v-radio-group v-model="isAccurate" row dense hide-details class="mt-0 ml-2" :disabled="stage == 2 && !isTweetUnlockedForAssessment">
                        <template v-for="(item, index) in accuracyStatus">
                            <v-radio :key="index" :value="item.value">
                                <template v-slot:label>
                                    <span class="caption">{{item.label}}</span>
                                </template>
                            </v-radio>
                        </template>
                    </v-radio-group>
                </v-row>

                <v-row no-gutters v-if="isTweetAssessedForAccuracy" class="pt-1">
                    <span class="caption">How confident are you?</span>
                       <v-radio-group v-model="userConfidence" row dense hide-details class="mt-0 ml-2" @change="submitConfidence" :disabled="(stage == 2 && !isTweetUnlockedForAssessment) || accuracyLabelBeingUpdated">
                        <template v-for="(item, index) in confidenceStatus">
                            <v-radio :key="index" :value="item.value">
                                <template v-slot:label>
                                    <span class="caption" v-if="index == 0 || index == 4">{{item.label}}</span>
                                    <span class="caption" v-else></span>
                                </template>
                            </v-radio>
                        </template>
                    </v-radio-group>
                </v-row>


                <v-row no-gutters v-if="isTweetAssessedForAccuracy" class="pa-1 pt-2">
                    <v-textarea dense hide-details class="caption" :disabled="accuracyLabelBeingUpdated"
                        outlined rows="2"
                        v-model="reason" @focusout="submitReason"
                        >

                    <template v-slot:label>
                        <span class="caption">
                            Why do you believe so?
                        </span>
                    </template>    
                    </v-textarea>
                </v-row>

                <v-row no-gutters class="pt-0" v-if="stage == 2 && tweet.TweetAccuracyLabels && tweet.TweetAccuracyLabels[0].assessor == 1">
                    <span class="caption blue-grey--text text--darken-3" >
                        <v-icon>
                            {{icons.robot}}
                        </v-icon> thinks you'd consider this tweet <span class="font-weight-bold">{{accuracyText}}</span>
                    </span>
                </v-row>
                
            </v-card>
        </v-col>

        <v-col cols="1">
            <v-icon color="light-blue darken-4" x-large 
            v-if="stage == 2 && !isUserFreeInAssessment && isTweetUnlockedForAssessment && (isAccurate == null || tweet.TweetAccuracyLabels[0].confidence == null)">{{icons.arrow}}</v-icon>
        </v-col>

    </v-row>
</template>
<script>
import consts from '@/services/constants'
import { mapState, mapGetters, mapActions } from 'vuex'
import { mdiBellRing, mdiRobot, mdiGavel, mdiArrowLeftThin } from '@mdi/js';
var moment = require('moment');

export default {
    name: 'tweet-instance',
    components: {
    },
    data() {
        return {
            accuracyLabelBeingUpdated: false,
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
                    label: 'Not at all',
                    value: consts.CONFIDENCE_CODES.NOT_AT_ALL,
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
                gavel: mdiGavel,
                arrow: mdiArrowLeftThin
            }
        }
    },
    props: {
        tweet: {
            type: Object
        },
        index: {
            type: Number
        }
    },
    mounted() {
        this.addTweetRef( { id: this.tweet.id, ref: this.$refs[`tweet-${this.tweet.id}`] })
    },
    created() {
        // console.log(this.stage, 'stage', typeof this.stage)
    },
    computed: {

        imageUrl: function() {
            if (!this.tweet.TweetSource.imageUrl.includes('https://pbs'))
                return consts.BASE_URL + '/' + this.tweet.TweetSource.imageUrl;
            else
                return this.tweet.TweetSource.imageUrl;
        },

        tweetText: function() {
            const regex = /http(\S)+/g;
            const allMatches = this.tweet.text.matchAll(regex);

            let text = this.tweet.text;

            for (let match of allMatches) {
                text = text.replace(match[0], `<a href="${match[0]}" target="_blank">${match[0]}</a>`)
            }
            return text;
        },

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


                this.accuracyLabelBeingUpdated = true;
                this.updateAccuracyLabel({
                    tweetId: this.tweet.id,
                    value: newValue,
                    timeSinceFeedLoaded: timeElapsed
                })
                .then(() => {
                    this.accuracyLabelBeingUpdated = false;
                })
            }
        },

        isTweetUnlockedForAssessment: function() {
            if (this.stage != 2 || this.experiment != consts.EXPERIMENT_2)
                return true;

            else if (this.index < this.unlockedForAssessmentIndex + consts.CHANGED_ELEMENT_THRESHOLD)
                return true;
            else
                return false;
        },
        isUserFreeInAssessment: function() {
            return this.experiment != consts.EXPERIMENT_2 ;
        },
        AIAssessmentWithheld: function() {
            return this.stage < 2 ;
        },

        isTweetAssessedForAccuracy: function() {
            return (!this.tweet.TweetAccuracyLabels && this.userLabel !== null) || 
                (this.tweet.TweetAccuracyLabels && this.tweet.TweetAccuracyLabels[0].assessor == 0);
        },
        
        accuracyText: function() {

            let accuracyVal = this.tweet.TweetAccuracyLabels[0].value;
            return this.accuracyMapping(accuracyVal);
            
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
            'timeLoaded',
            'unlockedForAssessmentIndex'
        ]),
        ...mapGetters('auth', [
            'user',
            'stage',
            'experiment',
        ])
    },
    methods: {

        preventCopy: function(evt) {
            evt.clipboardData.setData("text/plain", "Copying is not allowed on this webpage");
            evt.preventDefault();
        },

        submitReason: function() {
            this.updateAccuracyLabel( {
                tweetId: this.tweet.id, 
                reason: this.userReason,
                timeSinceFeedLoaded: this.timeElapsedSinceFeedLoaded
            } )
            .then(() => {
                this.$emit('assessedConfidenceOrReason', this.tweet.id);
            })
        },

        submitConfidence: function() {
        
            this.updateAccuracyLabel( {
                tweetId: this.tweet.id, 
                confidence: this.userConfidence,
                timeSinceFeedLoaded: this.timeElapsedSinceFeedLoaded
            } )
            .then(() => {
                this.$emit('assessedConfidenceOrReason', this.tweet.id);
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
    border: 1px #CFD8DC solid !important;
    /* border-bottom: initial; */
    width: 100%;
    min-height: 160px;
  }
  </style>