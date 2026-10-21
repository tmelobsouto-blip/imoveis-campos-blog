const pad = (n: number) => String(n).padStart(2, '0');

export function RoomTitle({ room, number, count }: { room: string; number: number; count: number }) {
  return (
    <div className="room-title" aria-hidden>
      <span className="room-title-num mono">
        {pad(number)} <i>/</i> {pad(count)}
      </span>
      <h2 className="room-title-name">
        {[...room].map((ch, i) => (
          <span key={i} style={{ '--i': i } as React.CSSProperties}>
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
      </h2>
    </div>
  );
}
