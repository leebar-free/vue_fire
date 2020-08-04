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
                must-sort
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
            { 
                text: 'UID', 
                value: 'uid',
            },
            { text: 'email', value: 'email' },
            { text: 'Name', value: 'displayName' },
            { text: 'photoURL', value: 'photoURL' },
            ],
            items: [],
            totalCount: 0,
            loading: false,
            options: {
                sortBy: ['email'],
                sortDesc: [false]
            },
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
            this.loading = true
            // console.log('list...in...page :', this.options.page)
            const r = await this.$axios.get('/admin/users', {
                params: {
                    offset: this.options.page > 0 ? (this.options.page -1) * this.options.itemsPerPage : 0,
                    limit: this.options.itemsPerPage,
                    order: this.options.sortBy[0],
                    sort: this.options.sortDesc[0] ? 'desc' : 'asc',
                }
            })
            // console.log( data )
            this.totalCount = r.data.totalCount
            this.items = r.data.items
            this.loading = false
            console.log( this.options )
        }
    },

}
</script>

<style>

</style>