<template>
    <v-card>
        <v-list-item>
            <v-list-item-avatar color="grey darken-3">
                <v-img
                    class="elevation-6"
                    alt=""
                    :src="tweet.TweetSource.imageUrl"
                ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
                <v-list-item-title>{{tweet.TweetSource.name}}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-card-text class="text-h5 font-weight-bold">
            {{tweet.text}}
        </v-card-text>

    </v-card>
</template>