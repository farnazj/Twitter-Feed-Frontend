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
      }
    },
    mutations: {
  
      auth_request(state){
        state.status = 'loading'
      },
  
      auth_success(state, user){
        state.status = 'success';
      },
  
      auth_error(state){
        state.status = 'error';
      },
  
      logout(state){
        state.status = '';
        state.token = '';
        localStorage.removeItem('feedUserToken');
      },
  
      update_user(state, user) {
        localStorage.setItem('feedUserToken', JSON.stringify(user));
        state.token = Object.assign({}, user);
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
            context.dispatch('websocket/establishConnection', true, {root: true});
  
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
          authServices.logout().then(resp => {
            commit('logout');
            resolve();
          })
          .catch(err => {
            reject(err);
          })
        })
      }
  
    }
  }