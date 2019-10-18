<template>
  <v-app>
    <v-container>
      <v-app-bar app>
        <v-toolbar-title class="headline text-uppercase">
          <span>Fish</span>
          <span class="font-weight-light">Exam</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text>Fragen</v-btn>
          </template>
          <v-list>
            <v-list-item to="/questions/training">
              <v-list-item-title>Lernen</v-list-item-title>
            </v-list-item>
            <v-list-item to="/questions/exam">
              <v-list-item-title>Prüfung</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text>Fische</v-btn>
          </template>
          <v-list>
            <v-list-item to="/fishes/training">
              <v-list-item-title>Lernen</v-list-item-title>
            </v-list-item>
            <v-list-item to="/fishes/compare">
              <v-list-item-title>Vergleich</v-list-item-title>
            </v-list-item>
            <!-- <v-list-item to="/fishes/exam">
              <v-list-item-title>Prüfung</v-list-item-title>
            </v-list-item>-->
          </v-list>
        </v-menu>
      </v-app-bar>
    </v-container>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  data: () => ({
    //
  })
});
</script>
