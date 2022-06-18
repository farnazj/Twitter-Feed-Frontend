import Api from './api'

export default {
  getUserById(id) {
    return Api().get(`/users/${id}`, {
      withCredentials: true
    })
  }
}