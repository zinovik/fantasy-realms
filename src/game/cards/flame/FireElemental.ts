import { Card } from '../../../common/Card';
import { SUIT_FLAME } from '../../suits';

export class FireElemental extends Card {
  constructor() {
    super({
      id: 17,
      suit: SUIT_FLAME,
      name: 'Fire Elemental',
      originalBaseStrength: 4,
    });
  }

  calculate(cards: Card[]): void {
    this.bonus =
      cards
        .filter((card) => !card.isHidden && !card.isBlanked)
        .filter((card) => card.getId() !== this.getId() && card.suit === SUIT_FLAME).length * 15;
  }
}
