<template>
<v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="cyan" dark>
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title>Inbox</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </v-toolbar>

        <!-- <v-list>
          <v-list-tile v-for="item in items" :key="item.title" :to="item.to">
            <v-list-tile-avatar>
              <v-icon> {{item.icon}} </v-icon>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title> {{item.title}} </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list> -->
        <v-list>
          <v-list-item v-for="item in items" :key="item.title" :to="item.to">
            <v-list-item-icon>
              <v-icon > {{item.icon}} </v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
            <!-- <v-list-item-avatar>
              <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar> -->
          </v-list-item>
        </v-list>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            icon: 'mdi-alert',
            title: "Home",
            to: '/'
          },
          {
            icon: 'mdi-alert-box',
            title: "About",
            to: '/about'
          },
          {
            icon: 'mdi-alert-circle',
            title: "About2",
            to: '/about2'
          },
        ],
      }
    }
  }
</script>
