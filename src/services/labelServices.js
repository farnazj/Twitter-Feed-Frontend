import Api from './api'

export default {
  postBulkAccuracyLabels(reqBody) {
    return Api().post('/bulk-accuracy-labels', reqBody, {
      withCredentials: true
    })
  },
  updateAccuracyLabel(params, reqBody) {
    return Api().post(`/accuracy-label/${params.tweetId}`, reqBody, {
        withCredentials: true
    })
  },
  getAccuracyLabel(params) {
    return Api().get(`/accuracy-label/${params.tweetId}`, {
        withCredentials: true
    })
  }

}