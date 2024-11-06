export namespace TMemoryGame {
  export interface PlayersConfigItem {
    name: string;
  }

  export interface Player extends PlayersConfigItem {
    id: number;
    points: number;
  }

  export interface CardConfigItem {
    text?: string;
    imgUrl?: string;
  }

  export interface Card extends CardConfigItem {
    id: number;
    key: number;
    isOpen: boolean;
    сompleted: boolean;
  }

  type CardsConfigPairedItem = CardConfigItem[];
  type CardsConfigOptionsItem = [CardConfigItem, CardConfigItem][];

  export interface CardsConfig {
    paired?: CardsConfigPairedItem;
    options?: CardsConfigOptionsItem;
  }
}
