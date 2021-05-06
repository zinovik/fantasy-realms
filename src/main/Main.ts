import { MainInterface } from './Main.interface';

import { ParserService } from '../parser/ParserService';
import { GameService } from '../game/GameService';
import { FormatterService } from '../formatter/FormatterService';
import { MessengerService } from '../messenger/MessengerService';

import { ACTION_NAME, Action } from '../common/Action';

export class Main implements MainInterface {
  constructor(
    private readonly parserService: ParserService,
    private readonly gameService: GameService,
    private readonly formatterService: FormatterService,
    private readonly messengerService: MessengerService,
  ) {
    this.parserService = parserService;
    this.gameService = gameService;
    this.formatterService = formatterService;
    this.messengerService = messengerService;
  }

  async processMessage(message: string): Promise<void> {
    console.log(`New message`);

    const { action, chatId, callbackQueryId } = this.parserService.parseMessage(message);

    const { text, replyMarkup } = this.getMessage(action);

    await this.messengerService.sendMessage({
      chatId,
      text,
      replyMarkup,
    });

    if (callbackQueryId) {
      await this.messengerService.answerCallback({ callbackQueryId, text: 'Done' });
    }
  }

  private getMessage(action: Action): { text: string; replyMarkup: string } {
    switch (action.id) {
      case ACTION_NAME.CHOOSE_SUIT:
        return action.button === 0 ? this.onCancelWhenChooseSuit(action) : this.onChooseSuit(action);

      case ACTION_NAME.CHOOSE_CARD:
        return action.button === 0 ? this.onCancelWhenChooseCard(action) : this.onChooseCard(action);

      case ACTION_NAME.NEW:
        return action.button === 0 ? this.onCancelWhenChooseSuit(action) : this.onNew();

      default: {
        return this.onNew();
      }
    }
  }

  // TODO: Select card if only one suit

  private onCancelWhenChooseSuit(action: Action): { text: string; replyMarkup: string } {
    const cardsIds = action.cardsIds.slice(0, -1);
    const cards = this.gameService.getCardsByIds(cardsIds);

    const cardsToChoose = this.gameService.chooseFromCards(cards);

    if (cardsToChoose.length > 0) {
      return this.formatterService.getChooseCardMessage({ cardsToChoose, cards });
    }

    const suits = this.gameService.getSuits(cards);

    return this.formatterService.getChooseSuitMessage({ suits, cards });
  }

  private onCancelWhenChooseCard(action: Action): { text: string; replyMarkup: string } {
    const cards = this.gameService.getCardsByIds(action.cardsIds);

    const cardsToChoose = this.gameService.chooseFromCards(cards);

    if (cardsToChoose.length > 0) {
      return this.onCancelWhenChooseSuit(action);
    }

    const suits = this.gameService.getSuits(cards);

    return this.formatterService.getChooseSuitMessage({ suits, cards });
  }

  private onChooseSuit(action: Action): { text: string; replyMarkup: string } {
    const cards = this.gameService.getCardsByIds(action.cardsIds);
    const cardsToChoose = this.gameService.getCards(action.button, cards);

    return this.formatterService.getChooseCardMessage({ cardsToChoose, cards });
  }

  private onChooseCard(action: Action): { text: string; replyMarkup: string } {
    const cardsIds: number[] = [...action.cardsIds, action.button];
    const cards = this.gameService.getCardsByIds(cardsIds);

    if (this.gameService.isMaxCards(cards)) {
      return this.formatterService.getResultMessage({ cards });
    }

    const cardsToChoose = this.gameService.chooseFromCards(cards);

    if (cardsToChoose.length > 0) {
      return this.formatterService.getChooseCardMessage({ cardsToChoose, cards });
    }

    const suits = this.gameService.getSuits(cards);

    return this.formatterService.getChooseSuitMessage({ suits, cards });
  }

  private onNew(): { text: string; replyMarkup: string } {
    const cardsIds: number[] = [];
    const cards = this.gameService.getCardsByIds(cardsIds);
    const suits = this.gameService.getSuits(cards);

    return this.formatterService.getChooseSuitMessage({ suits, cards });
  }
}
