<template>
  <button class="new-game__button">Добавить игру</button>

  <section>
    <div class="card">
      <span>
        <button class="card__edit">✏️</button>
      </span>
      <h3 class="card__title">
        {{ gamesList.name }}
      </h3>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

const gamesList = ref(JSON.parse(localStorage.getItem("games") || ""));
console.log(gamesList.value);
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;

  padding: 10px;

  max-width: 200px;
  min-height: 200px;

  border: solid 1px black;
  border-radius: 10px;
}

.card__edit {
  display: flex;
  margin-left: auto;
}

.card__title {
  margin-left: auto;
  margin-right: auto;
}

.new-game__button {
  width: 100%;
  padding: 10px 0;
}
</style>
