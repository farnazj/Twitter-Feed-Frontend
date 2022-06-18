import constants from '@/services/constants.js'

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

        console.log(dataObj, 'whaeeee')

        console.log('state.connection', state.connection)

        state.connection.onopen = function() {
            if (state.wsConnIntervalVar) {
                state.connReestablished = true;
                clearInterval(state.wsConnIntervalVar);
            }
            console.log('connection opened')
        }

        state.connection.onmessage = function(event) {
            event.data.text()
            .then(stringifiedData => {
                console.log(stringifiedData)
                let data = JSON.parse(stringifiedData)

                if (data.type == 'new_labels') {

                    console.log( 'whaat', dataObj.rootState)
                    if (dataObj.rootState.feed.waiting)
                        dataObj.context.dispatch('feed/endWait', true, {root: true});
                    

                 }
            })
      
        }

        let establishConnectionFn = state.establishConnection;

        state.connection.onclose = function() {
            console.log('connection closed')

            if (!this.wsConnIntervalVar) {
                state.connReestablished = false;
                state.wsConnIntervalVar = window.setInterval(establishConnectionFn, constants.WS_CONN_INTERVAL);
            }
                
        }
      }
    },
    actions: {
      establishConnection: (context) => {
        return new Promise((resolve, reject) => {
            let userId = context.rootGetters['auth/user'].id;

            context.commit('establish_connection', {
             context: context,
             userId: userId,
             rootState: context.rootState
            });
            resolve();
      })
    }

    }
  }