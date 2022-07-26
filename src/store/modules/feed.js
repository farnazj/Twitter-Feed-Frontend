import feedServices from "@/services/feedServices"
import labelServices from "@/services/labelServices";
import constants from '@/services/constants';
var moment = require('moment');

export default {
    namespaced: true,
    state: {
      waiting: false,
      tweets: [],
      offset: 0,
      limit: 8,
      tweetsFetched: false,
      newlyUpdatedTweetIds: [],
      tweetRefs: {},
      timeLoaded: null,
      unlockedForAssessmentIndex : 0
    },
    mutations: {
      append_tweets: (state, tweets) => {
        let tweetIds = state.tweets.map(tweet => tweet.id);
        let filteredTweets= tweets.filter(tweet => !tweetIds.includes(tweet.id) );
        state.tweets.push(...filteredTweets);
        state.offset += tweets.length;
      },

      refresh_tweets: (state) => {
        state.tweets = [];
        state.offset = 0;
      },

      set_fetch_status: (state, status) => {
          state.tweetsFetched = status;
      },

      update_tweet_label: (state, data) => {

        let tweetIndex = state.tweets.findIndex(tweet => tweet.id == data.tweetId);
        if (typeof state.tweets[tweetIndex].TweetAccuracyLabels !== 'undefined') {
          state.tweets[tweetIndex].TweetAccuracyLabels.splice(0, 1);
          state.tweets[tweetIndex].TweetAccuracyLabels.push(data.label);
        }
        else {
          state.tweets[tweetIndex] = Object.assign({}, state.tweets[tweetIndex], {TweetAccuracyLabels: [data.label]})
        }
          
        // console.log('in update tweet label, new version of the tweet:', state.tweets[tweetIndex]);
      },

      update_newly_updated_tweets: (state, tweetIds) => {
        state.newlyUpdatedTweetIds = tweetIds;
      },

      remove_from_newly_updated_tweets: (state, tweetId) => {
        let tweetIdIndex = state.newlyUpdatedTweetIds.indexOf(tweetId);
        if (tweetIdIndex != -1)
          state.newlyUpdatedTweetIds.splice(tweetIdIndex, 1);
      },

      change_task_status: (state) => {
        state.waiting = true;
      },

      end_wait: (state) => {
        state.waiting = false;
      },

      add_tweet_ref: (state, obj) => {
        state.tweetRefs[obj.id] = obj.ref;
      },

      reset_time_since_opened: (state, obj) => {
        state.timeLoaded = moment();
      },

      unlock_next_set_for_assessment: (state) => {
        state.unlockedForAssessmentIndex += constants.CHANGED_ELEMENT_THRESHOLD;
      },

      unlock_specific_set_for_assessment: (state, index) => {
        state.unlockedForAssessmentIndex = index;
      }
      
    },
    actions: {
      getTweets: (context) => {
        return new Promise((resolve, reject) => {
          feedServices.getFeed(
            {
              limit: context.state.limit,
              offset: context.state.offset
            })
          .then(response => {
              resolve(response.data);
          }).catch(error => {
              reject(error);
          })
        })
          
      },

      getMoreTweets: (context) => {
        context.dispatch('loader/setLoading', true, { root: true });
        return new Promise((resolve, reject) => {
    
          context.dispatch('getTweets')
          .then(tweets => {
            // console.log('new tweets', tweets)
            context.commit('append_tweets', tweets);
            resolve(tweets);
          })
          .catch(error => {
            reject(error);
          })
          .finally(() => {
            context.dispatch('loader/setLoading', false, { root: true });
          })
    
        })
      },

      refreshTweets: (context) => {

        context.dispatch('loader/setLoading', true, { root: true });
        context.commit('refresh_tweets');
        context.commit('set_fetch_status', false);
        context.commit('reset_time_since_opened');
        return new Promise((resolve, reject) => {
    
          context.dispatch('getMoreTweets')
          .then((tweets) => {
            resolve(tweets);
          })
          .catch(err => {
            reject(err);
          })
          .finally(() => {
            context.dispatch('loader/setLoading', false, { root: true });
            context.commit('set_fetch_status', true);
          })
        })
      },

      updateAccuracyLabel: (context, dataObj) => {
        return new Promise((resolve, reject) => {

          let reqBody = {};
          for (const [key, val] of Object.entries(dataObj)) {
            if (key != 'tweetId')
              reqBody[key] = val;
          }

          labelServices.updateAccuracyLabel({
            tweetId: dataObj.tweetId
          }, reqBody)
          .then((newAccuracyLabel) => {
            context.commit('update_tweet_label', {
              tweetId: dataObj.tweetId,
              label: newAccuracyLabel.data.data
            });

            context.commit('remove_from_newly_updated_tweets', dataObj.tweetId);
            resolve();
          })
        })
        .catch(error => {
          reject(error);
        })
        
      },

      endTaskStage: (context) => {
        context.commit('change_task_status');
      },

      endWait: (context) => {
        context.commit('end_wait');
      },

      replaceAILabels: (context, returnedTweetIds) => {
        return new Promise((resolve, reject) => {
          let displayedTweetsToChange = context.state.tweets.filter(el => returnedTweetIds.includes(el.id)
          && el.TweetAccuracyLabels[0].assessor == 1);
          let labelProms = displayedTweetsToChange.map(tweet => {
            return labelServices.getAccuracyLabel({tweetId: tweet.id})
            .then(data => {
              // console.log('getting new accuracy label for tweet', tweet.id, 'accuracy label is', data)
              context.commit('update_tweet_label', {
                tweetId: tweet.id,
                label: data.data
              })
            })
          });

          Promise.all(labelProms)
          .then(() => {
            context.commit('update_newly_updated_tweets', displayedTweetsToChange.map(el => el.id));
            resolve();
          })

        })
      },

      addTweetRef: (context, dataObj) => {
        return new Promise((resolve, reject) => {
          context.commit('add_tweet_ref', dataObj);
          resolve();
        })
      },

      unlockNextSetForAssessment: (context) => {
        return new Promise((resolve, reject) => {
          context.commit('unlock_next_set_for_assessment');
          resolve();
        })
      },

      setIndexForSetAssessment: (context, data) => {
        return new Promise((resolve, reject) => {
          context.commit('unlock_specific_set_for_assessment', data);
          resolve();
        })
      },

      emptyFeed: (context) => {
        return new Promise((resolve, reject) => {
          context.commit('refresh_tweets');
          resolve();
        })
      }
      
    }
}