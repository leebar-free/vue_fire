<template>
  <div >
    Home Main Page 
    <v-spacer></v-spacer>
    {{ JSON.stringify($store.state.claims, null, 2) }}
  </div>
</template>

<script>
  export default {
    data () {
      return {
        drawer: false,
        items: [
          {
            icon: 'mdi-alert',
            title: "Home",
            active: true,
            to: '/',
            subItems: [
              {
                title: 'About',
                to: '/about',
                icon: 'mdi-alert',
              },
              {
                title: 'About2',
                to: '/about2',
                icon: 'mdi-alert',
              }
            ]
          },
          {
            icon: 'mdi-alert-box',
            title: "Lectures",
            active: false,
            to: '/about',
            subItems: [
              {
                title: 'card',
                to: '/lectures/card',
                icon: 'mdi-alert-box',
              },
              {
                title: 'layout',
                to: '/lectures/layout',
                icon: 'mdi-alert-box',
              }
            ]
          },
          {
            icon: 'mdi-alert-circle',
            title: "Lectures111",
            to: '/about2',
            subItems: [
              {
                title: 'dashboard',
                to: '/',
                icon: 'mdi-alert-circle',
              }
            ]
          },
        ],

      }
    },
    methods: {
      test () {
        console.log("test....");
        alert("test....");
        this.drawer = !this.drawer;
      }
    }
  }
</script>
