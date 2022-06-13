import Api from './api'

export default {
  getFeed() {
    return Api().get('/tweets', {
      withCredentials: true,
      headers: headers
    })
  }

}