import { ParserService } from './ParserService';
import { Action } from '../common/Action';
import { MessageBody } from '../common/MessageBody';
import { CallbackMessageBody } from '../common/CallbackMessageBody';
import { CallbackData } from '../common/CallbackData';

export class TelegramMessage implements ParserService {
  parseMessage(notParsedMessage: string): { action: Action; chatId: string; callbackQueryId: string } {
    const message: MessageBody | CallbackMessageBody = JSON.parse(notParsedMessage);

    if (!this.isCallbackMessage(message)) {
      return this.getNewAction(String(message.message.from.id));
    }

    const callbackQueryId = message.callback_query.id;
    const chatId = String(message.callback_query.from.id);
    const callbackData: CallbackData = JSON.parse(message.callback_query.data);

    const action: Action = {
      id: callbackData.actionId,
      cardsIds: callbackData.cardsIds,
      button: callbackData.button,
    };

    return {
      action,
      chatId,
      callbackQueryId,
    };
  }

  private isCallbackMessage = (message: MessageBody | CallbackMessageBody): message is CallbackMessageBody =>
    'callback_query' in message;

  private getNewAction = (chatId: string): { action: Action; chatId: string; callbackQueryId: string } => ({
    action: ({} as unknown) as Action,
    chatId,
    callbackQueryId: '',
  });
}
