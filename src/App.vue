<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Account
          </v-list-item-title>
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
      <v-toolbar-title>미정 0.0.1 [ {{ env }} ]</v-toolbar-title>
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
                <img v-if="$store.state.user.photoURL" :src="$store.state.user.photoURL" alt="avatar">
                <v-icon v-else> mdi-account</v-icon>
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
                    <img v-if="$store.state.user.photoURL" :src="$store.state.user.photoURL" alt="avatar">
                    <v-icon v-else> mdi-account</v-icon>
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
              <v-btn color="primary" @click="$router.push('/userProfile')">회원정보</v-btn>
              <v-btn color="primary" @click="signOut">로그아웃</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <vue-progress-bar></vue-progress-bar>
      <v-container grid-list-md v-if="!$store.state.firebaseLoaded">
        <v-layout row wrap align-center justify-center>
          <v-card color="transparent" flat >
            <v-card-text class="text-center">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-card-text>
            <v-card-text class="text-center">
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
        env: process.env.NODE_ENV,
        drawer: false,
        items: [
          {
            icon: 'mdi-alert',
            title: "Home",
            active: true,
            to: '/',
            subItems: [
              {
                title: 'Dashboard',
                to: '/',
                icon: 'mdi-alert',
              },
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
              {
                title: 'rdb',
                to: '/lectures/rdb',
                icon: 'mdi-alert-box',
              },
            ]
          },
          {
            icon: 'mdi-alert-box',
            title: "Admin",
            active: false,
            to: '/admin/users',
            subItems: [
              {
                title: 'users',
                to: '/admin/users',
                icon: 'mdi-alert-box',
              },
            ]
          },
          {
            icon: 'mdi-alert-circle',
            title: "test",
            to: '/about2',
            subItems: [
              {
                title: 'lv0',
                to: '/test/lv0',
                icon: 'mdi-alert-circle',
              },
              {
                title: 'lv1',
                to: '/test/lv1',
                icon: 'mdi-alert-circle',
              },
              {
                title: 'lv2',
                to: '/test/lv2',
                icon: 'mdi-alert-circle',
              },
            ]
          },
        ],

      }
    },
    methods: {
      async signOut () {
        const r = await this.$firebase.auth().signOut()
        // console.log(r);
        this.$router.push('/sign')
        // this.$Progress.start()
      },
    }
  }
</script>
