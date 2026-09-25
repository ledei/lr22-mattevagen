import { Card } from '@/components/atoms';
import { AdultLevelCard, CoverageRow } from '@/components/molecules';
import { AREAS, LV, getLevel } from '@/data/levels';
import { useGame } from '@/store/gameStore';
import s from './AdultReport.module.css';

/** "För vuxna": how much help the child needed, curriculum coverage and reading tips. Never shown as points to the child. */
export function AdultReport() {
  const { support, autoSupport, supportFrom, done, log } = useGame();
  const supportNote =
    support === 'Av' ? 'Extra stöd är avstängt.'
    : support === 'Alltid på' ? 'Extra stöd är alltid på: siffror och markeringar visas direkt.'
    : autoSupport ? `Slogs på automatiskt efter ${getLevel(supportFrom || 1).name}. Siffror och markeringar visas nu direkt i varje bana.`
    : 'Slås på automatiskt om barnet behöver mycket hjälp i en bana.';

  return (
    <>
      <p className={s.lead}>Visas inte som poäng för barnet. Här syns hur mycket stöd barnet behövde, så att du kan hjälpa till i tid.</p>
      <div className={s.support}>
        <div className={s.supportLabel}>Extra stöd</div>
        <div className={s.supportText}>{supportNote}</div>
      </div>
      <Card>
        <div className={s.coverageHead}>
          <div className={s.cardTitle}>Centralt innehåll, åk 1–3</div>
          <div className={s.small}>Skolverkets kursplan i matematik. Varje område har minst en bana i världen.</div>
        </div>
        {AREAS.map((a) => {
          const ls = LV.filter((x) => x.area === a);
          return <CoverageRow key={a} name={a} levels={ls.map((x) => x.name).join(' · ')} done={ls.filter((x) => done[x.id]).length} total={ls.length} />;
        })}
      </Card>
      {LV.map((x) => (
        <AdultLevelCard key={x.id} title={`${x.name} · ${x.skill}`} lgr={x.lgr} tip={x.tip} help={log[x.id] ? log[x.id].help : null} />
      ))}
      <Card gap={8}>
        <div className={s.cardTitle}>Läs mer</div>
        <a className={s.link} href="https://www.skolverket.se" target="_blank" rel="noreferrer">Skolverket – stöd för undervisningen i matematik</a>
        <a className={s.link} href="https://www.spsm.se" target="_blank" rel="noreferrer">SPSM – stödmaterial vid matematiksvårigheter</a>
      </Card>
    </>
  );
}
