<template>
    <v-card>
        <!-- <v-card-title primary-title>
            <v-combobox
                v-model="search"
                :items="emails"
                label="이메일을 입력하세요."
                :loading="loadingSearch"
                @update:search-input="searchEmails"
            ></v-combobox>
        </v-card-title> -->
        <v-toolbar
            dark
            color="teal"
        >
            <v-toolbar-title>회원관리</v-toolbar-title>
            <v-autocomplete
                v-model="email"
                :loading="loadingSearch"
                :items="emails"
                :search-input.sync="search"
                cache-items
                class="mx-4"
                flat
                hide-no-data
                hide-details
                label="이메일을 입력하세요."
                solo-inverted
                clearable
            ></v-autocomplete>
        </v-toolbar>
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
import _ from 'lodash'

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
            search: '',
            emails: [],
            email: null,
            loadingSearch: false
        }
    },
    watch: {
      options: {
        handler () {
          this.list()
        },
        deep: true,
      },
      search (val) {
        val && val !== this.select && this.searchEmails(val)
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
                    search: this.search,
                }
            })
            // console.log( data )
            this.totalCount = r.data.totalCount
            this.items = r.data.items
            this.loading = false
            // console.log( this.options )
        },
        // async searchEmails () {
        //     console.log( "searchEmails...in" )
        //     this.loadingSearch = true
        //     const { data } = await this.$axios.get('/admin/search')
        //     this.emails = data
        //     this.loadingSearch = false            
        // },
        searchEmails: _.debounce(
            function (val) {
                console.log( "searchEmails...in" )
                this.loadingSearch = true
                this.$axios.get('/admin/search', {
                    params: { search: this.search }
                })
                .then(({ data }) => {
                    this.emails = data
                    console.log(this.emails)
                })
                .catch(e => {
                    this.$toasted.global.error(e.message)
                })
                .finally(() => {
                    this.loadingSearch = false
                    this.list()
                })
            },
            // 사용자가 입력을 기다리는 시간(밀리세컨드) 입니다.
            500
        ),
    },

}
</script>

<style>

</style>