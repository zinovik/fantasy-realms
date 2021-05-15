import { Card } from '../../../common/Card';
import { SUIT_ARMY, SUIT_LAND } from '../../suits';

export class Cavalry extends Card {
  constructor() {
    super({
      id: 4,
      suit: SUIT_ARMY,
      name: 'Cavalry',
      originalBaseStrength: 17,
    });
  }

  calculate(cards: Card[]): void {
    this.penalty =
      cards.filter((card) => !card.isHidden && !card.isBlanked).filter((card) => card.suit === SUIT_LAND).length * -2;
  }
}
