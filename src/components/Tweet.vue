<template>
<v-row no-gutters>
    <v-col cols="9">
        <v-card rounded="0" flat class="custom-tweet">
            <v-list-item>
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
            <v-card-text class="body-2">
                {{tweet.text}}
            </v-card-text>

        </v-card>
    </v-col>
    <v-col cols="3">
        <v-card tile class="pa-1">
                <v-row no-gutters>
                    <p v-if="!preTask || userLabel === null"
                    class="caption mb-0 pb-0 blue-grey--text text--darken-1">Is this tweet accurate?</p>
                </v-row>
                <v-row no-gutters>
                    <v-switch v-model="isInaccurate" color="red" hide-details dense>
                    </v-switch>
                </v-row>
                <v-row no-gutters>
                    <span class="caption  blue-grey--text text--darken-3">
                    {{accuracyText}}
                    </span>
                </v-row>
               
        </v-card>
    </v-col>
    </v-row>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'tweet-instance',
    components: {
    },
    data() {
        return {
            userLabel: null,
            reason: ''
        }
    },
    props: {
        tweet: {
            type: Object
        }
    },
    computed: {
        isInaccurate: {
            get: function() {
                if (this.preTask)
                    return this.userLabel;
                else if (this.tweet.AccuracyLabel.value == 1)
                    return true;
                else
                    return false;

            },
            set: function(newValue) {
                if (this.preTask) {
                    this.userLabel = newValue;
                    this.$emit('assessed', {
                        value: newValue,
                        id: this.tweet.id });
                }
                else {
                    this.updateAccuracyLabel({
                        tweetId: this.tweet.id,
                        value: newValue,
                        reason: this.reason
                    })
                }
                
            }
        },
        
        accuracyText: function() {

            let accuracyVal;
            if (this.preTask == true) {
                if (this.userLabel == null)
                    return '';
                else
                    accuracyVal = this.userLabel;
            }
            else {
                accuracyVal = this.tweet.AccuracyLabel.value;
            }

            let assessor;
            if (typeof this.tweet.AccuracyLabel === 'undefined' ||
                this.tweet.AccuracyLabel.AIAssigned == 0)
                assessor = 'You have marked'
            else {
                assessor = "The AI think you'd consider"
            }
            
            return `${assessor} this tweet as ${this.accuracyMapping(accuracyVal)}`;
            
        },
        ...mapState('feed', [
            'preTask'
        ])
    },
    methods: {
        accuracyMapping: function(val) {
            let mapping = {true: 'inaccurate', false: 'accurate'};
            return mapping[val];
        },
        ...mapActions('feed', [
            'updateAccuracyLabel'
        ])
    }
}
  </script>

  <style scoped>
  .custom-tweet {
    border: 1px #ECEFF1 solid;
    border-bottom: initial;
    width: 100%;
  }

  .custom-list-title {
    display: inline-block;
    flex: initial;
    
  }
  </style>