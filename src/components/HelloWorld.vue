<template>
  <v-toolbar >
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title >Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data () {
    return {
      message: '이 페이지는 ' + new Date() + ' 에 로드 되었습니다',
      seen: true,
      todos: [
        { id: 1, text: 'JavaScript 배우기' },
        { id: 2, text: 'Vue 배우기' },
        { id: 3, text: '무언가 멋진 것을 만들기' }
      ]
    }
  }

}
</script>

<style>

</style>
