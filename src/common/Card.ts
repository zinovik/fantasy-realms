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
  modifiedBy: string;
  choiceModifier: string;
  allowsNextCardToBeCopy: boolean;
  isIncreaseCardsLimit: boolean;

  isArmyPenaltyIgnored: boolean;
  isHidden: boolean;
  isSelectSuitForNextCard: boolean;

  constructor({
    id,
    suit,
    name,
    originalBaseStrength,
    allowsNextCardToBeCopy = false,
    choiceModifier = '',
    isIncreaseCardsLimit = false,
    isSelectSuitForNextCard = false,
  }: {
    id: number;
    suit: Suit;
    name: string;
    originalBaseStrength: number;
    allowsNextCardToBeCopy?: boolean;
    choiceModifier?: string;
    isIncreaseCardsLimit?: boolean;
    isSelectSuitForNextCard?: boolean;
  }) {
    this.id = id;
    this.name = name;
    this.originalBaseStrength = originalBaseStrength;

    this.suit = suit;

    this.baseStrength = originalBaseStrength;
    this.allowsNextCardToBeCopy = allowsNextCardToBeCopy;
    this.choiceModifier = choiceModifier;
    this.isIncreaseCardsLimit = isIncreaseCardsLimit;
    this.isSelectSuitForNextCard = isSelectSuitForNextCard;

    this.bonus = 0;
    this.penalty = 0;
    this.isBlanked = false;
    this.isClearBaseStrength = false;
    this.isClearBonus = false;
    this.isClearPenalty = false;
    this.modifiedBy = '';
    this.isArmyPenaltyIgnored = false;
    this.isHidden = false;
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
    if (this.isBlanked) {
      return 0;
    }

    if (this.isClearBaseStrength) {
      return 0;
    }

    return this.baseStrength;
  }

  getBonusOrPenalty(): number {
    if (this.isBlanked) {
      return 0;
    }

    return (this.isClearBonus ? 0 : this.bonus) + (this.isClearPenalty ? 0 : this.penalty);
  }

  getNextCardsSuits(): Suit[] {
    return suits;
  }

  getNextCards(cards: Card[]): Card[] {
    return [];
  }

  clearPenalty(cards: Card[]): void {
    //
  }

  blankCards(cards: Card[]): void {
    //
  }

  calculate(cards: Card[]): void {
    //
  }

  getCopy(isIncreaseCardsLimit?: boolean): Card {
    const cardCopy = new Card({
      id: this.getId(),
      suit: this.suit,
      name: this.getName(),
      originalBaseStrength: this.getOriginalBaseStrength(),
      isIncreaseCardsLimit,
    });

    cardCopy.clearPenalty = this.clearPenalty;
    cardCopy.blankCards = this.blankCards;
    cardCopy.calculate = this.calculate;

    return cardCopy;
  }
}
