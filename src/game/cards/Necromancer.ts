import { Card } from '../../common/Card';
import { SUIT_WIZARD } from '../suits';

export class Necromancer extends Card {
  constructor() {
    super({
      id: 49,
      suit: SUIT_WIZARD,
      name: 'Necromancer',
      originalBaseStrength: 3,
      isIncreaseCardsLimit: true,
      choiceModificator: 'NECROMANCER',
    });
  }
}
