import { Suit } from './Suit';
import { suits } from '../game/suits';

export class Card {
  private id: number;
  private name: string;
  private originalBaseStrength: number;

  suit: Suit;
  baseStrength: number;
  bonus: number;
  penalty: number;
  isBlanked: boolean;
  isClearBaseStrength: boolean;
  isClearBonus: boolean;
  isClearPenalty: boolean;
  modificator: string;
  choiceModificator: string;
  allowsNextCardToBeCopy: boolean;
  isIncreaseCardsLimit: boolean;

  isArmyPenaltyIgnored: boolean;

  constructor({
    id,
    suit,
    name,
    originalBaseStrength,
    allowsNextCardToBeCopy = false,
    choiceModificator = '',
    isIncreaseCardsLimit = false,
  }: {
    id: number;
    suit: Suit;
    name: string;
    originalBaseStrength: number;
    allowsNextCardToBeCopy?: boolean;
    choiceModificator?: string;
    isIncreaseCardsLimit?: boolean;
  }) {
    this.id = id;
    this.name = name;
    this.originalBaseStrength = originalBaseStrength;

    this.suit = suit;

    this.baseStrength = originalBaseStrength;
    this.allowsNextCardToBeCopy = allowsNextCardToBeCopy;
    this.choiceModificator = choiceModificator;
    this.isIncreaseCardsLimit = isIncreaseCardsLimit;

    this.bonus = 0;
    this.penalty = 0;
    this.isBlanked = false;
    this.isClearBaseStrength = false;
    this.isClearBonus = false;
    this.isClearPenalty = false;
    this.modificator = '';
    this.isArmyPenaltyIgnored = false;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getOriginalBaseStrength(): number {
    return this.originalBaseStrength;
  }

  getBaseStrength(): number {
    return this.isBlanked || this.isClearBaseStrength ? 0 : this.baseStrength;
  }

  getBonusOrPenalty(): number {
    return this.isBlanked ? 0 : (this.isClearBonus ? 0 : this.bonus) + (this.isClearPenalty ? 0 : this.penalty);
  }

  getNextCardsSuits(): Suit[] {
    return suits;
  }

  getNextCards(cards: Card[]): Card[] {
    return [];
  }

  blankCards(cards: Card[]): void {
    //
  }

  calculate(cards: Card[]): void {
    //
  }
}
