<template>
    <v-container class="pa-4">
      <v-row no-gutters justify="center"  class="pt-10">
          <v-col cols="12" lg="10" xl="8" align-self="center">

            <template v-if="waiting">
              <v-row no-gutters justify="center">
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

            </template>

            <template v-else>
                <v-row no-gutters justify="center" class="pt-10">
                  <p class="body-1" v-if="stage == 1">
                    We need a few more accuracy labels from you. The next page will show you another feed of tweets. We ask that you also assess the tweets on that feed.

                    <br>
                   Similar to the last step, <span class="font-weight-bold">once you have assessed and marked your level of confidence for all the tweets as well as provided your reasoning for at least {{reasoningCountMin}} of your assessments</span>, a button will appear on the side which you will click to go to the next step.
                  </p> 

                  <p class="body-1" v-if="stage == 1">
                    <span class="font-weight-bold">Note:</span> As we are training the model, we will mark which tweets would be most helpful to assess next. You are free to choose to assess these tweets next or not.
                  </p> 

                  <p class="body-1" v-if="stage == 2">
                    On the next page, you will see another feed of tweets. For each one, we will show the AI's prediction of how you would assess the tweet. Your task is to guide the AI to become better at learning your assessments by indicating whether you agree or disagree with the AI's predictions. You can do this by explicitly assessing tweets as accurate or inaccurate.
                  </p>


                  <p class="body-1" v-if="stage == 2">
                   You do not need to assess every single tweet. We only ask that you assess a minimum of X tweets. It is up to you to decide which ones you want to assess.
                  </p>

                  <p class="body-1" v-if="stage == 2">
                   When you determine that the AI has become good at predicting your assessments, confirm that the AI looks good and proceed to the post-study survey.
                  </p>

              </v-row>
            </template>
            

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
import constants from '@/services/constants'

export default {
  name: 'waiting-view',
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
        labelServices.checkIfLabelsAreReadyForStage({
          stage: this.stage })
        .then((resp) => {
          console.log('what is resp', resp)
          if (resp.data)
            this.endWait();
        })
      })
    
  },
  computed: {
    reasoningCountMin: function() {
        return constants.REASONING_COUNT_MIN;
    },
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
    // ...mapActions('auth', [
    //   'updateUserCondition'
    // ])
  }
  
}
</script>