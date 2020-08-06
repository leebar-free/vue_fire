<template>
    <v-container grid-list-md fluid>
        <v-card>
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
                <v-btn icon @click="list" :disabled="loading">
                    <v-icon>mdi-refresh</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text>
                <!-- <v-data-table
                    :headers="headers"
                    :items="items"
                    :options.sync="options"
                    :server-items-length="totalCount"
                    :items-per-page="5"
                    :loading="loading"
                    must-sort
                    class="elevation-1"
                ></v-data-table> -->

                <v-data-iterator
                    :items="items"
                    :options.sync="options"
                    :server-items-length="totalCount"
                    :items-per-page="4"
                    :loading="loading"
                >

                <template v-slot:default="props">
                    <!-- <v-row> -->
                    <v-layout row wrap>
                        <v-flex xs12 v-if="loading" class="text-center">
                            <v-progress-circular
                                indeterminate
                                color="primary"
                            ></v-progress-circular>
                            <p>잠시만 기다려 주세요.</p>
                        </v-flex>
                        <v-flex
                            v-else
                            v-for="item in props.items"
                            :key="item.email"
                            xs12
                            sm6
                            md4
                            lg3
                        >
                            <!-- <v-card>
                            <v-card-title class="subheading font-weight-bold">{{ item.email }}</v-card-title>
                            <v-divider></v-divider>
                            <v-list dense>
                                <v-list-item>
                                <v-list-item-content>DisplayName:</v-list-item-content>
                                <v-list-item-content class="align-end">{{ item.displayName }}</v-list-item-content>
                                </v-list-item>
                            </v-list>
                            </v-card> -->

                            <!-- <v-card
                                :loading="loadingCard"
                            >
                                <div class="d-flex flex-no-wrap justify-space-between">
                                    <v-avatar
                                        class="ma-2"
                                        size="125"
                                        tile
                                    >
                                        <v-img :src="item.photoURL | imageCheck"></v-img>
                                    </v-avatar>

                                    <div>
                                        <v-card-title
                                        class="headline mb-2"
                                        v-text="item.email"
                                        ></v-card-title>

                                        <v-card-subtitle >{{ item.displayName | nameCheck }}</v-card-subtitle>
                                        <v-card-subtitle>
                                            <v-select
                                                class="ma-2"
                                                v-model="item.level"
                                                :items="levels"
                                                label="Solo field"
                                                solo
                                                hide-details
                                                @change="levelChange(item)"
                                            ></v-select>

                                        </v-card-subtitle>
                                        
                                    </div>
                                </div>
                            </v-card> -->

                            <user-card :item="item"></user-card>

                        </v-flex>
                    </v-layout>
                    <!-- </v-row> -->
                </template>

                </v-data-iterator>

            </v-card-text>
            <!-- <v-card-actions>
                <v-btn color="success" @click="list">get list</v-btn>
            </v-card-actions> -->
        </v-card>  
    </v-container>
</template>

<script>
import _ from 'lodash'
import UserCard from '@/components/userCard.vue'

export default {
    components: {
        UserCard
    },
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
                { text: 'level', value: 'level' },
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
            loadingSearch: false,
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
      email (n, o) {
          if (n !== o) this.list()
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
                    search: this.email,
                }
            })
            console.log( r.data )
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
                    // console.log(this.emails)
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