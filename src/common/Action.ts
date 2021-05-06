export enum ACTION_NAME {
  NEW = 0,
  CHOOSE_SUIT = 1,
  CHOOSE_CARD = 2,
}

export interface Action {
  id: ACTION_NAME;
  cardsIds: number[];
  button: number;
}
