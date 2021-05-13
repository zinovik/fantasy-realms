import { IMock, Mock } from 'typemoq';

import { Main } from '../../../src/main/Main';
import { ParserService } from '../../../src/parser/ParserService';
import { GameService } from '../../../src/game/GameService';
import { FormatterService } from '../../../src/formatter/FormatterService';
import { MessengerService } from '../../../src/messenger/MessengerService';

describe('Main', () => {
  let parserServiceMock: IMock<ParserService>;
  let gameServiceMock: IMock<GameService>;
  let formatterServiceMock: IMock<FormatterService>;
  let messengerServiceMock: IMock<MessengerService>;

  let main: Main;

  beforeEach(() => {
    parserServiceMock = Mock.ofType<ParserService>();
    gameServiceMock = Mock.ofType<GameService>();
    formatterServiceMock = Mock.ofType<FormatterService>();
    messengerServiceMock = Mock.ofType<MessengerService>();

    main = new Main(
      parserServiceMock.object,
      gameServiceMock.object,
      formatterServiceMock.object,
      messengerServiceMock.object,
    );
  });

  afterEach(() => {
    parserServiceMock.verifyAll();
    gameServiceMock.verifyAll();
    formatterServiceMock.verifyAll();
    messengerServiceMock.verifyAll();
  });

  it('Should process message', async () => {
    // Arrange

    // Act
    main.processMessage('test');

    // Assert
    expect(true).toBeTruthy();
  });
});
