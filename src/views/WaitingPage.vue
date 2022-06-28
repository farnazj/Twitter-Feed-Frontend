<template>
    <v-container fluid class="pa-4">

          <v-col cols="12" lg="8" align-self="center">
            <v-row no-gutters >
              Please wait while we are setting up the Twitter feed for you.
            </v-row>
            <v-row no-gutters v-if="!waiting" justify="center">
              <v-btn tile outlined  @click="proceed">Proceed</v-btn>
            </v-row>
          </v-col>
        
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
    proceed: function() {
      this.$router.push({ name: 'feed' });
    },
    ...mapActions('feed', [
        'endPreTask'
    ])
  }
  
}
</script>