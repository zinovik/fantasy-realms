export interface MessengerService {
  sendMessage({ chatId, text, replyMarkup }: { chatId: string; text: string; replyMarkup: string }): Promise<void>;
  answerCallback({ callbackQueryId, text }: { callbackQueryId: string; text?: string }): Promise<void>;
}
