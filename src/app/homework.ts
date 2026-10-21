export interface VocabularyWord {
  swedish: string;
  german: string;
}

export interface PhysicsTerm {
  term: string;
  definition: string;
  image: string;
  aliases?: string[];
}

// Uppdatera innehållet här när en ny veckas läxor kommer.
export const germanWords: VocabularyWord[] = [
  { swedish: 'Veckodagarna', german: 'die Wochentage' },
  { swedish: 'Måndag', german: 'Montag' },
  { swedish: 'På måndag', german: 'am Montag' },
  { swedish: 'Tisdag', german: 'Dienstag' },
  { swedish: 'På tisdag', german: 'am Dienstag' },
  { swedish: 'Onsdag', german: 'Mittwoch' },
  { swedish: 'På onsdag', german: 'am Mittwoch' },
  { swedish: 'Torsdag', german: 'Donnerstag' },
  { swedish: 'På torsdag', german: 'am Donnerstag' },
  { swedish: 'Fredag', german: 'Freitag' },
  { swedish: 'På fredag', german: 'am Freitag' },
  { swedish: 'Lördag', german: 'Samstag' },
  { swedish: 'På lördag', german: 'am Samstag' },
  { swedish: 'Söndag', german: 'Sonntag' },
  { swedish: 'På söndag', german: 'am Sonntag' }
];

export const physicsTerms: PhysicsTerm[] = [
  {
    term: 'acceleration',
    definition: 'När ett föremål ändrar sin hastighet, både en ökning och en minskning.',
    image: 'acceleration.svg',
    aliases: ['accelerera']
  },
  {
    term: 'gravitationskraft',
    definition: 'Kraften mellan föremål som dras mot varandra. På jorden dras vi mot jordens mitt. Kallas även tyngdkraft och dragningskraft.',
    image: 'gravity.svg',
    aliases: ['tyngdkraft', 'dragningskraft']
  },
  {
    term: 'kraft/motkraft',
    definition: 'En kraft får något att röra på sig eller ändra riktning. Motkraften är lika stor och riktad åt motsatt håll.',
    image: 'force.svg',
    aliases: ['kraft', 'motkraft']
  },
  {
    term: 'friktionskraft',
    definition: 'Kraften mellan två ytor som gnids mot varandra. Denna kraft bromsar eller ökar farten.',
    image: 'friction.svg',
    aliases: ['friktion']
  },
  {
    term: 'fritt fall',
    definition: 'När något faller och accelererar mot jordens yta enbart under påverkan av tyngdkraft, utan att luftmotstånd bromsar det.',
    image: 'free-fall.svg',
    aliases: ['frittfall']
  },
  {
    term: 'dynamometer',
    definition: 'Ett mätinstrument som man använder för att mäta kraft.',
    image: 'dynamometer.svg'
  },
  {
    term: 'hastighet',
    definition: 'Detta begrepp använder man för att berätta hur fort någonting rör sig från punkt A till punkt B samt åt vilket håll.',
    image: 'speed.svg'
  },
  {
    term: 'normalkraft',
    definition: 'Kraft från underlaget som hindrar ett föremål från att falla igenom. Den trycker tillbaka när du påverkas av tyngdkraften.',
    image: 'normal-force.svg',
    aliases: ['normalkraften']
  },
  {
    term: 'tidvatten',
    definition: 'Vattnet i havet påverkas av månens dragningskraft så att vi får ebb och flod (vattnet sjunker och stiger).',
    image: 'tide.svg'
  },
  {
    term: 'retardera',
    definition: 'När ett föremål minskar sin hastighet (bromsar). Kallas även negativ acceleration.',
    image: 'slow-down.svg',
    aliases: ['retardation', 'retarderar']
  }
];
