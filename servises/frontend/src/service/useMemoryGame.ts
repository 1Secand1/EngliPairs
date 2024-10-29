import type { TMemoryGame } from "@/types/memoryGame";

export class MemoryGame {
  selectedCardsId = [] as TMemoryGame.Card[];
  currentPlayerId = 0;
  players = [];
  cardsConfig: TMemoryGame.CardsConfig = [];
  cards: TMemoryGame.Card | [] = [];

  constructor(cardsConfig: TMemoryGame.CardsConfig) {
    this.cards = this.parseCardsConfig(cardsConfig);
  }

  getCards() {
    return this.randomArray(this.cards);
  }

  parseCardsConfig(cardsConfig: TMemoryGame.CardsConfig): TMemoryGame.Card[] {
    return cardsConfig.flatMap((item, index) => {
      const iscustomPair = "customPair" in item;
      const cards = iscustomPair
        ? item.customPair || []
        : [item.pair, item.pair];

      return cards.map((card, i) => ({
        id: Number(`${i}${index}`),
        key: index,
        ...card,
      }));
    });
  }

  pickCard(card: TMemoryGame.Card) {
    if (!("id" in card)) {
      console.warn("отсутствует поле id");
      return;
    }

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

  randomArray<T>(array: T[]): T[] {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
}
