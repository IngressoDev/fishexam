<template>
  <div class="fishes">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Fishes extends Vue {}
</script>
