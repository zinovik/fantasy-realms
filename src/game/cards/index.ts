import { Rangers } from './army/Rangers';
import { ElvenArchers } from './army/ElvenArchers';
import { DwarvishInfantry } from './army/DwarvishInfantry';
import { Cavalry } from './army/Cavalry';
import { CelestialKnights } from './army/CelestialKnights';

import { ProtectionRune } from './artifact/ProtectionRune';
import { WorldTree } from './artifact/WorldTree';
import { BookOfChanges } from './artifact/BookOfChanges';
import { ShieldOfKeth } from './artifact/ShieldOfKeth';
import { GemOfOrder } from './artifact/GemOfOrder';

import { Warhorse } from './beast/Warhorse';
import { Unicorn } from './beast/Unicorn';
import { Hydra } from './beast/Hydra';
import { Dragon } from './beast/Dragon';
import { Basilisk } from './beast/Basilisk';

import { Princess } from './leader/Princess';

import { Shapeshifter } from './wild/Shapeshifter';
import { Mirage } from './wild/Mirage';
import { Doppelganger } from './wild/Doppelganger';

import { Necromancer } from './wizard/Necromancer';

export const allCards = [
  new Rangers(),
  new ElvenArchers(),
  new DwarvishInfantry(),
  new Cavalry(),
  new CelestialKnights(),

  new ProtectionRune(),
  new WorldTree(),
  new BookOfChanges(),
  new ShieldOfKeth(),
  new GemOfOrder(),

  new Warhorse(),
  new Unicorn(),
  new Hydra(),
  new Dragon(),
  new Basilisk(),

  new Princess(),

  new Shapeshifter(),
  new Mirage(),
  new Doppelganger(),

  new Necromancer(),
];
