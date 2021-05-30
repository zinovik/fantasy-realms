import { Card } from '../../../common/Card';
import { SUIT_BEAST, SUIT_WIZARD } from '../../suits';

export class Dragon extends Card {
  constructor() {
    super({
      id: 14,
      suit: SUIT_BEAST,
      name: 'Dragon',
      originalBaseStrength: 30,
    });
  }

  calculate(cards: Card[]): void {
    this.penalty = cards.filter((card) => !card.isHidden && !card.isBlanked).some((card) => card.suit === SUIT_WIZARD)
      ? 0
      : -40;
  }
}
