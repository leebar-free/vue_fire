<template>
    <v-container fluid>
        <v-card>
            <v-alert type="error" v-if="!this.$store.state.user.emailVerified" >
                이메일을 확인해 주세요.
            </v-alert>
        </v-card>
    </v-container>
    <!-- <div>
        <p> userProfile Page </p>
        <v-spacer></v-spacer>
        <p> :: state.user :: </p>
        {{ JSON.stringify($store.state.user, null, 2) }}
        <v-spacer></v-spacer>

        <p> :: state.claims :: </p>
        {{ JSON.stringify($store.state.claims, null, 2) }}
        <v-spacer></v-spacer>
        <v-btn color="success" @click="tokenUpdate">tokenUpdate</v-btn>
    </div>   -->
</template>

<script>
export default {
    data () {
        return {

        }
    },
    methods: {
        async tokenUpdate () {
            const user = this.$firebase.auth().currentUser
            await user.getIdToken(true)
            await this.$store.dispatch('getUser', user)
        }
    }
}
</script>
