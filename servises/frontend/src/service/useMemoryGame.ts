import type { TMemoryGame } from "@/types/memoryGame";

export class MemoryGame {
  currentPlayerId = 0;

  private players: TMemoryGame.Player[] = [];

  private readonly cards: TMemoryGame.Card[] | [] = [];
  selectedCards: TMemoryGame.Card[] = [];

  constructor(
    cardsConfig: TMemoryGame.CardsConfig = {},
    playersConfig: TMemoryGame.PlayersConfigItem[] = []
  ) {
    this.cards = this.parseCardsConfig(cardsConfig);
    this.players = this.parsePlayersConfig(playersConfig);
  }

  addPoint(playerId: number, points: number) {
    return (this.players[playerId].points += points);
  }

  nextPlayer() {
    if (this.currentPlayerId >= this.players.length - 1) {
      this.currentPlayerId = 0;
    } else {
      this.currentPlayerId++;
    }
  }

  getCards() {
    return this.randomArray(this.cards);
  }

  getPlayers() {
    return this.players;
  }

  createCard(
    item: TMemoryGame.CardConfigItem,
    key: number,
    id: number
  ): TMemoryGame.Card {
    return {
      id,
      key,
      isOpen: false,
      сompleted: false,
      ...item,
    };
  }

  createPlayers(id: number, { name } = {} as TMemoryGame.PlayersConfigItem) {
    return {
      id,
      name,
      points: 0,
    };
  }

  parsePlayersConfig(playersConfig: TMemoryGame.PlayersConfigItem[]) {
    return this.randomArray(playersConfig).map((player, index) => {
      return this.createPlayers(index, player);
    });
  }

  parseCardsConfig(cardsConfig: TMemoryGame.CardsConfig): TMemoryGame.Card[] {
    const cards: TMemoryGame.Card[] = [];
    let idCounter = 0;
    let key = 0;

    Object.entries(cardsConfig).forEach((item) => {
      const [type, elements] = item;

      if (type === "paired") {
        elements.forEach((item: TMemoryGame.CardConfigItem) => {
          cards.push(
            this.createCard(item, key, idCounter++),
            this.createCard(item, key, idCounter++)
          );
          key++;
        });
      }

      if (type === "options") {
        elements.forEach((optionGroup: TMemoryGame.CardConfigItem[]) => {
          optionGroup.forEach((item) => {
            cards.push(this.createCard(item, key, idCounter++));
          });
          key++;
        });
      }
    });

    return cards;
  }

  pickCard(card: TMemoryGame.Card) {
    if (this.selectedCards.length >= 2) return;

    if (!("id" in card)) {
      console.warn("отсутствует поле id");
      return;
    }

    if (card.сompleted) return;

    if (this.selectedCards[0]?.id === card.id) return;

    card.isOpen = true;
    this.selectedCards.push(card);

    if (this.selectedCards.length != 2) return;
    const [a, b] = this.selectedCards;

    if (a.key == b.key) {
      console.log("Пара");

      this.addPoint(this.currentPlayerId, 1);

      setTimeout(() => {
        this.selectedCards.forEach((card) => {
          card.сompleted = true;
        });

        this.selectedCards.length = 0;
        this.nextPlayer();
      }, 1000);
    } else {
      console.log("не пара");
      setTimeout(() => {
        this.selectedCards.forEach((card) => {
          card.isOpen = false;
        });

        this.selectedCards.length = 0;
        this.nextPlayer();
      }, 1000);
    }
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
