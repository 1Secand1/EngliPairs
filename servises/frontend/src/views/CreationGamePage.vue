<template>
  <div class="">
    <label for="">Название игры</label>
    <input
      v-model="gameName"
      type="text"
    />
  </div>

  <div>
    <p>Выберете размер поля</p>
    <ul class="field-size__list">
      <li
        v-for="{ numberOfPairs, title } in defaultFieldSizes"
        :key="numberOfPairs"
        class="field-size__item"
      >
        <button
          @click="selectedNumberOfPairs = numberOfPairs"
          class="field-size__button"
        >
          {{ title }}
        </button>
      </li>
    </ul>

    <!-- <button class="field-size__button">Другое</button> -->
  </div>

  <div v-if="selectedNumberOfPairs">
    <p>
      Добавленно парных карточек -
      {{ pairs.size }} из {{ selectedNumberOfPairs }}
    </p>

    <ul>
      <li
        v-for="([key, value], index) in [...pairs.entries()]"
        :key="key"
        style="margin-top: 15px"
      >
        <div style="display: flex; gap: 10px">
          <p>{{ index + 1 }}</p>
          <button
            v-if="pairs.size !== 1"
            @click="pairs.delete(key)"
          >
            Удалить
          </button>
        </div>

        <div
          v-for="(card, index) in value.cards"
          :key="index"
        >
          <input v-model="card.text" />
          <button>Выбрать картинку</button>
        </div>

        <button
          v-if="value.cards.length !== 2"
          @click="addCard(value)"
        >
          расширить
        </button>
      </li>
    </ul>

    <br />
    <br />

    <div style="display: flex; gap: 10px">
      <button @click="addPair">Добавить карточку</button>
      <button @click="save">Сохранить</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import type TMemoryGame from "TMemoryGame";
import { getRandomId } from "@/utils/getRandomId";
import { ref, toRaw } from "vue";

type pairsMapItem = { type: string; cards: TMemoryGame.CardConfigItem[] };

const gameName = ref("");
const selectedNumberOfPairs = ref<number | null>(null);
const pairs = ref<Map<number, pairsMapItem>>(new Map());

pairs.value.set(0, { type: "paired", cards: [{ text: "" }] });

const defaultFieldSizes = [
  {
    title: "4x4",
    numberOfPairs: 8,
  },
  {
    title: "6x6",
    numberOfPairs: 18,
  },
  {
    title: "8x8",
    numberOfPairs: 32,
  },
];

function addPair() {
  const item = {
    type: "paired",
    cards: [{ text: "", imgUrl: "" }],
  };

  pairs.value.set(getRandomId(), item);
}

function addCard(array: pairsMapItem) {
  array.type = "options";
  array.cards.push({ text: "" });
}

function save() {
  const game = {
    name: gameName.value,
    pairs: [...toRaw(pairs.value).values()],
  };

  localStorage.setItem("games", JSON.stringify(game));
}
</script>

<style scoped>
.field-size__list {
  display: flex;
  justify-content: space-between;

  width: 100%;
  gap: 10px;
  padding: 0;

  list-style-type: none;
}

.field-size__item {
  width: 100%;
  background-color: none;
}

.field-size__button {
  width: 100%;
  padding: 2px 5px;

  background: rgb(20, 189, 255);
  color: white;

  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
