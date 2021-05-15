import { Card } from '../common/Card';
import { GameService } from './GameService';
import { Suit } from '../common/Suit';
import { allCards } from './cards';
import { suits } from './suits';

const DEFAULT_CARDS_LIMIT = 7;

export class Game implements GameService {
  getSuits(cards: Card[]): Suit[] {
    const lastCard = this.getLastCard(cards);

    const nextCardsSuits = lastCard ? lastCard.getNextCardsSuits() : suits;

    // return nextCardsSuits.filter((suit) => this.getSuitCards(cards, suit.id).length > 0);
    return nextCardsSuits;
  }

  getCardsByIds(cardsIds: number[]): Card[] {
    console.log('CARDS IDS FROM MESSAGE', cardsIds);

    const cards = cardsIds.reduce((acc, cardId) => {
      const card = allCards.find((card) => card.getId() === cardId) as Card;

      if (this.getCardBeforeLast(acc)?.isSelectSuitForNextCard) {
        const suitCard = new Card({ id: cardId } as any);
        suitCard.isHidden = true;

        return [...acc, suitCard];
      }

      return [...acc, card];
    }, [] as Card[]);

    cards.forEach((card) => card.updateOtherCards(cards));
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
    const cardBeforeLast = this.getCardBeforeLast(cards);

    return cardBeforeLast?.isSelectSuitForNextCard || false;
  }

  chooseFromCards(cards: Card[], suitIdSelected?: number): Card[] {
    const previousCard = this.getLastCard(cards);

    if (suitIdSelected) {
      return this.getSuitCards(cards, suitIdSelected, previousCard);
    }

    if (this.getCardThirdFromTheEnd(cards)?.isSelectSuitForNextCard) {
      return [];
    }

    const nextCards = previousCard ? previousCard.getNextCards(cards) : [];

    return nextCards;
  }

  private getSuitCards(cards: Card[], suitId: number, previousCard?: Card): Card[] {
    const isCopyAllowed = previousCard?.allowsNextCardToBeCopy;

    const suitCards = allCards.filter(
      (card) =>
        card.suit.id === suitId && (isCopyAllowed || cards.every((addedCard) => card.getId() !== addedCard.getId())),
    );

    return suitCards;
  }

  private getLastCard(cards: Card[]): Card | undefined {
    return cards[cards.length - 1];
  }

  private getCardBeforeLast(cards: Card[]): Card | undefined {
    return cards[cards.length - 2];
  }

  private getCardThirdFromTheEnd(cards: Card[]): Card | undefined {
    return cards[cards.length - 3];
  }
}
