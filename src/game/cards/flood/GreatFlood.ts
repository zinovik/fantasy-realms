import { Card } from '../../../common/Card';
import { SUIT_ARMY, SUIT_FLAME, SUIT_FLOOD, SUIT_LAND } from '../../suits';

const MOUNTAIN_CARD_ID = 30;
const LIGHTNING_CARD_ID = 19;

export class GreatFlood extends Card {
  constructor() {
    super({
      id: 25,
      suit: SUIT_FLOOD,
      name: 'GreatFlood',
      originalBaseStrength: 18,
    });
  }

  blankCards(cards: Card[]): void {
    if (this.isClearPenalty) {
      return;
    }

    cards.forEach((card) => {
      if (
        (card.suit === SUIT_ARMY && !this.isArmyPenaltyIgnored) ||
        ([SUIT_LAND, SUIT_FLAME].includes(card.suit) && ![MOUNTAIN_CARD_ID, LIGHTNING_CARD_ID].includes(card.getId()))
      ) {
        card.isBlanked = true;
      }
    });
  }
}
