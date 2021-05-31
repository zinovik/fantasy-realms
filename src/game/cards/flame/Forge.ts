import { Card } from '../../../common/Card';
import { SUIT_ARTIFACT, SUIT_FLAME, SUIT_WEAPON } from '../../suits';

export class Forge extends Card {
  constructor() {
    super({
      id: 18,
      suit: SUIT_FLAME,
      name: 'Forge',
      originalBaseStrength: 9,
    });
  }

  calculate(cards: Card[]): void {
    this.bonus =
      cards
        .filter((card) => !card.isHidden && !card.isBlanked)
        .filter((card) => [SUIT_WEAPON, SUIT_ARTIFACT].includes(card.suit)).length * 9;
  }
}
