<template>
  <div class="wraper">
    <ul class="playersList">
      <li
        v-for="{ id, name, points } in memoryPlayers"
        :key="id"
        :style="{
          color: id === memoryGame.currentPlayerId ? 'blueviolet' : '',
        }"
      >
        <p>Игрок - {{ name }}</p>
        <p>Отгадано - {{ points }}</p>
      </li>
    </ul>
    <section class="conteiner">
      <div
        v-for="card in memoryCards"
        :key="card.id"
        @click="memoryGame.pickCard(card)"
        class="memory-card"
      >
        <template v-if="card.completed"></template>

        <template v-else-if="card.isOpen">
          {{ card.text }}
        </template>

        <template v-else>🩷</template>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import router from "@/router";
import { MemoryGame } from "@/service/useMemoryGame";
import type TMemoryGame from "TMemoryGame";
import { ref } from "vue";

const cardsConfig: TMemoryGame.CardsConfig = {
  paired: [{ text: "Вафля" }],
  options: [[{ text: "Кошка" }, { text: "Cat" }]],
};

const playersConfig: TMemoryGame.PlayersConfigItem[] = [
  { name: "Вася" },
  { name: "Петя" },
];

const memoryGame = new MemoryGame(cardsConfig, playersConfig);
const memoryCards = ref(memoryGame.getCards());
const memoryPlayers = ref(memoryGame.getPlayers());

memoryGame.gameOver(({ name }) => {
  const replayGame = confirm(`Победил ${name}, хотыте сыграть ещё ?`);

  if (replayGame) {
    memoryGame.restartGame();
  } else {
    router.push("/");
  }
});

// memoryGame.winning();
</script>
<style scoped>
.wraper {
  display: flex;
}
.memory-card {
  display: grid;
  place-items: center;

  min-width: 100px;
  min-height: 100px;
  background: skyblue;
  cursor: pointer;
}

.playersList {
  display: flex;
  flex-direction: column;

  list-style-type: none;

  gap: 10px;
}

.conteiner {
  max-width: 300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
</style>
