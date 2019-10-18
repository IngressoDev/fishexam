<template>
  <div class="fish-compare">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-autocomplete
            label="Auswahl"
            v-model="selectedFishes"
            :items="fishes"
            item-text="name"
            :return-object="true"
            :menu-props="{ maxHeight: '400' }"
            chips
            deletable-chips
            multiple
            clearable
          ></v-autocomplete>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="fish in selectedFishes" :key="'fish-' + fish.id" cols="12" md="6" lg="4" xl="3">
          <v-card>
            <v-img
              class="white--text align-end"
              height="200px"
              :src="`https://github.com/IngressoDev/fishexam/blob/master/data/images/${fish.image}?raw=true`"
              contain
            ></v-img>
            <v-card-title>{{ fish.name }} - {{fish.size}} cm</v-card-title>
            <v-card-text class="text--primary">
              <ul>
                <li v-for="(info, infoIndex) in fish.info" :key="`info-${infoIndex}`">{{info}}</li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import IFish from "@/interfaces/IFish";

@Component
export default class FishTraining extends Vue {
  private fishes: IFish[] = [];
  private selectedFishes: IFish[] = [];

  public mounted() {
    axios
      .get(
        "https://raw.githubusercontent.com/IngressoDev/fishexam/master/data/fishes.json"
      )
      .then((res: AxiosResponse<IFish[]>) => {
        this.fishes = res.data.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      });
  }
}
</script>

