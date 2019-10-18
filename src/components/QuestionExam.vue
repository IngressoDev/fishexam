<template>
  <v-container fluid>
    <v-row v-for="(category, cIndex) in categories" :key="category.id">
      <v-col cols="12">
        <v-row>
          <v-col>
            <h1 class="headline">{{category.name}}</h1>
          </v-col>
        </v-row>
        <v-radio-group
          :value="selections.get(`${cIndex}${qIndex}`)"
          @change="(choice) => { startTimer(); selections.set(`${cIndex}${qIndex}`, choice); }"
          v-for="(question, qIndex) in category.questions"
          :key="question.id"
          hide-details
        >
          <v-row class="align-stretch">
            <v-col class="d-flex" :class="getCssClass(cIndex, qIndex)" cols="12" lg="3">
              <div class="d-flex align-center">
                <div class="pl-2 pr-2">{{ qIndex + 1 }}.</div>
                <div>{{ question.q }}</div>
              </div>
            </v-col>
            <v-col class="d-flex" :class="getCssClass(cIndex, qIndex, 'a')" cols="12" md="4" lg="3">
              <v-radio :label="question.a" value="a"></v-radio>
            </v-col>
            <v-col class="d-flex" :class="getCssClass(cIndex, qIndex, 'b')" cols="12" md="4" lg="3">
              <v-radio :label="question.b" value="b"></v-radio>
            </v-col>
            <v-col class="d-flex" :class="getCssClass(cIndex, qIndex, 'c')" cols="12" md="4" lg="3">
              <v-radio :label="question.c" value="c"></v-radio>
            </v-col>
          </v-row>
        </v-radio-group>
      </v-col>
      <v-col class="grey lighten-2" cols="12" v-if="doValidate">
        <div class="d-flex justify-space-around">
          <strong>Richtig beantwortet: {{result.has(cIndex) ? result.get(cIndex) : 0}}</strong>
          <strong>Falsch beantwortet: {{ result.has(cIndex) ? 12 - result.get(cIndex) : 12}}</strong>
        </div>
      </v-col>
    </v-row>

    <v-footer class="px-3" height="50" dark app>
      <div class="title">Verbleibend: {{formateTime()}}</div>
      <v-spacer></v-spacer>
      <v-btn @click="controll" text>{{isExamInProgress ? 'Stop' : 'Start'}}</v-btn>
    </v-footer>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";
import ICategory from "@/interfaces/ICategory";
import IQuestion from "@/interfaces/IQuestion";

@Component
export default class QuestionExam extends Vue {
  private isExamInProgress: boolean = false;
  private time: number = 5400;
  private categories: ICategory[] = [];
  private selections: Map<string, string> = new Map<string, string>();
  private doValidate: boolean = false;
  private result: Map<number, number> = new Map();
  private intervall: number = 0;

  public beforeMount() {
    axios
      .get(
        "https://raw.githubusercontent.com/IngressoDev/fishexam/master/data/questions.json"
      )
      .then((response: AxiosResponse<ICategory[]>) => {
        const categories: ICategory[] = response.data;

        for (const category of categories) {
          do {
            const random = Math.floor(
              Math.random() * category.questions.length
            );
            category.questions.splice(random, 1);
          } while (category.questions.length > 12);
        }

        this.categories = categories;
      });
  }

  private initialize() {
    this.isExamInProgress = false;
    this.time = 5400;
    this.selections = new Map<string, string>();
    this.doValidate = false;
    this.result = new Map();
    this.intervall = 0;
  }

  private controll(): void {
    if (!this.isExamInProgress) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  private validate() {
    this.doValidate = true;

    for (let c = 0; c < this.categories.length; c++) {
      const category: ICategory = this.categories[c];

      for (let q = 0; q < category.questions.length; q++) {
        const question: IQuestion = category.questions[q];

        if (
          this.selections.has(`${c}${q}`) &&
          this.selections.get(`${c}${q}`) === question.s
        ) {
          if (this.result.has(c)) {
             this.result.set(c, this.result.get(c)! + 1);
          } else {
            this.result.set(c, 1);
          }
        }
      }
    }
  }

  private getCssClass(cIndex: number, qIndex: number, choice?: string): string {
    if (this.doValidate) {
      const selection: string | undefined = this.selections.get(
        `${cIndex}${qIndex}`
      );
      const solution: string = this.categories[cIndex].questions[qIndex].s;

      if (selection && selection === solution && !choice) {
        // question field green
        return "green lighten-4";
      } else if (selection && selection === solution && solution === choice) {
        // selected field green
        return "green lighten-4";
      } else if (solution === choice) {
        // solution field green
        return "green lighten-4";
      } else if (
        (!selection && !choice) ||
        (selection && selection !== solution && !choice)
      ) {
        // question field red
        return "red lighten-4";
      } else if (selection && selection !== solution && selection === choice) {
        // selected field red
        return "red lighten-4";
      }
    }

    return "";
  }

  private startTimer(): void {
    if (!this.isExamInProgress) {
      this.initialize();

      this.intervall = setInterval(() => {
        this.time -= 1;

        if (this.time === 0) {
          this.stopTimer();
        }
      }, 1000);

      this.isExamInProgress = true;
    }
  }

  private stopTimer(): void {
    clearInterval(this.intervall);
    this.isExamInProgress = false;

    this.validate();
  }

  private formateTime(): string {
    const min = Math.floor(this.time / 60);
    const sec = ("0" + (this.time - min * 60).toString()).slice(-2);

    return `${min}:${sec}`;
  }
}
</script>

<style>
.v-input--selection-controls .v-input__control {
  width: 100% !important;
}

@media ( min-width: 960px) {
  .v-input--selection-controls {
    margin: 0 !important;
    padding: 0 !important;
  }
}

.v-input--radio-group:nth-of-type(odd) {
  background-color: #eeeeee;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}
</style>

<style scoped>
/* .q-items > div {
  flex-basis: 25%;
}

.question-row:nth-of-type(odd) {
  background-color: #eeeeee;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}

.ac {
  background-color: #a5d6a7;
}

.aw {
  background-color: #ef9a9a;
} */
</style>
