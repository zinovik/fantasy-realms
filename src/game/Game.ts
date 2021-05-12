import { Card } from '../common/Card';
import { GameService } from './GameService';
import { Suit } from '../common/Suit';
import { allCards } from './cards';
import { suits } from './suits';

const DEFAULT_CARDS_LIMIT = 7;

export class Game implements GameService {
  getSuits(cards: Card[]): Suit[] {
    const previousCard = this.getPreviousCard(cards);

    const nextCardsSuits = previousCard ? previousCard.getNextCardsSuits() : suits;

    return nextCardsSuits.filter((suit) => this.getSuitCards(cards, suit.id).length > 0);
  }

  getCardsByIds(cardsIds: number[]): Card[] {
    console.log('CARDS IDS FROM MESSAGE', cardsIds);

    const cards = cardsIds.reduce((acc, cardId) => {
      const card = allCards.find((card) => card.getId() === cardId) as Card;

      if (acc[acc.length - 2]?.isSelectSuitForNextCard) {
        const suitCard = new Card({ id: cardId } as any);
        suitCard.isHidden = true;

        return [...acc, suitCard];
      }

      return [...acc, card];
    }, [] as Card[]);

    cards.forEach((card) => card.clearPenalty(cards));
    cards.forEach((card) => card.blankCards(cards));
    cards.forEach((card) => card.calculate(cards));

    console.log('CARDS AFTER CALCULATE: ', cards);

    return cards;
  }

  isCardsLimit(cards: Card[]): boolean {
    const maxCards = cards.reduce((acc, card) => (card.isIncreaseCardsLimit ? acc + 1 : acc), DEFAULT_CARDS_LIMIT);

    return cards.length >= maxCards;
  }

  isSelectedSuitForCard(cards: Card[]): boolean {
    const cardBeforePrevious = cards[cards.length - 2];

    return cardBeforePrevious?.isSelectSuitForNextCard || false;
  }

  chooseFromCards(cards: Card[], suitIdSelected?: number): Card[] {
    const previousCard = this.getPreviousCard(cards);

    if (suitIdSelected) {
      return this.getSuitCards(cards, suitIdSelected, previousCard);
    }

    if (cards[cards.length - 3]?.isSelectSuitForNextCard) {
      return [];
    }

    const nextCards = previousCard ? previousCard.getNextCards(cards) : [];

    return nextCards;
  }

  private getSuitCards(cards: Card[], suitId: number, previousCard?: Card): Card[] {
    const showAllCards = !previousCard || previousCard.allowsNextCardToBeCopy;

    const suitCards = allCards.filter(
      (card) =>
        card.suit.id === suitId && (showAllCards || cards.every((addedCard) => card.getId() !== addedCard.getId())),
    );

    return suitCards;
  }

  private getPreviousCard(cards: Card[]): Card | undefined {
    return cards[cards.length - 1];
  }
}
