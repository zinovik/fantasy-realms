import { FormatterService } from './FormatterService';
import { Card } from '../common/Card';
import { Suit } from '../common/Suit';
import { ReplyMarkup } from '../common/ReplyMarkup';
import { CallbackData } from '../common/CallbackData';
import { ACTION_NAME } from '../common/Action';

export class TelegramMessage implements FormatterService {
  getChooseSuitMessage({ suits, cards }: { suits: Suit[]; cards: Card[] }): { text: string; replyMarkup: string } {
    const buttons = suits.map((suit) => ({
      text: suit.name as string,
      button: suit.id,
    }));

    if (cards.length > 0) {
      buttons.push(this.getCancelButton());
    }

    return {
      text: this.getCardsText(cards) + `Chose the card suit${this.getChoiceModifier(cards)}:`,
      replyMarkup: this.getButtons(buttons, cards, ACTION_NAME.CHOOSE_SUIT),
    };
  }

  getChooseCardMessage({
    cardsToChoose,
    cards,
  }: {
    cardsToChoose: Card[];
    cards: Card[];
  }): { text: string; replyMarkup: string } {
    const buttons = cardsToChoose
      .filter((card) => !card.isHidden)
      .map((card) => ({
        text: `${card.getOriginalBaseStrength()}. ${card.getName()}`,
        button: card.getId(),
      }));

    buttons.push(this.getCancelButton());

    return {
      text: this.getCardsText(cards) + `Chose the card${this.getChoiceModifier(cards)}:`,
      replyMarkup: this.getButtons(buttons, cards, ACTION_NAME.CHOOSE_CARD),
    };
  }

  private getChoiceModifier(cards: Card[]): string {
    const previousCard = cards[cards.length - 1];
    const cardChoiceModifier = previousCard ? previousCard.choiceModifier : '';
    const choiceModifier = cardChoiceModifier ? ` (${previousCard.choiceModifier})` : '';

    return choiceModifier;
  }

  getResultMessage({ cards }: { cards: Card[] }): { text: string; replyMarkup: string } {
    const buttons = this.getButtons([this.getNewButton(), this.getCancelButton()], cards, ACTION_NAME.NEW);

    return {
      text: this.getCardsText(cards),
      replyMarkup: buttons,
    };
  }

  private getCardsText(cards: Card[]): string {
    if (cards.length === 0) {
      return 'No added cards yet.\n\n';
    }

    const cardsFiltered = cards.filter((card) => !card.isHidden);
    const cardsText = cardsFiltered.map((card) => this.getCardText(card)).join('\n');
    const totalText = `Total: ${cardsFiltered.reduce(
      (acc, card) => acc + card.getBaseStrength() + card.getBonusOrPenalty(),
      0,
    )}`;

    return `Added cards:\n${cardsText}\n${totalText}\n\n`;
  }

  private getCardText(card: Card): string {
    const title = this.getCardTitle(card);
    if (card.isBlanked) {
      return `${title} (BLANKED)`;
    }

    const baseStrength = card.getBaseStrength();
    const bonusOrPenalty = card.getBonusOrPenalty();
    const total = baseStrength + bonusOrPenalty;

    const modifiedBy = card.modifiedBy ? ` - ${card.modifiedBy}` : '';

    return `${title} | ${card.suit.name} | ${total} = ${baseStrength} + ${bonusOrPenalty}${modifiedBy}`;
  }

  private getCardTitle(card: Card): string {
    return `${card.getOriginalBaseStrength()}. ${card.getName()}`;
  }

  private getButtons(buttons: Array<{ text: string; button: number }>, cards: Card[], actionId: number): string {
    const commonCallbackData = {
      cardsIds: cards.map((card) => card.getId()),
      actionId,
    } as Omit<CallbackData, 'button'>;

    const inlineKeyboard = buttons.map(({ text, button }) => [
      {
        text,
        callback_data: JSON.stringify({
          ...commonCallbackData,
          button,
        } as CallbackData),
      },
    ]);

    console.log('INLINE KEYBOARD', inlineKeyboard);

    const keyboard: ReplyMarkup = {
      inline_keyboard: inlineKeyboard,
    };

    return JSON.stringify(keyboard);
  }

  private getCancelButton(): { text: string; button: number } {
    return {
      text: '[ CANCEL ]',
      button: 0,
    };
  }

  private getNewButton(): { text: string; button: number } {
    return {
      text: '[ RESET ]',
      button: 1,
    };
  }
}
