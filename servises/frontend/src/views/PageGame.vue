<template>
  <section class="conteiner">
    <div
      v-for="card in cards"
      @click="memoryGame.pickCard(card)"
      class="memory-card"
    >
      {{ card.text }}
    </div>
  </section>
</template>
<script setup lang="ts">
interface Card {
  id: number;
  text: string;
}

interface Player {
  name: string;
  points: number;
  selectedCards: Card[];
}

type CardsConfig = (Card | Card[])[];

const cards = [
  { id: 1, key: 1, text: "Огурец" },
  { id: 2, key: 1, text: "Огурец" },
  { id: 3, key: 2, text: "Помидор" },
  { id: 4, key: 2, text: "Помидор" },
] satisfies Card[];

const cardsConfig = [
  {
    text: "Огурец",
    imgUrl: "",
  },
  [
    { text: "Кошка", imgUrl: "" },
    { text: "Cat", imgUrl: "" },
  ],
] as CardsConfig;

class MemoryGame {
  selectedCardsId = [] as Card[];
  currentPlayerId = 0;
  players = [];

  constructor(players) {}

  pickCard(card: Card) {
    if (this.selectedCardsId[0]?.id === card.id) return;

    this.selectedCardsId.push(card);

    if (this.selectedCardsId.length != 2) return;
    const [a, b] = this.selectedCardsId;

    if (a.key == b.key) {
      console.log("Пара");
    } else {
      console.log("не пара");
    }

    this.selectedCardsId.length = 0;
  }
}

const memoryGame = new MemoryGame([]);
</script>
<style scoped>
.memory-card {
  min-width: 100px;
  min-height: 100px;
  background: skyblue;
  cursor: pointer;
}

.conteiner {
  max-width: 300px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
</style>
