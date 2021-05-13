import { Card } from '../../../common/Card';
import { SUIT_ARMY, SUIT_WEATHER } from '../../suits';

export class ElvenArchers extends Card {
  constructor() {
    super({
      id: 2,
      suit: SUIT_ARMY,
      name: 'Elven Archers',
      originalBaseStrength: 10,
    });
  }

  calculate(cards: Card[]): void {
    this.bonus = cards.every((card) => card.suit !== SUIT_WEATHER) ? 5 : 0;
  }
}
