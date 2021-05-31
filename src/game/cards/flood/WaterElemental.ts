import { Card } from '../../../common/Card';
import { SUIT_FLOOD } from '../../suits';

export class WaterElemental extends Card {
  constructor() {
    super({
      id: 22,
      suit: SUIT_FLOOD,
      name: 'Water Elemental',
      originalBaseStrength: 4,
    });
  }

  calculate(cards: Card[]): void {
    this.bonus =
      cards
        .filter((card) => !card.isHidden && !card.isBlanked)
        .filter((card) => card.getId() !== this.getId() && card.suit === SUIT_FLOOD).length * 15;
  }
}
