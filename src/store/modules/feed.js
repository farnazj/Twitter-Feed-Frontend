import feedServices from "@/services/feedServices"


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

        set_fetch_status: (state, status) =>{
            state.tweetsFetched = status;
        }
      
    },
    actions: {
        getTweets: (context) => {
            return new Promise((resolve, reject) => {
                feedServices.getFeed(
                    {
                        offset: context.state.offset,
                        limit: context.state.limit
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
            // context.dispatch('loader/setLoading', true, { root: true });
            return new Promise((resolve, reject) => {
      
              context.dispatch('getTweets')
              .then(tweets => {
                context.commit('append_tweets', tweets);
                resolve();
              })
              .catch(error => {
                reject(error);
              })
              .finally(() => {
                // context.dispatch('loader/setLoading', false, { root: true });
              })
      
            })
        },

        refreshTweets: (context) => {

            // context.dispatch('loader/setLoading', true, { root: true });
            context.commit('refresh_tweets');
            context.commit('set_fetch_status', false);
            return new Promise((resolve, reject) => {
      
              context.dispatch('getMoreTweets')
              .then(() => {
                resolve();
              })
              .catch(err => {
                reject(err);
              })
              .finally(() => {
                // context.dispatch('loader/setLoading', false, { root: true });
                context.commit('set_fetch_status', true);
              })
            })
        }
    }
}