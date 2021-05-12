import * as dotenv from 'dotenv';
import { NowRequest, NowResponse } from '@now/node';

import { ConfigParameterNotDefinedError } from '../src/common/error/ConfigParameterNotDefinedError';
import { Main } from '../src/main/Main';

import { TelegramMessage as TelegramMessageParser } from '../src/parser/TelegramMessage';
import { Game } from '../src/game/Game';
import { TelegramMessage as TelegramMessageFormatter } from '../src/formatter/TelegramMessage';
import { Telegram } from '../src/messenger/Telegram';

dotenv.config();

export default async (_req: NowRequest, res: NowResponse): Promise<void> => {
  console.log('New request');

  if (process.env.TELEGRAM_TOKEN === undefined) {
    throw new ConfigParameterNotDefinedError('TELEGRAM_TOKEN');
  }

  const main = new Main(
    new TelegramMessageParser(),
    new Game(),
    new TelegramMessageFormatter(),
    new Telegram(process.env.TELEGRAM_TOKEN),
  );

  try {
    await main.processMessage(JSON.stringify(_req.body));
  } catch (error) {
    console.error('Unexpected error occurred: ', error);
  }

  res.status(200).send(
    JSON.stringify({
      result: 'success',
    }),
  );
};
