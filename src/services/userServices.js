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
  }
}