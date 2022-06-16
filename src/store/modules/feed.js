import feedServices from "@/services/feedServices"
import labelServices from "@/services/labelServices";
import Vue from "vue";

export default {
    namespaced: true,
    state: {
      preTask: true,
      tweets: [],
      offset: 0,
      limit: 5,
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
        newTweet.AccuracyLabel = data.label;
        Vue.set(state.tweets, tweetIndex, newTweet)
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
                  pre: context.state.preTask
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
          .then(() => {
            labelServices.getAccuracyLabel({
              tweetId: dataObj.tweetId
            })
            .then((accuracyLabel) => {
              context.commit('update_tweet_label', {
                tweetId: dataObj.tweetId,
                label: accuracyLabel
              });
              resolve();
            })
          })
          .catch(error => {
            reject(error);
          })
        })
      }
    }
}