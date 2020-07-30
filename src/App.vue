<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <!-- <v-toolbar flat color="transparent">
        <v-toolbar-title>Account</v-toolbar-title>
      </v-toolbar>
      <v-list>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <v-list-tile
            v-for="subItem in item.subItems"
            :key="subItem.title"
            :to="subItem.to"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-icon>{{ subItem.icon }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </v-list> -->

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Account
          </v-list-item-title>
          <!-- <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle> -->
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list nav>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="subItem in item.subItems"
            :key="subItem.title"
            :to="subItem.to"
          >
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    
    <v-app-bar color="indigo" dark app>
      <v-app-bar-nav-icon v-on:click="drawer = !drawer" v-if="$store.state.user"></v-app-bar-nav-icon>
      <v-toolbar-title>미정 0.0.1</v-toolbar-title>
      <!-- <v-toolbar-title>{{ $store.state.title }}</v-toolbar-title> -->
      <!-- <v-toolbar-title>{{ $store.state.user ? $store.state.user.displayName : '아직 로그인 안함' }}</v-toolbar-title> -->
      <!-- <v-toolbar-title>{{ $store.state.token }}</v-toolbar-title> -->
      <v-spacer></v-spacer>
      <v-toolbar-items  v-if="$store.state.user">
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              v-on="on"
            >
              <v-avatar
                :size="32"
                color="grey lighten-4"
              >
                <img src="$store.state.user.photoURL" alt="avatar">
              </v-avatar>
            </v-btn>
          </template>
          <v-card width="320">
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs4>
                  <v-avatar
                    :size="96"
                    color="grey lighten-4"
                  >
                    <img src="$store.state.user.photoURL" alt="avatar">
                    <!-- <img src="https://lh4.googleusercontent.com/-Fx791vz8bTg/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuckwU2Y7e7QUlk0KYUXNbOqZ-bf27Q/photo.jpg" alt="avatar"> -->
                  </v-avatar>
                </v-flex>
                <v-flex xs8>
                  <v-card-text>
                    <span class="font-weight-bold"> {{ $store.state.user.displayName }} </span>
                    <br>
                    <span class="font-weight-thin"> {{ $store.state.user.email }} </span>
                  </v-card-text>
                  
                </v-flex>                
              </v-layout>              
            </v-container>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="signOut">로그아웃</v-btn>
              
            </v-card-actions>
          </v-card>
        </v-menu>

        <!-- <v-btn icon @click="signOut">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn> -->
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <vue-progress-bar></vue-progress-bar>
      <v-container grid-list-md>
        <v-layout row wrap align-center justify-center>
          <v-card color="transparent" flat v-if="!$store.state.firebaseLoaded">
            <v-card-text class="text-xs-center">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-card-text>
            <v-card-text class="text-xs-center">
              인증 상태를 기다리는 중입니다.
            </v-card-text>
          </v-card>
        </v-layout>
      </v-container>
      <router-view />
    </v-main>
  </v-app>

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
              },
              {
                title: 'axios',
                to: '/lectures/axios',
                icon: 'mdi-alert-box',
              },
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
      async signOut () {
        const r = await this.$firebase.auth().signOut()
        console.log(r);
        // this.$Progress.start()
      },
    }
  }
</script>
