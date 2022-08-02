<template>
    <v-container class="pa-4">
      <v-row no-gutters justify="center" class="pt-10">
          <v-col cols="12" xl="8" lg="10" align-self="center">

                <p class="text-h4">Task Instructions</p>

                <!-- <p class="body-1">
                  Please read the instructions on this page carefully.
                </p> -->

                <p class="body-1">You will see a feed of tweets related to COVID as shown in the picture.</p>
                <v-row no-gutters class="my-8" justify="center">

                    <v-col cols="11">
                        <v-img :contain="true" :src="imageUrls[0]"></v-img>
                    </v-col>
                    <v-col cols="11">
                        <v-img :contain="true" :src="imageUrls[1]"></v-img>
                    </v-col>
                    
                </v-row>

                <p class="body-1">
                  <span class="font-weight-bold">For all the tweets on the feed, use your best judgment to assess whether they are accurate or inaccurate and how confident you are in your belief.</span> There is also a textbox where you can provide your reasoning for why you believe the tweet is or is not accurate.
                </p> 

                <p class="body-1">
                 Upon marking the the tweet as accurate/inaccurate, two other questions appear in order to capture your confidence in your assessment and your reasoning.
                </p> 

                <p class="body-1">
                We ask that you <span class="font-weight-bold">provide your reasoning for at least {{reasoningCountMin}} of your assessments</span>. You are encouraged to provide your reasoning for as many more tweets as you would like, as it would greatly help our research.
                </p> 

                <p class="body-1">
                   Your task is to use the assessment pane next to each one to label their accuracy. We will use the labels that you provide to train a personalized Artificial Intelligence (AI) model for you which intends to learn and predict how you would label other tweets.
                </p>

                <p class="body-1">
                Once you have assessed and marked your level of confidence for all the tweets as well as provided your reasoning for at least {{reasoningCountMin}} of your assessments, you will be able to proceed to the next step.
                </p>

                <p class="body-1">
                While completing the study, please do not refresh the page.
                </p>
            

            <v-row no-gutters justify="center" class="pt-6">
              <v-btn tile outlined  color="indigo darken-4" @click="proceed">Proceed</v-btn>
            </v-row>
          </v-col>
        </v-row>
    </v-container>  

</template>
<script>
import constants from '@/services/constants'

export default {
  name: 'waiting-view',
  components: {
  },
  data() {
    return {
        imageUrls: [
            './images/assessment_phase_1.png',
            './images/assessment_phase_2.png'
        ]
    }
  },
  created() {
    
  },
  computed: {
    reasoningCountMin: function() {
        return constants.REASONING_COUNT_MIN;
    }
  },
  methods: {
    proceed: function() {
      this.$router.push({ name: 'feed' });
    }
  }
  
}
</script>