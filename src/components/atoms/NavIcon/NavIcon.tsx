/** Icons in the bottom menu, built from simple shapes. */
export function NavIcon({ kind, color }: { kind: 'avatar' | 'map' | 'words'; color: string }) {
  if (kind === 'avatar')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
        <div style={{ width: 18, height: 8, borderRadius: '6px 6px 2px 2px', background: color }} />
      </div>
    );
  if (kind === 'map') return <div style={{ width: 14, height: 14, transform: 'rotate(45deg)', borderRadius: 3, border: `3px solid ${color}` }} />;
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      <div style={{ width: 9, height: 16, borderRadius: 2, border: `3px solid ${color}` }} />
      <div style={{ width: 9, height: 16, borderRadius: 2, border: `3px solid ${color}` }} />
    </div>
  );
}

/** Two-colour book icon used in the "{n} ord" pill. */
export function BookIcon() {
  return (
    <div style={{ display: 'flex', gap: 1 }}>
      <div style={{ width: 7, height: 12, borderRadius: 2, background: 'var(--pat-blue)' }} />
      <div style={{ width: 7, height: 12, borderRadius: 2, background: 'var(--orange)' }} />
    </div>
  );
}
