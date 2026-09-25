import type { Item, Level, PatColor, Point, Shape, Slot } from './types';
import type { ColorKey } from '@/styles/colors';

/** World 1 · Gröna dalen. Copied verbatim from `LV` in the prototype. */
export const LV: Level[] = [
  { id: 1, name: 'Muren', skill: 'Tiokompisar', area: 'Taluppfattning och tals användning', board: 'frame', ob: 'wall', base: 7, baseC: 'stone', newC: 'yellow', radius: '9px',
    intro: 'Muren har ett hål. Den behöver 10 stenar för att bli hel igen.',
    word: { w: 'Tiokompisar', d: 'Två tal som blir 10 tillsammans.', ex: '7 + 3 = 10' },
    steps: [
      { t: 'count', title: 'Räkna', text: 'Tryck på varje grå sten och räkna högt.', help: ['Tryck på en sten i taget. Siffran visar hur många du har räknat.'], done: '7 stenar!' },
      { t: 'fill', to: 10, title: 'Fyll på', text: 'Muren behöver 10 stenar. Tryck på de tomma rutorna.', help: ['Tryck på en tom ruta. Fortsätt tills ramen är full.'], done: 'Nu är det 10!' },
      { t: 'type', title: 'Skriv', text: 'Hur många stenar lade du till?', eqL: '7 +', eqR: '= 10', ans: 3, help: ['Räkna bara de gula stenarna.', 'Nu syns siffror på stenarna. De gula är 8, 9, 10. Hur många är det?'], done: '7 och 3 är tiokompisar!' },
    ],
    finale: 'Muren är hel!', recap: '7 + 3 = 10', again: 'Fler tiokompisar i Öknen: 6 och 4, 2 och 8 …',
    centralt: ['tal.naturliga', 'alg.likheter', 'alg.obekanta'], tip: 'Öva tiokompisar med fingrar och klossar. Svårt att dela upp 10 kan vara ett tidigt tecken på svag taluppfattning.' },
  { id: 2, name: 'Bron', skill: 'Mönster', area: 'Algebra', board: 'pattern', ob: 'river',
    intro: 'Bron har färgade plankor i ett mönster. Några plankor fattas.',
    word: { w: 'Mönster', d: 'Något som upprepas om och om igen.', ex: 'röd blå blå · röd blå blå' },
    steps: [
      { t: 'pattern', title: 'Fortsätt mönstret', text: 'Vilken färg kommer sen? Välj färg tills bron är klar.', help: ['Säg färgerna högt från början: röd, blå, blå, röd …'], done: 'Bron är klar!' },
      { t: 'type', title: 'Hitta delen', text: 'Hur många gånger finns röd-blå-blå på bron?', ans: 3, help: ['Varje röd planka startar en ny del.', 'Nu är delarna markerade. Räkna dem.'], done: 'Mönstret upprepas 3 gånger.' },
      { t: 'type', title: 'Räkna smart', text: 'Varje del har 2 blå plankor. Hur många blå finns det?', ans: 6, help: ['Det finns 3 delar med 2 blå i varje.', 'Räkna 2 i taget: 2, 4, …'], done: '2 + 2 + 2 = 6' },
    ],
    finale: 'Bron håller!', recap: '2 + 2 + 2 = 6', again: 'Mönster i tal väntar i Öknen: 2, 4, 6, …',
    centralt: ['alg.monster', 'tal.raknesatt'], tip: 'Gör mönster i vardagen: pärlor, klossar, eller klappa en rytm som barnet får fortsätta.' },
  { id: 3, name: 'Formporten', skill: 'Former', area: 'Geometri', board: 'shapes', ob: 'gate',
    intro: 'Porten öppnas bara för den som känner igen formerna. Titta på hörnen!',
    word: { w: 'Hörn', d: 'Där två sidor möts. En triangel har 3 hörn.', ex: 'triangel 3 · fyrhörning 4' },
    steps: [
      { t: 'find', kind: 'tri', title: 'Hitta trianglarna', text: 'En triangel har 3 hörn. Tryck på alla trianglar.', help: ['Räkna hörnen på varje form. 3 hörn är en triangel – även upp och ner!'], done: '3 trianglar!' },
      { t: 'find', kind: 'quad', title: 'Hitta fyrhörningarna', text: 'En fyrhörning har 4 hörn. Tryck på alla fyrhörningar.', help: ['En fyrhörning kan vara lång, kort eller stå på ett hörn. Räkna hörnen.'], done: '3 fyrhörningar!' },
      { t: 'type', title: 'Räkna hörn', text: 'Hur många hörn har en triangel och en fyrhörning tillsammans?', eqL: '3 + 4 =', ans: 7, help: ['Triangeln har 3 hörn. Fyrhörningen har 4.', 'Börja på 4 och räkna vidare: 5, 6, …'], done: '3 + 4 = 7 hörn' },
    ],
    finale: 'Porten är öppen!', recap: '3 + 4 = 7', again: 'I Öknen bygger vi med klot, kuber och cylindrar.',
    centralt: ['geo.objekt'], tip: 'Leta former hemma och ute: Hur många hörn har fönstret? Skylten? Tallriken?' },
  { id: 4, name: 'Bäcken', skill: 'Tallinjen', area: 'Taluppfattning och tals användning', board: 'line', ob: 'stones', start: 2,
    intro: 'Hoppa över bäcken på stenarna. Varje sten har ett nummer.',
    word: { w: 'Framåt och bakåt', d: 'Plus hoppar framåt på tallinjen. Minus hoppar bakåt.', ex: '2 + 5 = 7' },
    steps: [
      { t: 'hop', n: 5, dir: 1, title: 'Hoppa framåt', text: 'Du står på 2. Hoppa 5 steg framåt. Tryck på nästa sten.', help: ['Tryck på stenen precis bredvid dig, till höger.'], done: 'Du landade på 7!' },
      { t: 'type', title: 'Skriv', text: 'Du började på 2 och hoppade 5 steg framåt.', eqL: '2 + 5 =', ans: 7, help: ['Titta var du står nu.', 'Räkna bågarna. Var slutade den sista?'], done: '2 + 5 = 7' },
      { t: 'hop', n: 3, dir: -1, title: 'Hoppa bakåt', text: 'Hoppa 3 steg bakåt. Tryck på stenen till vänster.', help: ['Bakåt betyder till vänster, mot de mindre talen.'], done: 'Du landade på 4!' },
      { t: 'type', title: 'Skriv', text: 'Du stod på 7 och hoppade 3 steg bakåt.', eqL: '7 − 3 =', ans: 4, help: ['Titta var du står nu.', 'Räkna bakåt från 7: 6, 5, …'], done: '7 − 3 = 4' },
    ],
    finale: 'Över bäcken!', recap: '7 − 3 = 4', again: 'Tallinjen blir längre i Öknen – ända till 20.',
    centralt: ['tal.raknesatt', 'tal.metoder'], tip: 'Tejpa en tallinje på golvet och hoppa framåt och bakåt tillsammans.' },
  { id: 5, name: 'Äppelträdet', skill: 'Dela lika', area: 'Taluppfattning och tals användning', board: 'share', ob: 'tree',
    intro: 'Tre kompisar vill ha äpplen från trädet. Alla ska få lika många.',
    word: { w: 'Dela lika', d: 'Alla får lika många.', ex: '12 delat på 3 = 4' },
    steps: [
      { t: 'share', title: 'Dela ut', text: 'Tryck på en korg för att ge ett äpple. Ge ett i taget, varvet runt.', help: ['Ge ett äpple till varje kompis. Sen börjar du om från den första.'], done: 'Rättvist!' },
      { t: 'type', title: 'Skriv', text: 'Hur många äpplen fick varje kompis?', ans: 4, help: ['Räkna äpplena i en av korgarna.', 'Nu syns antalet under korgarna.'], done: '12 delat på 3 blir 4.' },
    ],
    finale: 'Alla är mätta!', recap: '12 ÷ 3 = 4', again: 'Hälften och dubbelt dyker upp i nästa värld.',
    centralt: ['tal.brak', 'tal.raknesatt'], tip: 'Dela ut saker på riktigt, en i taget – till exempel frukt vid mellanmålet.' },
  { id: 6, name: 'Fågelräkningen', skill: 'Diagram', area: 'Sannolikhet och statistik', board: 'chart', ob: 'birds',
    intro: 'Många fåglar sitter på grenen. Vi sorterar dem och gör ett diagram.',
    word: { w: 'Diagram', d: 'En bild som visar hur många det finns av varje sort.', ex: 'röd 4 · blå 3 · gul 2' },
    steps: [
      { t: 'sort', title: 'Sortera', text: 'Tryck på en fågel i taget. Den flyger till sin stapel.', help: ['Tryck på vilken fågel du vill. Den hittar sin färg själv.'], done: 'Alla är sorterade!' },
      { t: 'bar', title: 'Jämför', text: 'Vilken färg finns det flest av? Tryck på den högsta stapeln.', help: ['Den högsta stapeln har flest rutor.'], done: 'Röda är flest!' },
      { t: 'type', title: 'Hur många fler?', text: 'Hur många fler röda än gula fåglar är det?', ans: 2, help: ['Jämför den röda och den gula stapeln.', 'Hur många röda rutor sticker upp över den gula?'], done: '2 fler röda!' },
    ],
    finale: 'Diagrammet är klart!', recap: '4 − 2 = 2', again: 'I Öknen gör vi tabeller med streck.',
    centralt: ['stat.diagram'], tip: 'Räkna och sortera tillsammans: bilar som åker förbi, färger på strumpor. Rita staplar.' },
  { id: 7, name: 'Trollets gåta', skill: 'Problemlösning', area: 'Problemlösning', board: 'frame', ob: 'troll', base: 5, baseC: 'apple', newC: 'gApple', radius: '50%', riddle: true,
    intro: 'Trollet har 5 äpplen. Han får 3 till. Sen äter han upp 2. Hur många har han kvar?',
    word: { w: 'Kvar', d: 'Det som finns efter att något tagits bort.', ex: '8 − 2 = 6 kvar' },
    steps: [
      { t: 'count', title: 'Vad har han?', text: 'Räkna trollets äpplen.', help: ['Tryck på ett äpple i taget.'], done: '5 äpplen.' },
      { t: 'fill', to: 8, title: 'Han får 3 till', text: '”Till” betyder att det blir fler. Lägg dit 3 äpplen.', help: ['Tryck på en tom ruta, tre gånger.'], done: 'Nu har han fler!' },
      { t: 'type', title: 'Hur många nu?', text: '5 äpplen och 3 till.', eqL: '5 + 3 =', ans: 8, help: ['Räkna alla äpplen i ramen.', 'Nu syns siffror. Titta på det sista äpplet.'], done: '5 + 3 = 8' },
      { t: 'remove', k: 2, title: 'Han äter 2', text: 'Tryck på 2 äpplen som trollet äter upp.', help: ['Tryck på två äpplen, vilka som helst.'], done: 'Mums!' },
      { t: 'type', title: 'Hur många kvar?', text: 'Han hade 8 och åt upp 2.', eqL: '8 − 2 =', ans: 6, help: ['”Kvar” är de äpplen som fortfarande finns i ramen.', 'Räkna bara de hela äpplena.'], done: '6 kvar!' },
    ],
    finale: 'Gåtan är löst!', recap: '5 + 3 − 2 = 6', again: 'Gåtor med flera steg finns i varje värld.',
    centralt: ['prob.strategier', 'tal.raknesatt'], tip: 'Fråga: Vad händer först? Vad händer sen? Rita eller lägg upp det med saker.' },
];

export const LEVEL_COUNT = LV.length;

export const ITEMS: Record<Slot, Item[]> = {
  hat: [{ id: 'none', name: 'Ingen' }, { id: 'cap', name: 'Keps', lv: 1 }, { id: 'helmet', name: 'Rymdhjälm', lv: 5 }, { id: 'crown', name: 'Krona', lv: 7 }],
  shirt: [{ id: 'green', name: 'Grön' }, { id: 'blue', name: 'Blå' }, { id: 'purple', name: 'Lila', lv: 3 }, { id: 'orange', name: 'Orange', lv: 2 }],
  shoes: [{ id: 'sneakers', name: 'Gympaskor' }, { id: 'rocket', name: 'Raketskor', lv: 4 }],
  skin: [{ id: 'ljus', name: 'Ljus' }, { id: 'mellan', name: 'Mellan' }, { id: 'mork', name: 'Mörk' }, { id: 'alien', name: 'Alien', lv: 6 }, { id: 'robot', name: 'Robot' }],
};

export const REWARD: Record<number, [Slot, string, string]> = {
  1: ['hat', 'cap', 'Keps'],
  2: ['shirt', 'orange', 'Orange tröja'],
  3: ['shirt', 'purple', 'Lila tröja'],
  4: ['shoes', 'rocket', 'Raketskor'],
  5: ['hat', 'helmet', 'Rymdhjälm'],
  6: ['skin', 'alien', 'Alien'],
  7: ['hat', 'crown', 'Krona'],
};

/** Map path: home, 7 levels, castle. */
export const NODES: Point[] = [{ x: 200, y: 640 }, { x: 110, y: 566 }, { x: 272, y: 496 }, { x: 118, y: 426 }, { x: 266, y: 356 }, { x: 124, y: 286 }, { x: 262, y: 220 }, { x: 140, y: 150 }, { x: 276, y: 84 }];

export const SHAPES: Shape[] = [
  { k: 'tri', w: 54, h: 48, clip: 'polygon(50% 0,100% 100%,0 100%)', c: 'B' }, { k: 'circle', w: 48, h: 48, c: 'R' }, { k: 'quad', w: 46, h: 46, c: 'yellow' },
  { k: 'tri', w: 50, h: 50, clip: 'polygon(0 0,100% 100%,0 100%)', c: 'R' }, { k: 'quad', w: 66, h: 32, c: 'B' }, { k: 'circle', w: 34, h: 34, c: 'yellow' },
  { k: 'quad', w: 38, h: 38, rot: 45, c: 'R' }, { k: 'tri', w: 48, h: 56, clip: 'polygon(0 0,100% 0,50% 100%)', c: 'yellow' }, { k: 'circle', w: 42, h: 42, c: 'B' },
];

export const BIRDS: ColorKey[] = ['R', 'B', 'yellow', 'R', 'B', 'R', 'yellow', 'B', 'R'];
export const COLS: ColorKey[] = ['R', 'B', 'yellow'];
export const PAT: PatColor[] = ['R', 'B', 'B'];
export const PAT_START: PatColor[] = ['R', 'B', 'B', 'R', 'B'];
export const PAT_LENGTH = 9;
export const SHARE_PILE = 12;
export const TREE: [number, number][] = [[18, 22], [44, 12], [72, 18], [88, 40], [12, 48], [38, 38], [64, 42], [26, 66], [52, 62], [78, 66], [44, 80], [90, 58]];

export const FRIENDS: { head: string; shirt: string }[] = [
  { head: 'oklch(0.8 0.1 60)', shirt: 'oklch(0.66 0.14 245)' },
  { head: 'oklch(0.55 0.08 45)', shirt: 'var(--orange)' },
  { head: 'oklch(0.88 0.06 70)', shirt: 'oklch(0.62 0.15 300)' },
];

export const getLevel = (id: number): Level => LV[id - 1];
