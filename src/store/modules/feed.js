import feedServices from "@/services/feedServices"
import labelServices from "@/services/labelServices";
import Vue from "vue";

export default {
    namespaced: true,
    state: {
      preTask: true,
      waiting: false,
      tweets: [],
      offset: 0,
      limit: 6,
      tweetsFetched: false
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
        let newTweet = state.tweets[tweetIndex];
        newTweet.TweetAccuracyLabels = [data.label];
        Vue.set(state.tweets, tweetIndex, newTweet)
        console.log('new Tweet', newTweet)
      },

      change_task_status: (state) => {
        state.preTask = false;
        state.waiting = true;
      },

      end_wait: (state) => {
        state.waiting = false;
      }
      
    },
    actions: {
      getTweets: (context) => {
          return new Promise((resolve, reject) => {
              feedServices.getFeed(
                  {
                    limit: context.state.limit,
                    offset: context.state.offset
                  },
                  {
                  pretask: context.state.preTask
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
            console.log('tweets', tweets)
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
          labelServices.updateAccuracyLabel({
            tweetId: dataObj.tweetId
          }, {
            value: dataObj.value,
            reason: dataObj.reason
          })
          .then((newAccuracyLabel) => {
            context.commit('update_tweet_label', {
              tweetId: dataObj.tweetId,
              label: newAccuracyLabel.data.data
            });
            resolve();
          })
        })
        .catch(error => {
          reject(error);
        })
        
      },

      proceedToMainTask: (context, assessments) => {
        return new Promise((resolve, reject) => {

          labelServices.postBulkAccuracyLabels( {
            labels: assessments
          })
          .then(() => {
            resolve()
          })
          .catch(error => {
            reject(error);
          })
          
        })
      },

      endPreTask: (context) => {
        context.commit('change_task_status');
      },

      endWait: (context) => {
        context.commit('end_wait');
      },

      replaceAILabels: (context, tweetLabelArr) => {
        return new Promise((resolve, reject) => {
          let returnedTweetIds = tweetLabelArr.map(el => el.tweet);
          let displayedTweetsToChange = context.state.tweets.filter(el => returnedTweetIds.includes(el.id));
          let labelProms = displayedTweetsToChange.map(tweet => {
            return labelServices.getAccuracyLabel({tweetId: tweet.id})
            .then(label => {
              context.commit('update_tweet_label', {
                tweetId: tweet.id,
                label: label
              })
            })
          });

          Promise.all(labelProms)
          .then(() => {
            resolve();
          })

        })
      }
      
    }
}