import { Card } from '../../../common/Card';
import { SUIT_ARMY } from '../../suits';

export class DwarvishInfantry extends Card {
  constructor() {
    super({
      id: 3,
      suit: SUIT_ARMY,
      name: 'Dwarvish Infantry',
      originalBaseStrength: 15,
    });
  }

  calculate(cards: Card[]): void {
    if (this.isArmyPenaltyIgnored) {
      this.penalty = 0;

      return;
    }

    this.penalty =
      cards
        .filter((card) => !card.isHidden && !card.isBlanked)
        .filter((card) => card !== this && card.suit === SUIT_ARMY).length * -2;
  }
}
