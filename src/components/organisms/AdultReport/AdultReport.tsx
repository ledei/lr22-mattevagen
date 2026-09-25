import { Card } from '@/components/atoms';
import { AdultLevelCard, CoverageRow } from '@/components/molecules';
import { AREAS, areaOf, bulletText } from '@/data/curriculum';
import { LV, getLevel } from '@/data/levels';
import { useGame } from '@/store/gameStore';
import { useShallow } from 'zustand/react/shallow';
import s from './AdultReport.module.css';

/** "För vuxna": how much help the child needed, curriculum coverage and reading tips. Never shown as points to the child. */
export function AdultReport() {
  const { support, autoSupport, supportFrom, done, log } = useGame(useShallow((s) => ({ support: s.support, autoSupport: s.autoSupport, supportFrom: s.supportFrom, done: s.done, log: s.log })));
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
          <div className={s.small}>Lgr22, kursplan i matematik. Banorna kopplas till punkter i det centrala innehållet för årskurs 1–3.</div>
        </div>
        {AREAS.map((a) => {
          const ls = LV.filter((x) => x.centralt.some((id) => areaOf(id) === a));
          return <CoverageRow key={a} name={a} levels={ls.length ? ls.map((x) => x.name).join(' · ') : 'Ingen bana i Värld 1'} done={ls.filter((x) => done[x.id]).length} total={ls.length} />;
        })}
      </Card>
      {LV.map((x) => (
        <AdultLevelCard key={x.id} title={`${x.name} · ${x.skill}`} centralt={x.centralt.map((id) => ({ area: areaOf(id), text: bulletText(id) }))} tip={x.tip} help={log[x.id] ? log[x.id].help : null} />
      ))}
      <Card gap={8}>
        <div className={s.cardTitle}>Läs mer</div>
        <a className={s.link} href="https://www.skolverket.se" target="_blank" rel="noreferrer">Skolverket – stöd för undervisningen i matematik</a>
        <a className={s.link} href="https://www.spsm.se" target="_blank" rel="noreferrer">SPSM – stödmaterial vid matematiksvårigheter</a>
      </Card>
    </>
  );
}
