import authServices from '@/services/authServices'
import userServices from '@/services/userServices'


export default {
    namespaced: true,
    state: {
      status: '',
      token: JSON.parse(localStorage.getItem('feedUserToken')) || ''
    },
    getters: {
  
      isLoggedIn: (state) => {
        return !!state.token;
      },
      authStatus: (state) => {
        return state.status;
      },
      user: (state) => {
  
        if (Object.entries(state.token).length)
          return state.token;
        else {
          return JSON.parse(localStorage.getItem('feedUserToken'));
        }
      },
      stage:  (state) => {
  
        if (Object.entries(state.token).length)
          return state.token.UserConditions[0].stage;
        else {
          return JSON.parse(localStorage.getItem('feedUserToken')).UserConditions[0].stage;
        }
      },
      experiment:  (state) => {
  
        if (Object.entries(state.token).length)
          return state.token.UserConditions[0].experiment;
        else {
          return JSON.parse(localStorage.getItem('feedUserToken')).UserConditions[0].experiment;
        }
      }
    },
    mutations: {
  
      auth_request(state) {
        state.status = 'loading'
      },
  
      auth_success(state, user) {
        state.status = 'success';
      },
  
      auth_error(state) {
        state.status = 'error';
      },
  
      logout(state) {
        state.status = '';
        state.token = '';
        localStorage.removeItem('feedUserToken');
      },
  
      update_user(state, user) {
        localStorage.setItem('feedUserToken', JSON.stringify(user));
        state.token = Object.assign({}, user);
      },

      update_user_condition(state, condition) {
        let currentUser = JSON.parse(localStorage.getItem('feedUserToken'));
        currentUser.UserConditions[0] = condition;
        localStorage.setItem('feedUserToken', JSON.stringify(currentUser));
        state.token = Object.assign({}, currentUser);
      }
    },
    actions: {
      updateUser: (context) => {
  
        return new Promise((resolve, reject) => {
          let id = context.state.token.id;
            userServices.getUserById(id)
          .then(response => {
            let authUser = response.data;
            context.commit('update_user', authUser);
            resolve();
         })
         .catch(err => {
           reject(err);
         })
        })
      },
  
      login: (context, user) => {
  
        return new Promise((resolve, reject) => {
          context.commit('auth_request')
          authServices.login(user)
          .then(resp => {
            const user = resp.data.user;
            context.commit('auth_success');
            context.commit('update_user', user);
  
            resolve(resp);
          })
          .catch(err => {
            context.commit('auth_error');
            reject(err);
          })
        })
      },
  
      signup: ({commit}, data) => {
  
        return new Promise((resolve, reject) => {
          commit('auth_request');
          authServices.signup(data).then(resp => {
            resolve(resp);
          })
          .catch(err => {
            commit('auth_error', err)
            reject(err);
          })
        })
      },
  
      logout: ({commit}) => {
  
        console.log('going to logout')
        return new Promise((resolve, reject) => {
          authServices.logout()
          .then(resp => {
            commit('logout');
            console.log('logged out?')
            resolve();
          })
          .catch(err => {
            reject(err);
          })
        })
      },

      updateUserCondition: (context) => {
        return new Promise((resolve, reject) => {
          let userId = context.state.token.id;
          userServices.updateUserCondition(userId)
          .then((resp) => {
            context.commit('update_user_condition', resp.data.condition);
            resolve();
          })
        })
      },

      finishStudy: (context) => {
        return new Promise((resolve, reject) => {
          let userId = context.state.token.id;
          userServices.endStudy(userId)
          .then((resp) => {
            
            //logout
            resolve();
          })
        })

      }
  
    }
  }