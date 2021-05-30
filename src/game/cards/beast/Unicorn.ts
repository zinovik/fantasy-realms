import { Card } from '../../../common/Card';
import { SUIT_BEAST } from '../../suits';

const PRINCESS_CARD_ID = 31;
const EMPRESS_CARD_ID = 35;
const QUEEN_CARD_ID = 33;
const ELEMENTAL_ENCHANTRESS_CARD_ID = 50;

const BONUS_30_CARDS_IDS = [PRINCESS_CARD_ID];
const BONUS_15_CARDS_IDS = [EMPRESS_CARD_ID, QUEEN_CARD_ID, ELEMENTAL_ENCHANTRESS_CARD_ID];

export class Unicorn extends Card {
  constructor() {
    super({
      id: 12,
      suit: SUIT_BEAST,
      name: 'Unicorn',
      originalBaseStrength: 9,
    });
  }

  calculate(cards: Card[]): void {
    this.bonus = cards
      .filter((card) => !card.isHidden && !card.isBlanked)
      .reduce(
        (bonus, card) =>
          Math.max(
            bonus,
            BONUS_30_CARDS_IDS.includes(card.getId()) ? 30 : BONUS_15_CARDS_IDS.includes(card.getId()) ? 15 : 0,
          ),
        0,
      );
  }
}
