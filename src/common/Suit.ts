export enum SUIT_NAME {
  Army = 'Army',
  Artifact = 'Artifact',
  Beast = 'Beast',
  Flame = 'Flame',
  Flood = 'Flood',
  Land = 'Land',
  Leader = 'Leader',
  Weapon = 'Weapon',
  Weather = 'Weather',
  Wild = 'Wild',
  Wizard = 'Wizard',
}

export interface Suit {
  name: SUIT_NAME;
  id: number;
}
