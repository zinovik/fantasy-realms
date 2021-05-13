import { Card } from '../../../common/Card';
import { SUIT_ARTIFACT } from '../../suits';

export class ProtectionRune extends Card {
  constructor() {
    super({
      id: 6,
      suit: SUIT_ARTIFACT,
      name: 'Protection Rune',
      originalBaseStrength: 1,
    });
  }

  clearPenalty(cards: Card[]): void {
    cards.every((card) => (card.isClearPenalty = true));
  }
}
