import type { Area } from './types';

/**
 * Lgr22 (tredje upplagan, 2025), kursplan i matematik – centralt innehåll i årskurs 1–3.
 * Quoted verbatim from Skolverket. Levels link to these ids via `Level.centralt`.
 * Source: https://www.skolverket.se/download/18.2cd92ed197a1b2bbcd5e08f/1752153467251/pdf13296.pdf (s. 55–56)
 */
export const CENTRALT_INNEHALL: Record<Area, Record<string, string>> = {
  'Taluppfattning och tals användning': {
    'tal.naturliga': 'Naturliga tal och deras egenskaper samt hur talen delas upp och används för att ange antal och ordning.',
    'tal.position': 'Positionssystemet och hur det används för att beskriva naturliga tal.',
    'tal.symboler': 'Symboler för tal och symbolernas utveckling i några olika kulturer genom historien.',
    'tal.brak': 'Tal i bråkform som del av helhet och del av antal samt hur delarna benämns och uttrycks som enkla bråk. Hur enkla bråk förhåller sig till naturliga tal.',
    'tal.elevnara': 'Hur naturliga tal och enkla tal i bråkform används i elevnära situationer.',
    'tal.raknesatt': 'De fyra räknesättens egenskaper och samband samt användning i olika situationer.',
    'tal.metoder': 'Metoder för beräkningar med naturliga tal, vid huvudräkning, överslagsräkning och skriftlig beräkning. Användning av digitala verktyg vid beräkningar.',
    'tal.rimlighet': 'Rimlighetsbedömning vid uppskattningar och beräkningar.',
  },
  Algebra: {
    'alg.likheter': 'Matematiska likheter och likhetstecknets betydelse.',
    'alg.obekanta': 'Obekanta tal och hur de kan betecknas med en symbol.',
    'alg.monster': 'Enkla mönster i talföljder och enkla geometriska mönster samt hur de konstrueras, beskrivs och uttrycks.',
    'alg.instruktioner': 'Entydiga stegvisa instruktioner och hur de konstrueras, beskrivs och följs som grund för programmering. Hur symboler används vid stegvisa instruktioner.',
  },
  Geometri: {
    'geo.lagesord': 'Vanliga lägesord för att beskriva föremåls och objekts läge i rummet.',
    'geo.objekt': 'Grundläggande geometriska tvådimensionella objekt samt objekten klot, kon, cylinder och rätblock. Egenskaper hos dessa objekt och deras inbördes relationer. Konstruktion av geometriska objekt.',
    'geo.storheter': 'Jämförelser och uppskattningar av storheter. Mätning av längd, massa, volym och tid med vanliga nutida och äldre måttenheter.',
    'geo.skala': 'Skala vid enkel förminskning och förstoring.',
    'geo.symmetri': 'Symmetri i vardagen och hur symmetri kan konstrueras.',
  },
  'Sannolikhet och statistik': {
    'stat.slump': 'Slumpmässiga händelser i konkreta situationer.',
    'stat.diagram': 'Enkla tabeller och diagram och hur de används för att sortera data och beskriva resultat från undersökningar, såväl med som utan digitala verktyg.',
  },
  'Samband och förändring': {
    'samb.proportionella': 'Proportionella samband, däribland dubbelt och hälften.',
  },
  Problemlösning: {
    'prob.strategier': 'Strategier för att lösa matematiska problem i elevnära situationer.',
    'prob.fragestallningar': 'Formulering av matematiska frågeställningar utifrån vardagliga situationer.',
  },
};

/** The six areas of centralt innehåll in årskurs 1–3, in Lgr22 order. */
export const AREAS = Object.keys(CENTRALT_INNEHALL) as Area[];

export function areaOf(id: string): Area {
  const a = AREAS.find((x) => id in CENTRALT_INNEHALL[x]);
  if (!a) throw new Error(`Unknown centralt innehåll id: ${id}`);
  return a;
}

export const bulletText = (id: string) => CENTRALT_INNEHALL[areaOf(id)][id];
