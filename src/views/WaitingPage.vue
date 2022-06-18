<template>
    <v-container>

        <v-row no-gutters>
            Please wait while we are setting up the Twitter feed for you.
        </v-row>
        
    </v-container>  

</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'feed-view',
  components: {
  },
  data() {
    return {
    }
  },
  created() {
    this.endPreTask();
  },
  computed: {
    ...mapState('feed', [
        'waiting'
    ])
  },
  methods: {
    ...mapActions('feed', [
        'endPreTask'
    ])
  },
  watch: {
    waiting: function(newVal) {
        if (!newVal) {
            this.$router.push({ name: 'feed' });
        }
    }
  }
}
</script>