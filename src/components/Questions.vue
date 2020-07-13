<template>
  <v-container fluid>
    <div v-for="category in categories" :key="category.id">
      <h6 class="title pt-5">{{category.category}}</h6>
      <v-radio-group
        v-for="(question, qIndex) in category.questions"
        :key="question.id"
        hide-details
        @change="(value) => changeRadioSelection(value, question.s, category.id, question.id)"
      >
        <v-layout class="fill-height" :class="{'even-row': (qIndex % 2 === 0)}" row wrap>
          <v-flex :class="doValidate ? solutionClass(category.id, question.id) : ''" xs12 md3>
            <v-flex class="d-inline-flex align-center fill-height">
              <div class="d-flex px-3 align-center">
                <strong>{{qIndex + 1}}</strong>
              </div>
              <div class="d-flex">{{question.q}}</div>
            </v-flex>
          </v-flex>
          <v-flex :class="{'ac': (doValidate && question.s === 'a')}" xs12 md3 pa-1>
            <v-radio :label="question.a" value="a" :disabled="doValidate"></v-radio>
          </v-flex>
          <v-flex :class="{'ac': (doValidate && question.s === 'b')}" xs12 md3 pa-1>
            <v-radio :label="question.b" value="b" :disabled="doValidate"></v-radio>
          </v-flex>
          <v-flex :class="{'ac': (doValidate && question.s === 'c')}" xs12 md3 pa-1>
            <v-radio :label="question.c" value="c" :disabled="doValidate"></v-radio>
          </v-flex>
        </v-layout>
      </v-radio-group>
      <v-layout class="grey lighten-1 pa-2" v-if="doValidate" row>
        <v-flex offset-xs3 xs3>
          <strong>Richtig beantwortet: {{solutions.filter(s => s.cId === category.id && s.correct).length}}</strong>
        </v-flex>
        <v-flex xs3>
          <strong>Falsch beantwortet: {{12 - solutions.filter(s => s.cId === category.id && s.correct).length}}</strong>
        </v-flex>
      </v-layout>
    </div>

    <v-footer class="px-3" height="50" dark app>
      <div class="title">Verbleibend: {{formateTime()}}</div>
      <v-spacer></v-spacer>
      <v-btn v-model="start" @click="controll" flat>{{this.start ? 'Start' : 'Stop'}}</v-btn>
    </v-footer>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: function() {
    return {
      start: true,
      time: 5400,
      categories: [],
      solutions: [],
      doValidate: false,
      wrong: [],
      correct: [],
      intervall: null
    }
  },
  beforeMount: function() {
    axios
      .get(
        'https://raw.githubusercontent.com/IngressoDev/fishexam/master/data/questions.db'
      )
      .then(response => {
        if (this.$route.name === 'questionstraining') {
          this.categories = response.data
        } else if (this.$route.name === 'questionsexam') {
          for (let category of response.data) {
            const questions = []
            do {
              const random = Math.floor(
                Math.random() * category.questions.length
              )

              if (
                questions.filter(function(question) {
                  return question.id === category.questions[random].id
                }).length === 0
              ) {
                questions.push(category.questions[random])
              }
            } while (questions.length < 10)

            category.questions = questions
            this.categories.push(category)
          }
        }
      })
  },
  methods: {
    initialize: function() {
      this.start = true
      this.time = 5400
      this.solutions = []
      this.doValidate = false
      this.wrong = []
      this.correct = []
      this.intervall = null
    },
    controll: function() {
      if (this.start) {
        this.startTimer()
      } else {
        this.stopTimer()
      }
    },
    validate: function() {
      this.doValidate = true
    },
    solutionClass: function(categoryId, questionId) {
      const solution = this.solutions.find(
        s => s.cId === categoryId && s.qId === questionId
      )

      if (solution !== undefined && solution.correct) {
        return 'ac'
      } else if (solution === undefined || !solution.correct) {
        return 'aw'
      }
    },
    changeRadioSelection: function(answere, solution, categoryId, questionId) {
      if (this.start) {
        this.startTimer()
      }

      const newSolution = {
        cId: categoryId,
        qId: questionId,
        answere: answere,
        solution: solution,
        correct: answere === solution
      }

      const oldSolution = this.solutions.find(
        s => s.cId === categoryId && s.qId === questionId
      )

      if (oldSolution !== undefined) {
        oldSolution.cId = categoryId
        oldSolution.qId = questionId
        oldSolution.answere = answere
        oldSolution.solution = solution
        oldSolution.correct = answere === solution
      } else {
        this.solutions.push(newSolution)
      }
    },
    filter: function(cId, categoryId) {
      return cId === categoryId
    },
    startTimer: function() {
      this.initialize()

      this.intervall = setInterval(() => {
        this.time -= 1

        if (this.time === 0) {
          this.stopTimer()
        }
      }, 1000)

      this.start = !this.start
    },
    stopTimer: function() {
      clearInterval(this.intervall)
      this.start = true

      this.validate()
    },
    formateTime: function() {
      const min = Math.floor(this.time / 60)
      const sec = ('0' + (this.time - min * 60).toString()).slice(-2)

      return `${min}:${sec}`
    }
  }
}
</script>

<style scoped>
.even-row {
  background-color: #eeeeee;
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
}

.ac {
  background-color: #a5d6a7;
}

.aw {
  background-color: #ef9a9a;
}
</style>
