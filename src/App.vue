<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title class="headline text-uppercase">
        <span>Fish</span>
        <span class="font-weight-light">Exam</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-menu offset-y>
        <v-btn slot="activator">Lernen</v-btn>
        <v-list>
          <v-list-tile to="/training/questions">
            <v-list-tile-title>Fragen</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>-->
      <v-menu offset-y>
        <v-btn slot="activator" flat>Prüfung</v-btn>
        <v-list>
          <v-list-tile to="/exam/questions">
            <v-list-tile-title>Fragen</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      //
    }
  }
}
</script>

<style>
.v-input--selection-controls .v-input__control {
  width: 100% !important;
}

.v-radio {
  height: 100% !important;
}

.v-input--selection-controls {
  margin-top: 0 !important;
  padding-top: 0 !important;
}
</style>
