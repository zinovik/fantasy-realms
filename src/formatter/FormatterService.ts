import { Card } from '../common/Card';
import { Suit } from '../common/Suit';

export interface FormatterService {
  getChooseSuitMessage({ suits, cards }: { suits: Suit[]; cards: Card[] }): { text: string; replyMarkup: string };
  getChooseCardMessage({
    cardsToChoose,
    cards,
  }: {
    cardsToChoose: Card[];
    cards: Card[];
  }): { text: string; replyMarkup: string };
  getResultMessage({ cards }: { cards: Card[] }): { text: string; replyMarkup: string };
}
