import Api from './api'

export default {
  getFeed(params, headers) {
    return Api().get(`/tweets/${params.limit}&offset=${params.offset}` , {
      withCredentials: true,
      headers: headers
    })
  }

}