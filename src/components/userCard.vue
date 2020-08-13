<template>
    <v-card :loading="loading">
        <v-list-item three-line>
            <v-list-item-avatar
                size="125"
                tile
            >
                <v-img :src="item.photoURL | imageCheck"></v-img>
            </v-list-item-avatar>
            <v-list-item-content class="align-self-start">
                <v-list-item-title
                    class="headline mb-2"
                    v-text="item.email"
                >
                </v-list-item-title>
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
            </v-list-item-content>
        </v-list-item>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="del" color="error">삭제</v-btn>
            
        </v-card-actions>
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
        async del () {
            console.log("del :", `${this.item.uid}`)
            await this.$axios.delete(`/admin/user/${this.item.uid}`)
            this.$emit('del')
        },
    },

}
</script>

<style>

</style>