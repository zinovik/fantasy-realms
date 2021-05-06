import { ReplyMarkup } from './ReplyMarkup';

export interface CallbackMessageBody {
  callback_query: {
    id: string;
    data: string;
    from: {
      id: number;
      is_bot: boolean;
      first_name: string;
      last_name: string;
      username: string;
    };
    message: {
      message_id: number;
      text: string;
      reply_markup: ReplyMarkup;
      chat: {
        id: number;
        username?: string;
      };
    };
  };
}
