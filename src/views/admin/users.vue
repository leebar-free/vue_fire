<template>
    <v-card>
        <v-card-title primary-title>
            사용자관리
        </v-card-title>
        <v-card-text>
            <v-data-table
                :headers="headers"
                :items="items"
                :options.sync="options"
                :server-items-length="totalCount"
                :items-per-page="5"
                :loading="loading"
                class="elevation-1"
            ></v-data-table>
        </v-card-text>
        <v-card-actions>
            <v-btn color="success" @click="list">get list</v-btn>            
        </v-card-actions>        
    </v-card>  
</template>

<script>
export default {
    data () {
        return {
            headers: [
            { text: 'UID', value: 'uid',},
            { text: 'email', value: 'email' },
            { text: 'Name', value: 'displayName' },
            { text: 'photoURL', value: 'photoURL' },
            ],
            items: [],
            totalCount: 0,
            loading: false,
            options: {},
        }
    },
    watch: {
      options: {
        handler () {
          this.list()
        },
        deep: true,
      },
    },
    methods: {
        async list () {
            // console.log('list...in...page :', this.options.page)
            const { data } = await this.$axios.get('/admin/users', {
                params: {
                    offset: this.options.page > 0 ? (this.options.page -1) * this.options.itemsPerPage : 0,
                    limit: this.options.itemsPerPage
                }
            })
            // console.log( this.options )
            // console.log( data )
            this.totalCount = data.totalCount
            this.items = data.items
        }
    },

}
</script>

<style>

</style>