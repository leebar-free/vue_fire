<template>
  <v-layout class="ma-4">
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="blue" dark>
          <v-toolbar-title>here</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="blue" icon>
            <v-icon>mdi-arrange-bring-forward</v-icon>
          </v-btn>

        </v-toolbar>
        <!-- <v-card-title primary-title>
          title
        </v-card-title> -->
        <v-divider></v-divider>
        <v-card-text>
          {{ card_text }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange">click</v-btn>
          <v-btn color="orange" flat>click</v-btn>
        </v-card-actions>

      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.'
      }
    }
  }
</script>
