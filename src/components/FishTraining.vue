<template>
  <div class="training-fishes">
    <v-tabs :value="fishTab" @change="next" dark show-arrows>
      <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
      <v-tab v-for="(fish, index) in fishes" :key="`tab-${fish.id}`">{{++index}}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="fishTab">
      <v-tab-item v-for="(fish, index) in fishes" :key="`item-${fish.id}`">
        <v-row align="center" justify="center">
          <h1 :class="solutions.has(fish.id) ? '' : 'hidden'">{{fish.name}}</h1>
        </v-row>
        <v-row align="center" justify="center">
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-img
                v-on="on"
                :src="`https://github.com/IngressoDev/fishexam/blob/master/data/images/${fish.image}?raw=true`"
                aspect-ratio="1"
                max-width="500"
                max-height="300"
                contain
              ></v-img>
            </template>
            <ul>
              <li v-for="(info, infoIndex) in fish.info" :key="`info-${infoIndex}`">{{info}}</li>
            </ul>
          </v-tooltip>
        </v-row>
        <v-row align="center" justify="center">
          <h1>{{fish.size}} cm</h1>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="6" md="5" lg="4">
            <v-autocomplete
              :items="fishes.slice().sort((a, b) => {return a.name.localeCompare(b.name) })"
              item-text="name"
              item-value="id"
              :append-outer-icon="solutions.has(fish.id) ? solutions.get(fish.id) ? 'mdi-thumb-up-outline' : 'mdi-thumb-down-outline' : ''"
              @change="(selected) => {onChange(selected, fish.id)}"
              search-input
            ></v-autocomplete>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="3" md="2">
            <v-btn
              @click="() => { next(index + 1) }"
              :color="solutions.has(fish.id) ? solutions.get(fish.id) ? 'success' : 'error' : ''"
              block
            >Weiter</v-btn>
          </v-col>
          <v-col cols="12" sm="3" md="2">
            <v-btn @click="random" block>Zufall</v-btn>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import IFish from "@/interfaces/IFish";

@Component
export default class FishTraining extends Vue {
  private fishes: IFish[] = [];
  private fishTab: number = 0;
  private solutions = new Map<number, boolean>();

  public mounted() {
    axios
      .get(
        "https://raw.githubusercontent.com/IngressoDev/fishexam/master/data/fishes.json"
      )
      .then((res: AxiosResponse<any>) => {
        this.fishes = res.data;
      });
  }

  private onChange(selected: number, solution: number) {
    this.solutions.set(solution, selected === solution);
    this.$forceUpdate();
  }

  private next(index: number): void {
    this.fishTab = index;
  }

  private random(): void {
    let random: number = 0;

    do {
      random = Math.floor(Math.random() * this.fishes.length);
    } while (random === this.fishTab);

    this.fishTab = random;
  }
}
</script>

<style scoped>
.hidden {
  visibility: hidden;
}
</style>
