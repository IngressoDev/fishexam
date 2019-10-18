import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Questions from './views/Questions.vue';
import QuestionTraining from '@/components/QuestionTraining.vue';
import QuestionExam from '@/components/QuestionExam.vue';
import Fishes from './views/Fishes.vue';
import FishTraining from '@/components/FishTraining.vue';
// import ExamFishes from '@/components/TrainingFishes.vue';
import FishCompare from '@/components/FishCompare.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
    {
      path: '/questions',
      component: Questions,
      children: [
        {
          path: 'training',
          component: QuestionTraining
        },
        {
          path: 'exam',
          component: QuestionExam
        }
      ]
    },
    {
      path: '/fishes',
      component: Fishes,
      children: [
        {
          path: 'training',
          component: FishTraining
        },
        // {
        //   path: 'exam',
        //   component: ExamFishes
        // }
        {
          path: 'compare',
          component: FishCompare
        }
      ]
    }
  ]
});
