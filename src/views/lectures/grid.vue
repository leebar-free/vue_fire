<template>
    <v-card color="yellow">
        <v-container >
            <v-row >
                <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    v-for="n in 8"
                    :key="n"
                >
                    <v-card
                        outlined
                        tile
                        color="red"
                    >
                        Column
                    </v-card>

                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
export default {

}
</script>

<style>

</style>