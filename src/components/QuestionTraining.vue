<template>
  <div class="training-questions">
    <v-tabs v-model="categoryTab" @change="changeCategory" show-arrows>
      <v-tab v-for="category in categories" :key="`ctab-${category.id}`">{{category.name}}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="categoryTab">
      <v-tab-item v-for="category in categories" :key="`item-${category.id}`">
        <v-tabs :value="questionTab" @change="next" show-arrows>
          <v-tab
            v-for="(question, index) in category.questions"
            :key="`question-${question.id}`"
          >{{index + 1}}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="questionTab">
          <v-tab-item v-for="(question, iQ) in category.questions" :key="`q-item-${question.id}`">
            <v-card>
              <v-card-title class="subtitle-2">{{question.q}}</v-card-title>
              <v-card-text>
                <v-radio-group
                  @change="(value) => { selection.get(category.id).set(question.id, value) }"
                  :disabled="selection.get(category.id).has(question.id)"
                >
                  <v-radio
                    :class="getColor(category.id, question.id, question.s,  'a')"
                    :label="question.a"
                    value="a"
                  ></v-radio>
                  <v-radio
                    :class="getColor(category.id, question.id, question.s,  'b')"
                    :label="question.b"
                    value="b"
                  ></v-radio>
                  <v-radio
                    :class="getColor(category.id, question.id, question.s,  'c')"
                    :label="question.c"
                    value="c"
                  ></v-radio>
                </v-radio-group>
              </v-card-text>
              <v-card-actions>
                <v-btn v-if="!selection.get(category.id).has(question.id)" @click="check">Prüfen</v-btn>
                <v-btn
                  v-if="selection.get(category.id).has(question.id)"
                  @click="() => { next(iQ + 1)}"
                >Weiter</v-btn>
              </v-card-actions>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import ICategory from "@/interfaces/ICategory";

@Component
export default class QuestionTraining extends Vue {
  private categories: ICategory[] = [];
  private categoryTab: number = 0;
  private questionTab: number = 0;
  private selection: Map<number, Map<number, string>> = new Map();

  public mounted(): void {
    axios
      .get(
        "https://raw.githubusercontent.com/IngressoDev/fishexam/master/data/questions.json"
      )
      .then((res: AxiosResponse<ICategory[]>) => {
        const categoryMap: Map<number, Map<number, string>> = new Map();

        for (const category of res.data) {
          categoryMap.set(category.id, new Map<number, string>());
        }

        this.selection = categoryMap;
        this.categories = res.data;
      });
  }

  private check(): void {
    this.$forceUpdate();
  }

  private getColor(cId: number, qId: number, solution: string, choice: string) {
    if (this.selection.get(cId)!.has(qId)) {
      if (
        this.selection.get(cId)!.get(qId)! === solution &&
        solution === choice
      ) {
        return "green lighten-4";
      } else if (
        this.selection.get(cId)!.get(qId)! !== solution &&
        this.selection.get(cId)!.get(qId)! === choice
      ) {
        return "red lighten-4";
      } else if (solution === choice) {
        return "green lighten-4";
      }
    }
  }

  private next(index: number): void {
    this.questionTab = index;
  }

  private changeCategory(): void {
    this.questionTab = 0;
  }
}
</script>

<style>
.v-card__title {
  word-break: normal !important;
}
</style>
