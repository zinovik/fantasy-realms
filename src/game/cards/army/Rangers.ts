import { Card } from '../../../common/Card';
import { SUIT_ARMY, SUIT_LAND } from '../../suits';

export class Rangers extends Card {
  constructor() {
    super({
      id: 1,
      suit: SUIT_ARMY,
      name: 'Rangers',
      originalBaseStrength: 5,
    });
  }

  clearPenalty(cards: Card[]): void {
    cards.forEach((card) => (card.isArmyPenaltyIgnored = true));
  }

  calculate(cards: Card[]): void {
    this.bonus =
      cards.filter((card) => !card.isHidden && !card.isBlanked).filter((card) => card.suit === SUIT_LAND).length * 10;
  }
}
