export default {
    data: () => {
      return {
        endOfResults: false,
        scrollDisabled: false
      }
    },
    methods: {
      scroll () {
        let containerEl = this.$refs.container;
        containerEl.onscroll = () => {
          console.log( document.documentElement.scrollTop, window.innerHeight, document.documentElement.offsetHeight)
          let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= (document.documentElement.offsetHeight - 300);

          if (!this.scrollDisabled && !this.endOfResults && bottomOfWindow) {
            console.log('bottom of window')
            this.scrollDisabled = true;
            this.extend()
            .then(() => {
              this.scrollDisabled = false;
            })
          }
  
        };
      }
    },
    mounted() {
      this.scroll();
    }
  }