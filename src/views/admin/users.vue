<template>
    <v-card>
        <v-card-title primary-title>
            사용자관리
        </v-card-title>
        <v-card-actions>
            <v-btn color="success" @click="list">get list</v-btn>            
        </v-card-actions>        
    </v-card>  
</template>

<script>
export default {
    data () {
        return {

        }
    },
    methods: {
        async list () {
            console.log('list...in')
            const r = await this.$axios.get('/admin/users')
            console.log(r)
        }
    }

}
</script>

<style>

</style>