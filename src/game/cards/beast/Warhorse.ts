import { Card } from '../../../common/Card';
import { SUIT_BEAST, SUIT_LEADER, SUIT_WIZARD } from '../../suits';

export class Warhorse extends Card {
  constructor() {
    super({
      id: 11,
      suit: SUIT_BEAST,
      name: 'Warhorse',
      originalBaseStrength: 6,
    });
  }

  calculate(cards: Card[]): void {
    this.bonus = cards
      .filter((card) => !card.isHidden && !card.isBlanked)
      .find((card) => [SUIT_LEADER, SUIT_WIZARD].includes(card.suit))
      ? 14
      : 0;
  }
}
