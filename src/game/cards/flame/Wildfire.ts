import { Card } from '../../../common/Card';
import { SUIT_ARTIFACT, SUIT_FLAME, SUIT_WEAPON, SUIT_WEATHER, SUIT_WIZARD } from '../../suits';

const GREAT_FLOOD_CARD_ID = 25;
const ISLAND_CARD_ID = 23;
const MOUNTAIN_CARD_ID = 30;
const UNICORN_CARD_ID = 12;
const DRAGON_CARD_ID = 14;

const NOT_BLANKED_SUITS = [SUIT_FLAME, SUIT_WEATHER, SUIT_WIZARD, SUIT_WEAPON, SUIT_ARTIFACT];
const NOT_BLANKED_CARDS = [GREAT_FLOOD_CARD_ID, ISLAND_CARD_ID, MOUNTAIN_CARD_ID, UNICORN_CARD_ID, DRAGON_CARD_ID];

export class Wildfire extends Card {
  constructor() {
    super({
      id: 20,
      suit: SUIT_FLAME,
      name: 'Wildfire',
      originalBaseStrength: 40,
    });
  }

  blankCards(cards: Card[]): void {
    if (this.isClearPenalty) {
      return;
    }

    cards.forEach((card) => {
      if (!NOT_BLANKED_SUITS.includes(card.suit) && !NOT_BLANKED_CARDS.includes(card.getId())) {
        card.isBlanked = true;
      }
    });
  }
}
