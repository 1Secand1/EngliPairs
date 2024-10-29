<template>
  <section class="conteiner">
    <div
      v-for="card in memoryCards"
      :key="card.id"
      @click="memoryGame.pickCard(card)"
      class="memory-card"
    >
      {{ card.text }}
    </div>
  </section>
</template>
<script setup lang="ts">
import { MemoryGame } from "@/service/useMemoryGame";
import type { TMemoryGame } from "@/types/memoryGame";
import { ref } from "vue";

const cardsConfig: TMemoryGame.CardsConfig = [
  { pair: { text: "Огурец" } },
  { pair: { text: "Помидор" } },
  { pair: { text: "Сыр" } },
  { pair: { text: "Вафля" } },
  {
    customPair: [{ text: "Кошка" }, { text: "Cat" }],
  },
];

const memoryGame = new MemoryGame(cardsConfig);
const memoryCards = ref(memoryGame.getCards());
</script>
<style scoped>
.memory-card {
  min-width: 100px;
  min-height: 100px;
  background: skyblue;
  cursor: pointer;
}

.conteiner {
  max-width: 400px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
</style>
