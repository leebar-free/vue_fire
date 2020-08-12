<template>
    <v-card
        :loading="loading"
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
    </v-card>
</template>

<script>
export default {
    props: ['item'],
    data () {
        return {
            loading: false,
            levels: [
                { value: 0, text: '관리자' },
                { value: 1, text: '사용자' },
                { value: 2, text: '손님' },
            ]
        }
    },
    filters: {
        nameCheck (v) {
            if (v) return v
            return 'no name'
        },
        imageCheck (v) {
            if (v) return v
            return 'https://cdn.vuetifyjs.com/images/cards/halcyon.png'
        },
    },
    methods: {
        levelChange (v) {
            console.log("levelChange :", v)
            this.loading = true
            this.$axios.patch(`/admin/user/${v.uid}/level`, { level: v.level })
            .catch(e => {
                this.$toasted.global.error(e.message)
            })
            .finally(() => {
                this.loading = false
            })
        },
    },

}
</script>

<style>

</style>