import { Action } from '../common/Action';

export interface ParserService {
  parseMessage(message: string): { action: Action; chatId: string; callbackQueryId: string };
}
