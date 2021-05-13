import { Card } from '../../../common/Card';
import { SUIT_ARTIFACT } from '../../suits';

export class WorldTree extends Card {
  constructor() {
    super({
      id: 7,
      suit: SUIT_ARTIFACT,
      name: 'World Tree',
      originalBaseStrength: 2,
    });
  }

  calculate(cards: Card[]): void {
    this.bonus = cards.every((card) => cards.filter(({ suit }) => suit === card.suit).length === 1) ? 50 : 0;
  }
}
