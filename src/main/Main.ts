import { MainInterface } from './Main.interface';

import { ParserService } from '../parser/ParserService';
import { GameService } from '../game/GameService';
import { FormatterService } from '../formatter/FormatterService';
import { MessengerService } from '../messenger/MessengerService';

import { ACTION_NAME, Action } from '../common/Action';
import { Card } from '../common/Card';

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
    let cards: Card[] = [];
    let suitIdSelected: number | undefined;

    switch (action.id) {
      case ACTION_NAME.CHOOSE_SUIT:
        if (action.button === 0) {
          cards = this.gameService.getCardsByIds(action.cardsIds.slice(0, -1));
          break;
        }

        cards = this.gameService.getCardsByIds(action.cardsIds);

        if (this.gameService.isSelectedSuitForCard(cards)) {
          cards = this.gameService.getCardsByIds([...action.cardsIds, action.button]);
        } else {
          suitIdSelected = action.button;
        }

        break;

      case ACTION_NAME.CHOOSE_CARD:
        if (action.button === 0) {
          cards = this.gameService.getCardsByIds(action.cardsIds);
          if (this.gameService.chooseFromCards(cards).length > 0) {
            cards = cards.slice(0, -1);
          }
          break;
        }

        cards = this.gameService.getCardsByIds([...action.cardsIds, action.button]);
        break;

      case ACTION_NAME.NEW:
        if (action.button === 0) {
          cards = this.gameService.getCardsByIds(action.cardsIds.slice(0, -1));
          break;
        }

        cards = [];
        break;
    }

    if (this.gameService.isCardsLimit(cards)) {
      console.log('Send RESULT message');

      return this.formatterService.getResultMessage({ cards });
    }

    const cardsToChoose = this.gameService.chooseFromCards(cards, suitIdSelected);

    if (cardsToChoose.length > 0) {
      console.log('Send CARD message');

      return this.formatterService.getChooseCardMessage({ cardsToChoose, cards });
    }

    console.log('Send SUIT message');

    const suits = this.gameService.getSuits(cards);

    return this.formatterService.getChooseSuitMessage({ suits, cards });
  }
}
