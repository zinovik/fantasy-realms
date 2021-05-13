import { Card } from '../../../common/Card';
import { SUIT_ARMY, SUIT_LEADER, SUIT_WEATHER, SUIT_WIZARD } from '../../suits';

export class Princess extends Card {
  constructor() {
    super({
      id: 31,
      suit: SUIT_LEADER,
      name: 'Princess',
      originalBaseStrength: 2,
    });
  }

  calculate(cards: Card[]): void {
    this.bonus =
      cards.filter((card) => card.getId() !== this.getId() && [SUIT_ARMY, SUIT_WIZARD, SUIT_LEADER].includes(card.suit))
        .length * 8;
  }
}
