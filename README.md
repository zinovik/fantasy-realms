[![Build Status](https://travis-ci.org/zinovik/fantasy-realms.svg?branch=master)](https://travis-ci.org/zinovik/fantasy-realms)

![logo](./avatar/fantasy-realms.jpg)

# Fantasy Realms

It's not the game itself!

This bot helps only to calculate the points after the [game](https://boardgamegeek.com/boardgame/223040/fantasy-realms).

The same as this [page](https://jpraet.github.io/fantasy-realms) or this application ([iOS](https://apps.apple.com/us/app/wizkids-games-companion/id1294767418)|[Android](https://play.google.com/store/apps/details?id=com.direwolfdigital.wizkids.companion)) but the [Telegram](https://telegram.org) bot.

---

## 1. create and fill .env file (use .env.example for help)

## 2. start the project as lambda function

```bash
npm run start:dev
```

## 3. involve the function

### 3.1 locally using pure JSON

```bash
curl localhost:3000/api/message
```

### 3.2 or setup Telegram bot and send a message

#### locally using [ngrok](https://ngrok.com)

```bash
curl https://api.telegram.org/bot<TELEGRAM_TOKEN>/setWebhook?url=https://<NGROK>.ngrok.io/api/message
```

#### deployed using [vercel](https://vercel.com)

```bash
curl https://api.telegram.org/bot<TELEGRAM_TOKEN>/setWebhook?url=https://fantasy-realms.vercel.app/api/message
```

# Game cards

| #   | Suit     | Name                  | Value | Text                                                                                                                                            |
| --- | -------- | --------------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Army     | Rangers               | 5     | Bonus: +10 for each Land; Clears the word Army from Penalty section of all cards in hand                                                        |
| 2   | Army     | Elven Archers         | 10    | Bonus: +5 if no Weather in hand                                                                                                                 |
| 3   | Army     | Dwarvish Infantry     | 15    | Penalty: -2 for each other Army                                                                                                                 |
| 4   | Army     | Light Cavalry         | 17    | Penalty: -2 for each Land                                                                                                                       |
| 5   | Army     | Celestial Knights     | 20    | Penalty: -8 unless with at least one Leader                                                                                                     |
| 6   | Artifact | Protection Rune       | 1     | Clears the Penalty sections on all cards in hand                                                                                                |
| 7   | Artifact | World Tree            | 2     | Bonus: +50 if every active card in hand is a different suit                                                                                     |
| 8   | Artifact | Book of Changes       | 3     | Bonus: you may change the suit of one other card. Its name, bonuses and penalties remain the same.                                              |
| 9   | Artifact | Shield of Keth        | 4     | Bonus: +15 with any one Leader, +40 with both Leader and Sword of Keth                                                                          |
| 10  | Artifact | Gem of Order          | 5     | Bonus: +10 for 3-card run, +30 for 4-card run, +60 for 5-card run, +100 for 6-card run, +150 for 7-card run                                     |
| 11  | Beast    | Warhorse              | 6     | Bonus: +14 with any Leader or Wizard                                                                                                            |
| 12  | Beast    | Unicorn               | 9     | Bonus: +30 with Princess, +15 with Empress, Queen, or Elemental Enchantress                                                                     |
| 13  | Beast    | Hydra                 | 12    | Bonus: +28 with Swamp                                                                                                                           |
| 14  | Beast    | Dragon                | 30    | Penalty: -40 unless with at least one Wizard                                                                                                    |
| 15  | Beast    | Basilisk              | 35    | Penalty: Blanks all Armies, Leaders, and other Beasts                                                                                           |
| 16  | Flame    | Candle                | 2     | Bonus: +100 with Book of Changes, Bell Tower, and any one Wizard                                                                                |
| 17  | Flame    | Fire Elemental        | 4     | Bonus: +15 for each other Flame                                                                                                                 |
| 18  | Flame    | Forge                 | 9     | Bonus: +9 for each Weapon and Artifact                                                                                                          |
| 19  | Flame    | Lightning             | 11    | Bonus: +30 with Rainstorm                                                                                                                       |
| 20  | Flame    | Wildfire              | 40    | Blanks all cards except Flames, Weather, Wizards, Weapons, Artifacts, Great Flood, Island, Mountain, Unicorn, & Dragon                          |
| 21  | Flood    | Fountain of Life      | 1     | Bonus: Add the base strength of any Weapon, Flood, Flame, Land, or Weather in your hand                                                         |
| 22  | Flood    | Water Elemental       | 4     | Bonus: +15 for each other Flood                                                                                                                 |
| 23  | Flood    | Island                | 14    | Clears the Penalty on any one Flood or Flame                                                                                                    |
| 24  | Flood    | Swamp                 | 18    | Penalty: -3 for each Army and Flame                                                                                                             |
| 25  | Flood    | Great Flood           | 32    | Penalty: Blanks all Armies, all Land except Mountain, all Flames except Lightning                                                               |
| 26  | Land     | Earth Elemental       | 4     | Bonus: +15 for each other Land                                                                                                                  |
| 27  | Land     | Underground Caverns   | 6     | Bonus: +25 with Dwarvish Infantry or Dragon; Clears the Penalty on all Weather                                                                  |
| 28  | Land     | Forest                | 7     | Bonus: +12 for each Beast and Elven Archers                                                                                                     |
| 29  | Land     | Bell Tower            | 8     | Bonus: +15 with any one Wizard                                                                                                                  |
| 30  | Land     | Mountain              | 9     | Bonus: +50 with both Smoke and Wildfire; Clears the Penalty on all Floods                                                                       |
| 31  | Leader   | Princess              | 2     | Bonus: +8 for each Army, Wizard, and other Leader                                                                                               |
| 32  | Leader   | Warlord               | 4     | Bonus: Equal to the base strengths of all Armies in your hand                                                                                   |
| 33  | Leader   | Queen                 | 6     | Bonus: +5 for each Army, +20 for each Army if in the same hand with King                                                                        |
| 34  | Leader   | King                  | 8     | Bonus: +5 for each Army, +20 for each Army if in the same hand with Queen                                                                       |
| 35  | Leader   | Empress               | 10    | Bonus: +10 for each Army; Penalty: -5 for each other leader                                                                                     |
| 36  | Weapon   | Magic Wand            | 1     | Bonus: +25 with any one Wizard                                                                                                                  |
| 37  | Weapon   | Elven Longbow         | 3     | Bonus: +30 with Elven Archers or Warlord or Beastmaster                                                                                         |
| 38  | Weapon   | Sword of Keth         | 7     | Bonus: +10 with any one Leader, +40 with both Leader and Shield of Keth                                                                         |
| 39  | Weapon   | Warship               | 23    | Penalty: Blanked unless with at least one Flood; Clears the word Army from Penalty section of all Floods                                        |
| 40  | Weapon   | War Dirigible         | 35    | Penalty: Blanked unless with at least one Army, Blanked if hand contains any weather                                                            |
| 41  | Weather  | Air Elemental         | 4     | Bonus: +15 for each other Weather                                                                                                               |
| 42  | Weather  | Rainstorm             | 8     | Bonus: +10 for each Flood; Penalty: Blanks all Flames except Lightning                                                                          |
| 43  | Weather  | Whirlwind             | 13    | Bonus: +40 with Rainstorm and either Blizzard or Great Flood                                                                                    |
| 44  | Weather  | Smoke                 | 27    | Penalty: This card is blanked unless with at least one Flame                                                                                    |
| 45  | Weather  | Blizzard              | 30    | Penalty: Blanks all Floods, -5 for each Army, Leader, Beast, and Flame                                                                          |
| 46  | Wild     | Shapeshifter          | 0     | May take on the name and suit of any Artifact, Leader, Wizard, Weapon or Beast. Does not take bonus or penalty.                                 |
| 47  | Wild     | Mirage                | 0     | May take on the name and suit of any Army, Land, Weather, Flood or Flame. Does not take bonus or penalty.                                       |
| 48  | Wild     | Doppelganger          | 0     | May duplicate the name, suit, base strength, and penalty but not bonus of any one other card in your hand                                       |
| 49  | Wizard   | Necromancer           | 3     | Bonus: At the end of the game, you may take one Army, Leader, Wizard, or Beast from the discard pile and add it to your hand as an eighth card. |
| 50  | Wizard   | Elemental Enchantress | 5     | Bonus: +5 for each Land, Weather, Flood, and Flame                                                                                              |
| 51  | Wizard   | Collector             | 7     | Bonus: +10 if three different cards in same suit, +40 if four different cards, +100 if five different cards                                     |
| 52  | Wizard   | Beastmaster           | 9     | Bonus: +9 for each Beast; Clears the Penalty on all Beasts                                                                                      |
| 53  | Wizard   | Warlock Lord          | 25    | Penalty: -10 for each Leader and other Wizard                                                                                                   |
