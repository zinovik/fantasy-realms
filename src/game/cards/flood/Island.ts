import { Card } from '../../../common/Card';
import { SUIT_FLOOD } from '../../suits';

export class Island extends Card {
  constructor() {
    super({
      id: 23,
      suit: SUIT_FLOOD,
      name: 'Island',
      originalBaseStrength: 4,
    });
  }

  clearPenalty(cards: Card[]): void {
    //
  }
}
