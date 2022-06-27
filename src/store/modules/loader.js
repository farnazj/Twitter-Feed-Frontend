export default {
    namespaced: true,
    state: {
      loading: true
    },
    mutations: {
      set_loading: (state, value) => {
        state.loading = value;
      }
    },
    actions: {
      setLoading: (context, payload) => {
        context.commit('set_loading', payload);
      }
    }
  }