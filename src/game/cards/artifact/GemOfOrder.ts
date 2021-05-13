import { Card } from '../../../common/Card';
import { SUIT_ARTIFACT } from '../../suits';

const BONUS_MAP: { [key: number]: number } = {
  1: 0,
  2: 0,
  3: 10,
  4: 30,
  5: 60,
  6: 100,
  7: 150,
};

export class GemOfOrder extends Card {
  constructor() {
    super({
      id: 10,
      suit: SUIT_ARTIFACT,
      name: 'Gem of Order',
      originalBaseStrength: 5,
    });
  }

  calculate(cards: Card[]): void {
    this.bonus =
      BONUS_MAP[
        cards.reduce(
          (accMax: number, card: Card) => Math.max(cards.filter(({ suit }) => suit === card.suit).length, accMax),
          1,
        )
      ];
  }
}
