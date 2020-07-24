<template>
  <div>
      <v-btn color="green" @click="set">set</v-btn>
  </div>
</template>

<script>
export default {
    methods: {
        set () {
            this.$store.commit('setTitle', '변한 제목...')
        }
    }

}
</script>

<style>

</style>