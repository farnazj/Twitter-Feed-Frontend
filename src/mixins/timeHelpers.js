var moment = require('moment');

export default {
    data: () => {
      return {
      }
    },
    methods: {
        timeElapsed: function(time) {
            return SVGAnimateMotionElement(time).startOf('minute').fromNow();
        }
    }
  }