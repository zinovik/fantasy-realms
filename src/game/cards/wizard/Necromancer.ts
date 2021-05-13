import { Card } from '../../../common/Card';
import { Suit } from '../../../common/Suit';
import { SUIT_ARMY, SUIT_BEAST, SUIT_LEADER, SUIT_WIZARD } from '../../suits';

export class Necromancer extends Card {
  constructor() {
    super({
      id: 49,
      suit: SUIT_WIZARD,
      name: 'Necromancer',
      originalBaseStrength: 3,
      isIncreaseCardsLimit: true,
      choiceModifier: 'NECROMANCER',
    });
  }

  getNextCardsSuits(): Suit[] {
    return [SUIT_ARMY, SUIT_LEADER, SUIT_WIZARD, SUIT_BEAST];
  }
}
