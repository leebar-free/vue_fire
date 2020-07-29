<template>
    <v-container fluid grid-list-xs>
        <v-layout row wrap>
            <v-flex xs12>
                <v-toolbar color="blue">
                    axios eg
                </v-toolbar>
            </v-flex>
            <v-flex xs3 >
                <v-card>
                    <v-card-title primary-title>
                        create
                    </v-card-title>
                    <v-card-text>
                        <v-textarea
                            v-model="textCreate"
                            rows="10"
                        ></v-textarea>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn text color="blue" @click="create">submit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex xs3 >
                <v-card>
                    <v-card-title primary-title>
                        read
                    </v-card-title>
                    <v-card-text>
                        <v-textarea
                            v-model="textRead"
                            rows="10"
                        ></v-textarea>                    </v-card-text>
                    <v-card-actions>
                        <v-btn text color="blue" @click="read">submit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex xs3 >
                <v-card>
                    <v-card-title primary-title>
                        update
                    </v-card-title>
                    <v-card-text>
                        <v-textarea
                            v-model="textUpdate"
                            rows="10"
                        ></v-textarea>                    </v-card-text>
                    <v-card-actions>
                        <v-btn text color="blue" @click="update">submit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex xs3 >
                <v-card>
                    <v-card-title primary-title>
                        delete
                    </v-card-title>
                    <v-card-text>
                        <v-textarea
                            v-model="textDelete"
                            rows="10"
                        ></v-textarea>                    </v-card-text>
                    <v-card-actions>
                        <v-btn text color="blue" @click="del">submit</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    data () {
      return {
        textCreate: '',
        textRead: '',
        textUpdate: '',
        textDelete: '',
      }
    },
    methods: {
        async create () {
            // this.$axios.post('http://localhost:5001/vue-fire-99d24/us-central1/test/')
            //     .then(r => {
            //         this.textCreate = r.data
            //     })
            //     .catch(e => console.error(e))
            // this.$toasted.global.error('오류가 났습니다...')

            // const r = await this.$axios.post('http://localhost:5001/vue-fire-99d24/us-central1/test/')
            const r = await this.$axios.post('test')
            this.textCreate = r.data
        },
        read () {
            this.$axios.get('http://localhost:5001/vue-fire-99d24/us-central1/test/')
                .then(r => {
                    this.textRead = r.data
                })
                .catch(e => console.error(e))

        },
        update () {
            this.$axios.put('http://localhost:5001/vue-fire-99d24/us-central1/test/1234')
                .then(r => {
                    this.textUpdate = r.data
                })
                .catch(e => console.error(e))

        },
        del () {
            this.$axios.delete('http://localhost:5001/vue-fire-99d24/us-central1/test/5678')
                .then(r => {
                    this.textDelete = r.data
                })
                .catch(e => console.error(e))
            
        },
    }
  }
</script>
