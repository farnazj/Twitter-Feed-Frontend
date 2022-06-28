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
      limit: 8,
      tweetsFetched: false,
      newlyUpdatedTweetIds: [],
      tweetRefs: {}
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

      update_newly_updated_tweets: (state, tweetIds) => {
        state.newlyUpdatedTweetIds = tweetIds;
      },

      remove_from_newly_updated_tweets: (state, tweetId) => {
        state.newlyUpdatedTweetIds.splice(state.newlyUpdatedTweetIds.indexOf(tweetId), 1);
      },

      change_task_status: (state) => {
        state.preTask = false;
        state.waiting = true;
      },

      end_wait: (state) => {
        state.waiting = false;
      },

      add_tweet_ref: (state, obj) => {
        state.tweetRefs[obj.id] = obj.ref;
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
            console.log('new tweets', tweets)
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

      replaceAILabels: (context, returnedTweetIds) => {
        return new Promise((resolve, reject) => {
          let displayedTweetsToChange = context.state.tweets.filter(el => returnedTweetIds.includes(el.id)
          && el.TweetAccuracyLabels[0].AIAssigned == 1);
          let labelProms = displayedTweetsToChange.map(tweet => {
            return labelServices.getAccuracyLabel({tweetId: tweet.id})
            .then(data => {
              console.log('getting new accuracy label for tweet', tweet.id, 'accuracy label is', data)
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
      }
      
    }
}