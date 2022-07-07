<template>
    <v-container class="pa-4">
      <v-row no-gutters justify="center">
          <v-col cols="12" xl="8" lg="10" align-self="center" class="pt-10">

                <p class="text-h4">IBM Research Project Participation Consent Form</p>
                <p class="body-1">
                    <span class="text-h5">INTRODUCTION</span>
                    <br>
                    Thank you for deciding to volunteer in an IBM research project. The purpose of this project is to study your interaction with IBM's technology in support of our basic and open research efforts to improve human understanding of the capabilities and limitations of artificially intelligent systems.
                    <br>
                    You have no obligation to participate and you may decide to terminate your participation at any time.  You also understand that the researcher has the right to withdraw you from participation in the project at any time. Below is a description of the research project, and your consent to participate.  Read this information carefully. If you agree to participate, sign in the space provided.
                </p>
                <p class="body-1">
                    <span class="text-h5">RESEARCH PROJECT TITLE</span>
                    <br>
                    Personalized Artifical Intelligence for Learning a User's Accuracy Assessments
                </p>
                <p class="body-1">
                    <span class="text-h5">INVITATION TO PARTICIPATE</span>
                    <br>
                    To be eligible to participate, you must be 18 years of age or older, at least occasionally read news online, and be a US citizen or permanent resident.
                </p>

                <p class="body-1">
                    <span class="text-h5">PROCEDURES</span>
                    <br> 
                    During this project, the following will happen:
                    <br>
                    You will be asked to label the accuracy of a set of tweets. We will use the labels that you provide to train an
                    Artificial Intelligence (AI) model for you which intends to learn and predict how you would label other tweets.
                    <br>
                    Then we will show you another feed of tweets along with the AI's prediction of how you would assess each tweet. Your task is to guide the AI to become better at learning your assessments by indicating whether you agree or disagree with the AI's predictions. You will do this by explicitly assessing tweets as accurate or inaccurate.
                    <br>
                    At the end of the task, you will be asked to complete a survey about your experience interacting with the system.
                    <br>
                    IBM may document and collect information about your participation by collecting instrumentation data from the actions you take in interacting with the website and your answers to survey questions.
                </p>


                <p class="body-1">
                    <span class="text-h5">PERSONAL INFORMATION</span>
                    <br>
                    <span class="text-h6">Personal information we collect:</span> During the project we may collect personal information about you such as your age, gender, ethnicity, occupation, and level of education.
                    <br>
                    <span class="text-h6">How we use personal information:</span> The personal information and other data collected during this project will be used primarily to perform research for purposes described in the introduction above.  Such information and data, or the results of the research may eventually be used to develop and improve our commercial products, services or technologies.
                    <br>
                    <span class="text-h6">How we store and share your personal information:</span> Your personal information will be kept separate from the other information you give, and these two things will be stored in different places. Your personal data will stored for a period of up to 18 months. Except as otherwise described in this document, personal information you provide during this project will not be shared outside of IBM and its subsidiaries and affiliates without your permission.
                    <br>
                    <span class="text-h6">How you can access and control your personal information:</span> If you wish to review or copy any personal information you provided during the study, or if you want us to delete or correct any such data, email your request to the research team at: <a href="mailto:dakuo.wang@ibm.com">dakuo.wang@ibm.com</a>.
                    <br>
                </p>

                <p class="body-1">
                    <span class="text-h5">RESEARCH RESULTS AND FEEDBACK</span>
                    <br>
                    IBM will own all of the research data and analysis and other results (collectively “Research Results”) generated from the information you provide and your participation in the research project. You may also provide suggestions, comments or other feedback (“Feedback”) to IBM with respect to the research project. Feedback is entirely voluntary, and IBM shall be free to use, disclose, reproduce, license, or otherwise distribute, and leverage the Feedback and Research Results.
                </p>
        
                <p class="body-1">
                    <span class="text-h5">BENEFITS AND RISKS</span>
                    <br>
                    <span class="text-h6">Benefits:</span> There will be no direct benefit to the participant for participating in this research. The research's benefit to the society will concern a better understanding of the application of artificially intelligent systems for learning a user's accuracy assessments of content.
                    <br>
                    <span class="text-h6">Risks:</span> During your participation, you may experience stress, boredom, frustration, or discomfort, especially if you perform the task for prolonged periods.
                </p>

                <p class="body-1">
                    <span class="text-h5">PAYMENT FOR PARTICIPATION</span>
                    <br>
                    You will receive a payment in the amount of XXX after completing the entire user study.
                    <br>
                    Your data may be used to make new products, tests, or findings. These may have value and may be developed and owned by IBM and/or others. If this happens, there are no plans to pay you.
                </p>

                <p class="body-1">
                    <span class="text-h5">FUTURE USE OF YOUR IDENTIFIABLE INFORMATION</span>
                    <br>
                    Identifiers might be removed from your identifiable private information, and after such removal, the information could be used for future research studies or distributed to another investigator for future research studies without your (or your legally authorized representative's) additional informed consent.
                </p>
                
                <p class="body-1">
                    <span class="text-h5">CONTACT INFORMATION</span>
                    <br>
                    Should you have any questions concerning this project, or if you are injured as a result of being in this study, please contact the research team at <a href="mailto:dakuo.wang@ibm.com">dakuo.wang@ibm.com</a>.
                </p>

                <p class="body-1">
                    <span class="text-h5">CONSENT</span>
                    <br>
                    By clicking "I agree" below, you confirm that the study was explained to you, you had a chance to ask questions before beginning the study, and all your questions were answered satisfactorily. By clicking "I agree" below, you voluntarily consent to participate, and you do not give up any legal rights you have as a study participant.
                </p>

                <v-form ref="signupForm" lazy-validation>
                    <v-row no-gutters class="my-3">
                        <v-col cols="2">
                            <p class="body-1">Your email:</p>
                        </v-col>
                        <v-col cols="10">
                            <v-text-field v-model="email" type="email" label="Email"
                        tabindex="4" required :rules="formRules.emailRules">
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <p class="subtitle-1 font-weight-medium">Do you understand and consent to these terms?</p>
                    <v-row no-gutters justify="center" class="pt-6">    
                        <v-btn tile outlined  @click="proceed" :disabled="buttonDisabled">I agree</v-btn>
                    </v-row>
                </v-form>
          </v-col>
        </v-row>
    </v-container>  

</template>

<script>
import { mapActions } from 'vuex';


export default {
  name: 'consent-view',
  components: {
  },
  data() {
    return {
        formRules: {
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ]
        },
        buttonDisabled: false,
        email: '',
        alert: false,
        alertMessage: '',
        type: 'info'
    }
  },
  created() {
    
  },
  methods: {
    proceed: function() {

      if (this.$refs.signupForm.validate()) {
        let data = {
            email: this.email,
            password: this.email
        }

        // if (this.mode == 'expf')
        data.exp = 'RQ1';

        this.$store.dispatch('auth/signup', data)
        .then(response => {
            this.type = 'info';
            this.alertMessage = response.data.message;
            this.alert = true;
            this.buttonDisabled = true;

            this.$store.dispatch('auth/login',
            {
                'email': this.email,
                'password': this.email
            })
            .then(() => {
                this.establishConnection()
                .then(() => {
                    this.$router.push({ name: 'instructions' });
                })
                
            })
        })
        .catch(err => {
          this.alertMessage = err.response.data.message;
          this.type = 'error';
          this.alert = true;
        })
      }
    },

    ...mapActions('websocket', [
      'establishConnection'
    ])
  }
  
}
</script>