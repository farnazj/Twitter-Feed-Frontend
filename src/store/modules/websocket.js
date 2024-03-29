import logServices from '@/services/logServices';
import constants from '@/services/constants.js'
var moment = require('moment');

export default {
    namespaced: true,
    state: {
        connection: null,
        wsConnIntervalVar: null,
        connReestablished: false
    },
    mutations: {
      establish_connection: (state, dataObj) => {
        state.connection = new WebSocket(`${constants.WS_BASE_URL}`, [dataObj.userId]);

        state.connection.onopen = function() {
            if (state.wsConnIntervalVar) {
                state.connReestablished = true;
                clearInterval(state.wsConnIntervalVar);
            }
            console.log('connection opened')
        }

        state.connection.onmessage = function(event) {
            // console.log('message arrived', event, event.data)

            let isWaiting = dataObj.rootState['feed'].waiting;
            let stage = dataObj.rootGetters['auth/stage'];

            console.log('data arrived', isWaiting, stage)

            if (isWaiting || stage == 2) {

                event.data.text()
                .then(stringifiedData => {
                    // console.log(stringifiedData)
                    let data = JSON.parse(stringifiedData)
    
                    if (data.type == 'new_labels') {

                        let timeReceived = moment();
                        console.log('time received', timeReceived)
    
                        if (dataObj.rootState.feed.waiting)
                            dataObj.context.dispatch('feed/endWait', true, { root: true });
                        else {
                            dataObj.context.dispatch('feed/replaceAILabels', data.data, { root: true })
                            .then(() => {
                                let timeDisplayed = moment();
                                console.log('time displayed', timeDisplayed)
                                logServices.postlogs({
                                    changedTweets: data.data,
                                    timeReceived: timeReceived,
                                    timeDisplayed: timeDisplayed
                                })
                            })
                        }
    
                    }
                    // else if (data.type == 'next_to_labels') {
                    // }

                })
            }

            return false;
      
        }

        let establishConnectionFn = state.establishConnection;

        state.connection.onclose = function() {
            console.log('connection closed')

            if (!this.wsConnIntervalVar) {
                state.connReestablished = false;
                state.wsConnIntervalVar = window.setInterval(establishConnectionFn, constants.WS_CONN_INTERVAL);
            }
                
        }
      },

      close_connection: (state) => {
        state.connection.close();
      }
    },
    actions: {
        establishConnection: (context) => {
            return new Promise((resolve, reject) => {
                let userId = context.rootGetters['auth/user'].id;

                context.commit('establish_connection', {
                    context: context,
                    userId: userId,
                    rootState: context.rootState,
                    rootGetters: context.rootGetters
                });
                resolve();
            })
        },

        closeConnection: (context) => {
            return new Promise((resolve, reject) => {
                context.commit('close_connection');
                resolve();
            })
        }

    }
  }