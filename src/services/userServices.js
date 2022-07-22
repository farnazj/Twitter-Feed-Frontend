import Api from './api'

export default {
  getUserById(id) {
    return Api().get(`/users/${id}`, {
      withCredentials: true
    })
  },

  updateUserCondition(id) {
    return Api().put(`/users/${id}/update-condition`, {}, {
      withCredentials: true
    })
  },

  getUserMTurkCode() {
    return Api().get(`/users/mturk-code`, {
      withCredentials: true
    })
  },

  endStudy(id) {
    return Api().post(`/users/${id}/end-study`, {}, {
      withCredentials: true
    })
  }
}