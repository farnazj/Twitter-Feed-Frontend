<template>
    <v-container class="px-4 pt-4 pb-0" fluid>

           <v-progress-circular class="waiting"
                indeterminate v-if="buttonClicked"
                color="primary" :size="120" :width="7"
            ></v-progress-circular>

      <v-row no-gutters justify="center" :class="{'faded': buttonClicked}">
          <v-col cols="12" xl="7" lg="9" align-self="center" class="pt-10">

                <p class="text-h4">IBM Research Project Participation Consent Form</p>
                <div class="text-h5 mb-3">INTRODUCTION</div>
                <p class="body-1">
                    <span class="text-h5">Purpose</span>
                    <br>
                    Thank you for deciding to volunteer in an IBM research project. The purpose of this project is to study your interaction with IBM's technology in support of our basic and open research efforts to improve human understanding of the capabilities and limitations of artificially intelligent systems.
                    <br>
                    You have no obligation to participate and you may decide to terminate your participation at any time.  You also understand that the researcher has the right to withdraw you from participation in the project at any time. Below is a description of the research project, and your consent to participate. Read this information carefully. If you agree to participate, write your Worker ID in the space provided and click "I agree".
                </p>
                <p class="body-1">
                    <span class="text-h5">RESEARCH PROJECT TITLE</span>
                    <br>
                    Personalized Artificial Intelligence for Learning a User's Accuracy Assessments
                </p>
                <p class="body-1">
                    <span class="text-h5">INVITATION TO PARTICIPATE</span>
                    <br>
                    To be eligible to participate, you must be 18 years of age or older, at least occasionally read news online, and be a US citizen or permanent US resident.
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
                    At the end of the task, you will be asked to complete a survey about your experience interacting with the system. The survey will collect some personal information which will be age, education, income, English fluency, and the Mechanical Turk Worker ID.
                    <br>
                    IBM may document and collect information about your participation by collecting instrumentation data from the actions you take in interacting with the website and your answers to survey questions.
                </p>

                <p class="body-1">
                    <span class="text-h5">PARTICIPATION START AND END DATES</span>
                    <br>
                    August 12-22. Participation may close earlier if sufficent number of participants is reached.
                </p>

                <p class="body-1">
                    <span class="text-h5">DATA RETENTION</span>
                    <br>
                    Data will be retained for 2 years from the date of collection.
                </p>

                <!-- <p class="body-1">
                    <span class="text-h5">PERSONAL INFORMATION</span>
                    <br>
                    <span class="text-h6">Personal information we collect:</span> During the project we may collect personal information about you through a survey, such as your age, gender, ethnicity, occupation, and level of education.
                    <br>
                    <span class="text-h6">How we use personal information:</span> The personal information and other data collected during this project will be used primarily to perform research for purposes described in the introduction above.  Such information and data, or the results of the research may eventually be used to develop and improve our commercial products, services or technologies.
                    <br>
                    <span class="text-h6">How we store and share your personal information:</span> Your personal information will be kept separate from the other information you give, and these two things will be stored in different places. Your personal data will be stored for a period of up to 18 months. Except as otherwise described in this document, personal information you provide during this project will not be shared outside of IBM and its subsidiaries and affiliates without your permission.
                    <br>
                    <span class="text-h6">How you can access and control your personal information:</span> If you wish to review or copy any personal information you provided during the study, or if you want us to delete or correct any such data, email your request to the research team at: <a href="mailto:dakuo.wang@ibm.com">dakuo.wang@ibm.com</a>.
                    <br>
                </p> -->

                <!-- <p class="body-1">
                    <span class="text-h5">RESEARCH RESULTS AND FEEDBACK</span>
                    <br>
                    IBM will own all of the research data and analysis and other results (collectively “Research Results”) generated from the information you provide and your participation in the research project. You may also provide suggestions, comments or other feedback (“Feedback”) to IBM with respect to the research project. Feedback is entirely voluntary, and IBM shall be free to use, disclose, reproduce, license, or otherwise distribute, and leverage the Feedback and Research Results.
                </p> -->
        
                <p class="body-1">
                    <span class="text-h5">BENEFITS AND RISKS</span>
                    <br>
                    <span class="text-h6">Benefits:</span> There will be no direct benefit to the participant for participating in this research. The study is to further the research and development in this space. The research's benefit to the society will concern a better understanding of the application of artificially intelligent systems for learning a user's accuracy assessments of content.
                    <br>
                    <span class="text-h6">Risks:</span> We do not anticipate any risks to you as a result of participating in this study.
                </p>

                <p class="body-1">
                    <span class="text-h5">PAYMENT FOR PARTICIPATION</span>
                    <br>
                    You will receive a payment in the amount of $17 after completing the entire user study through the Mechanical Turk platform.
                    <br>
                    Your data may be used to make new products, tests, or findings. These may have value and may be developed and owned by IBM and/or others. If this happens, there are no plans to pay you.
                </p>

                <!-- <p class="body-1">
                    <span class="text-h5">FUTURE USE OF YOUR IDENTIFIABLE INFORMATION</span>
                    <br>
                    Identifiers might be removed from your identifiable private information, and after such removal, the information could be used for future research studies or distributed to another investigator for future research studies without your (or your legally authorized representative's) additional informed consent.
                </p> -->
                
                 <p class="body-1">
                    <span class="text-h5">DATA COLLECTION AND USE</span>
                    <br>
                    In addition, your data results may be used to publish papers and present in conferences. The data will be stored in IBM for 2 years since collection.
                </p>


                <p class="body-1">
                    <span class="text-h5">CONFIDENTIALITY</span>
                    <br>
                    The investigators and their assistants will consider your records confidential to the extent permitted by law. Your records and results will nto be identified as pertaining to you in any publication without your expressed permission. Although personal information will be collected at the time of participation, we will not disclose  any personally identifiable information to the extent such personally identifiable information was collected.
                    </p>

                <p class="body-1">
                    <span class="text-h5">WHOM TO CONTACT FOR ANSWERS</span>
                    <br>
                    If you have any questions or concerns bout this research study, feel free to ask for additional information from the research team at <a href="mailto:dakuo.wang@ibm.com">dakuo.wang@ibm.com</a>.
                </p>


                <p class="body-1">
                    <span class="text-h5">RIGHT TO WITHDRAW</span>
                    <br>
                    Your participation in this study is voluntary. You may refuse to take part in this study or end your participation (withdraw consent and discontinue participation) in this study at any time without risk, penalty, or loss of benefits that you are otherwise entitled to receive.
                    <br>
                    Although unlikely, the investigator or her assistants can also stop your continued participation in this study. For example, if you do not follow the investigator's instructions we may ask you to stop. If you participated and wish for your information to be removed or you wish to cancel your participation, you will need to send an email to <a href="mailto:dakuo.wang@ibm.com">dakuo.wang@ibm.com</a>to request to remove your data from this study and cancel your participation in this study.
                </p>


                <p class="body-1">
                    <span class="text-h5">RIGHTS IN INFORMATION</span>
                    <br>
                    Subject to your right to withdraw, all information, including but not limited to paper forms, computer log files, audio and video recordings, recorded or created during the session shall be the sole property of IBM Corporation and IBM Corporation shall hold the copyright. IBM Corporation shall hold the title to any inventions made during the course of the session.
                </p>

                <p class="body-1">
                    <span class="text-h5">CONSENT</span>
                    <br>
                    By clicking "I agree" below, you confirm that the study was explained to you, you had a chance to ask questions before beginning the study, and all your questions were answered satisfactorily. By clicking "I agree" below, you voluntarily consent to the collection and use of the data collected. 
                    <br>
                    You can participate in this study only once.
                </p>

                <v-form ref="signupForm"  lazy-validation>
                    <v-row no-gutters class="my-3">
                        <v-col cols="2">
                            <p class="body-1">Your worker ID:</p>
                        </v-col>
                        <v-col cols="10">
                            <v-text-field v-model="workerId" label="Worker ID" :rules="formRules.workerIdRules"
                        tabindex="4" required >
                            </v-text-field>
                        </v-col>
                    </v-row>

                    <p class="subtitle-1 font-weight-medium">Do you understand and consent to these terms?</p>
                    <v-row no-gutters justify="center" class="pt-6">    
                        <v-btn tile outlined color="indigo darken-4" @click="proceed" :disabled="buttonClicked">I agree</v-btn>
                    </v-row>
                </v-form>

               
                <v-snackbar v-model="alert">
                {{ alertMessage }}

                    <template v-slot:action="{ attrs }">
                        <v-btn color="pink" text v-bind="attrs"
                        @click="alert = false"> Close</v-btn>
                    </template>
                </v-snackbar>
          </v-col>
        </v-row>

         <v-footer color="blue lighten-5" class="mt-5">
            <v-col class="text-center" cols="12">
                <a href="https://www.ibm.com/us-en/privacy" target="_blank">View IBM Privacy Policy</a>
            </v-col>
         </v-footer>

    </v-container>  

</template>

<script>
import { mapActions } from 'vuex';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'consent-view',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
        formRules: {
            // emailRules: [
            //     v => !!v || 'E-mail is required',
            //     v => /.+@.+/.test(v) || 'E-mail must be valid'
            // ]
            workerIdRules: [
                v => !!v || 'Worker ID is required',
                v => /^[a-zA-Z0-9]+$/.test(v) || 'Worker ID must only consist of numbers and letters'
            ]
        },
        buttonClicked: false,
        workerId: '',
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
            workerId: this.workerId,
            password: this.workerId
        }
       
        this.buttonClicked = true;

        this.$store.dispatch('auth/signup', data)
        .then(response => {
            this.type = 'info';
            this.alertMessage = response.data.message;
            this.alert = true;

            this.$store.dispatch('auth/login',
            {
                'workerId': this.workerId,
                'password': this.workerId
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
            this.buttonClicked = false;
        })
      }
    },

    ...mapActions('websocket', [
      'establishConnection'
    ])
  }
  
}
</script>

<style scoped>
.waiting {
    z-index: 20;
    position: fixed;
    top: 48%;
    left: 48%;
}

.faded {
    opacity: 0.5;
}
</style>