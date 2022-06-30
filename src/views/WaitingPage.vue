<template>
    <v-container class="pa-4">
      <v-row no-gutters justify="center">
          <v-col cols="12" lg="8" align-self="center">
            <v-row no-gutters justify="center" class="pt-10">
              <p class="body-1">
                Please wait while we are setting up the Twitter feed for you.
              </p>  
            </v-row>

            <v-row no-gutters justify="center" class="pt-6">
              <v-progress-circular
              indeterminate v-if="waiting"
              color="primary" :size="70" :width="7"
            ></v-progress-circular>
            </v-row>

            <v-row no-gutters v-if="!waiting" justify="center"  class="pt-6">
              <v-btn tile outlined  @click="proceed">Proceed</v-btn>
            </v-row>
          </v-col>
        </v-row>
    </v-container>  

</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import labelServices from '@/services/labelServices'

export default {
  name: 'feed-view',
  components: {
  },
  data() {
    return {
    }
  },
  created() {
    console.log('what is stage in waiting page', this.stage)
    this.endTaskStage()
    .then(() => {
      this.updateUserCondition()
      .then(() => {
        labelServices.checkIfLabelsAreReadyForStage({
          stage: this.stage })
        .then((resp) => {
          console.log('what is resp', resp)
          if (resp.data)
            this.endWait();
        })
      })
    })
  },
  computed: {
    ...mapState('feed', [
        'waiting'
    ]),
    ...mapGetters('auth', [
      'stage'
    ])
  },
  methods: {
    proceed: function() {

      this.$router.push({ name: 'feed' });
    },
    ...mapActions('feed', [
        'endTaskStage',
        'endWait'
    ]),
    ...mapActions('auth', [
      'updateUserCondition'
    ])
  }
  
}
</script>