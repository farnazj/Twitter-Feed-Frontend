<template>
    <v-card rounded="0" flat class="custom-tweet">
        <v-list-item>
            <v-list-item-avatar color="grey darken-3">
                <v-img
                    class="elevation-6"
                    alt=""
                    :src="tweet.TweetSource.imageUrl"
                ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title class="custom-list-title mr-1">{{tweet.TweetSource.name}}</v-list-item-title>
                <v-list-item-subtitle>@{{tweet.TweetSource.username}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-card-text class="body-2">
            {{tweet.text}}
        </v-card-text>

    </v-card>
</template>
<script>

export default {
  name: 'tweet-instance',
  components: {
  },
  data() {
    return {
    }
  },
  props: {
    tweet: {
        type: Object
    }
    },
    computed: {

    }
}
  </script>

  <style scoped>
  .custom-tweet {
    border: 1px #ECEFF1 solid;
    border-bottom: initial;
    width: 100%;
  }

  .custom-list-title {
    display: inline-block;
    flex: initial;
    
  }
  </style>