import { Card } from '../../../common/Card';
import { SUIT_ARMY, SUIT_FLAME, SUIT_FLOOD } from '../../suits';

export class Swamp extends Card {
  constructor() {
    super({
      id: 24,
      suit: SUIT_FLOOD,
      name: 'Swamp',
      originalBaseStrength: 18,
    });
  }

  calculate(cards: Card[]): void {
    this.penalty =
      cards
        .filter((card) => !card.isHidden && !card.isBlanked)
        .filter((card) => [SUIT_ARMY, SUIT_FLAME].includes(card.suit)).length * -8;
  }
}
