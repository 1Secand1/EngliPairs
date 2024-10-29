export namespace TMemoryGame {
  export interface Player {
    name: string;
    points: number;
    selectedCards: Card[];
  }
  export interface CardConfigItem {
    text?: string;
    imgUrl?: string;
  }

  export interface Card extends CardConfigItem {
    id: number;
    key: number;
  }

  export type CardsConfig = (
    | { pair: CardConfigItem }
    | { customPair: CardConfigItem[] }
  )[];
}
