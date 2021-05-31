import { Card } from '../../../common/Card';
import { SUIT_FLAME, SUIT_WIZARD } from '../../suits';

const BOOK_OF_CHANGES_CARD_ID = 8;
const BELL_TOWER_CARD_ID = 29;

export class Candle extends Card {
  constructor() {
    super({
      id: 16,
      suit: SUIT_FLAME,
      name: 'Candle',
      originalBaseStrength: 2,
    });
  }

  calculate(cards: Card[]): void {
    this.bonus =
      cards
        .filter((card) => !card.isHidden && !card.isBlanked)
        .reduce(
          (acc, card) => {
            if (card.getId() === BOOK_OF_CHANGES_CARD_ID && !acc.isBookOfChanges) {
              return {
                ...acc,
                isBookOfChanges: true,
                cardsMatched: acc.cardsMatched + 1,
              };
            }

            if (card.getId() === BELL_TOWER_CARD_ID && !acc.isBellTower) {
              return {
                ...acc,
                isBellTower: true,
                cardsMatched: acc.cardsMatched + 1,
              };
            }

            if (card.suit === SUIT_WIZARD && !acc.isWizard) {
              return {
                ...acc,
                isBookOfChanges: true,
                cardsMatched: acc.cardsMatched + 1,
              };
            }

            return acc;
          },
          {
            isBookOfChanges: false,
            isBellTower: false,
            isWizard: false,
            cardsMatched: 0,
          },
        ).cardsMatched === 3
        ? 100
        : 0;
  }
}
