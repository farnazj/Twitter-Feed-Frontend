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
                  <v-col cols="12">

                    <template v-if="stage == 1">

                      <p class="body-1" >
                        We need a few more accuracy labels from you. The next page will show you another feed of tweets. We ask that you also assess the tweets on that feed.

                        <br>
                        You are only able to change the assessments of <span class="font-weight-bold">{{countOfItemsToAssess}}</span> tweets at a time.
                        The assessments that you can change at a certain time are marked with a blue arrow, similar to the picture below.
                       </p> 

                      <v-row no-gutters justify="center">
                          <v-col cols="12">
                          <v-img :contain="true" :src="tweetSelectionURLStage1"></v-img>
                          </v-col>
                      </v-row>

                      <p class="body-1">
                        Similar to the last step, <span class="font-weight-bold">once you have assessed and marked your level of confidence for all the tweets as well as provided your reasoning for at least {{reasoningCountMin}} of your assessments</span>, you will be able to proceed to the next step.
                      </p> 
                    </template>


                    <template v-if="stage == 2">

                      <p class="body-1">
                        <!-- Please read the instructions on this page carefully.
                        <br> -->
                        On the next page, you will see the last feed of tweets. For each tweet, we will show the AI's prediction of how you would assess the tweet. Your task is to guide the AI to become better at learning your assessments by indicating whether you agree or disagree with the AI's predictions. You will do this by explicitly assessing tweets as accurate or inaccurate.
                      </p>

                      <template v-if="isUserFreeInAssessment">
                        <p class="body-1" v-if="stage == 2">
                        You do not need to assess every single tweet. We only ask that you <span class="font-weight-bold">assess a minimum of {{stage2RequiredAssessmentCount}} tweets.</span> It is up to you to decide which ones you want to assess. <span class="font-weight-bold">Similar to the previous steps, you are required to provide your reasoning for at least {{reasoningCountMin}} of your assessments</span>. 
                        </p>

                        <p class="body-1" v-if="stage == 2">
                        When you determine that the AI has become good at predicting your assessments, confirm that the AI looks good and proceed to the post-study survey.
                        </p>
                      </template>
                    

                      <template v-else>
                        <p class="body-1">
                          Although you will be able to see the AI's predictions of your assessments on all the tweets of the feed, similar to the previous step, you are only able to change the assessments of {{countOfItemsToAssess}} tweets at a time.
                          The assessments that you can change at a certain time are marked with a blue arrow, similar to the picture below.
                        </p>
                        
                      <v-row no-gutters justify="center">
                          <v-col cols="12">
                          <v-img :contain="true" :src="tweetSelectionURLStage2"></v-img>
                          </v-col>
                      </v-row>
                      </template>

                      <p class="body-1 mt-4">
                      As you are guiding the AI, a list of updated predictions will appear on the side. These are the tweets that the AI has changed its prediction on, based on the feedback that you have given to it. We encourage you to explore this pane. In this pane, you can click on any of the tweet previews (orange arrow shown on the picture below) to bring the actual tweet into view.
                      </p>

                      <v-row no-gutters justify="center">
                        <v-col lg="5" md="6">
                        <v-img :contain="true" :src="updatedPredictionsURL"></v-img>

                        </v-col>
                      </v-row>



                    </template>
                 </v-col>
               </v-row>
             </template>
            

            <v-row no-gutters v-if="!waiting" justify="center"  class="mt-7">
              <v-btn tile outlined color="indigo darken-4" @click="proceed" large>Proceed</v-btn>
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
      tweetSelectionURLStage1: './images/blue_arrow_stage1.png',
      tweetSelectionURLStage2: './images/blue_arrow_stage2.png',
      updatedPredictionsURL: './images/updated_predictions.png'
    }
  },
  created() {
    // console.log('what is stage in waiting page', this.stage)
    this.endTaskStage()
    .then(() => {
      // this.emptyFeed();
      labelServices.checkIfLabelsAreReadyForStage({
        stage: this.stage })
      .then((resp) => {
        // console.log('what is resp', resp)
        if (resp.data)
          this.endWait();
      })
      })
    
  },
  computed: {
    countOfItemsToAssess: function() {
      return constants.CHANGED_ELEMENT_THRESHOLD;
    },
    isUserFreeInAssessment: function() {
      return this.experiment != constants.EXPERIMENT_2 ;
    },
    reasoningCountMin: function() {
      return constants.REASONING_COUNT_MIN;
    },
    stage2RequiredAssessmentCount: function() {
      return constants.STAGE_2_ASSESSMEMT_COUNT_MIN;
    },
    ...mapState('feed', [
        'waiting'
    ]),
    ...mapGetters('auth', [
      'stage',
      'experiment'
    ])
  },
  methods: {
    proceed: function() {

      this.$router.push({ name: 'feed' });
    },
    ...mapActions('feed', [
        'endTaskStage',
        'endWait',
        'emptyFeed'
    ])
  }
  
}
</script>