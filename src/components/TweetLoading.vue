<template>
    <v-row no-gutters class="mt-3" v-if="loading">
        <v-col cols="8" class="pa-0">
            <v-skeleton-loader
                v-bind="attrs"
                type="list-item-avatar, list-item-two-line"
            ></v-skeleton-loader>
        </v-col>
    </v-row>
</template>
<script>

import { mapState } from 'vuex'

export default {
    name: 'tweet-loading',
    components: {
    },
    data() {
        return {
            attrs: {
                class: 'mb-6',
                boilerplate: true,
                elevation: 2
            }
        }
    },
    created() {
        console.log('loader', this.loading)
    },
    computed: {
        ...mapState('loader', [
            'loading'
        ])
    }
}
</script>

<style scoped>

</style>