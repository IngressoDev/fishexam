<template>
  <div class="questions">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Questions extends Vue {}
</script>
