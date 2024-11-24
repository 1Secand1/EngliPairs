<template>
  <div>
    {{ gamesList.name }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const gamesList = ref(JSON.parse(localStorage.getItem("games") || ""));
console.log(gamesList.value);
</script>

<style lang="scss" scoped></style>
