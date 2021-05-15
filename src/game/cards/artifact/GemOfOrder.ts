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
        cards
          .filter((card) => !card.isHidden && !card.isBlanked)
          .sort((card1, card2) => card1.getOriginalBaseStrength() - card2.getOriginalBaseStrength())
          .reduce(
            (
              {
                maxInRow,
                currentInRow,
                lastBaseStrength,
              }: { maxInRow: number; currentInRow: number; lastBaseStrength: number },
              card: Card,
            ) => {
              const baseStrength = card.getOriginalBaseStrength();

              return baseStrength === lastBaseStrength + 1
                ? {
                    maxInRow: Math.max(maxInRow, currentInRow + 1),
                    currentInRow: currentInRow + 1,
                    lastBaseStrength: baseStrength,
                  }
                : { maxInRow, currentInRow: 1, lastBaseStrength: baseStrength };
            },
            { maxInRow: 1, currentInRow: 1, lastBaseStrength: -2 },
          ).maxInRow
      ];
  }
}
