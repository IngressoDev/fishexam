<template>
  <div class="home">
    <v-card class="mx-auto" max-width="800">
      <v-card-title>Herzlich willkommen</v-card-title>
      <v-card-text>
        <div>
        Hier findest du alle Prüfungsfragen und Fische, die du für das Ablegen deiner Fischerprüfung kennen solltest.
        Navigiere einfach über das Menü rechts oben zu den Punkt, der dich interessiert.
        </div>
        <div class="pt-2">
        Nach und nach werden weitere Funktionen ergänzt, also sei gespannt :)
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>
