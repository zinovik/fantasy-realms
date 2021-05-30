import { Card } from '../../../common/Card';
import { SUIT_ARMY, SUIT_LEADER, SUIT_WEATHER } from '../../suits';

export class CelestialKnights extends Card {
  constructor() {
    super({
      id: 5,
      suit: SUIT_ARMY,
      name: 'Celestial Knights',
      originalBaseStrength: 20,
    });
  }

  calculate(cards: Card[]): void {
    this.penalty = cards.filter((card) => !card.isHidden && !card.isBlanked).some((card) => card.suit === SUIT_LEADER)
      ? 0
      : -8;
  }
}
