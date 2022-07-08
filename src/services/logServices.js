import Api from './api'

export default {
  postlogs(reqBody) {
    return Api().post('/logs', reqBody, {
      withCredentials: true
    })
  }

}