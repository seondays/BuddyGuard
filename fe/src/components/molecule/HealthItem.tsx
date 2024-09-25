import Span from '../atoms/Span';

export default function HealthItem({
  title,
  time,
  content,
  onClick,
}: {
  title: string;
  time: string;
  content: string;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        borderBottom: '1px solid #ddd',
        padding: '1rem',
        position: 'relative',
        height: '7rem',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Span style={{ fontWeight: 'bold' }}>{title}</Span>
        <Span $color="gray" style={{ position: 'absolute', right: '1rem', textAlign: 'right' }}>
          {time}
        </Span>
      </div>
      <div style={{ marginTop: '3rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        <Span>{content}</Span>
      </div>
    </div>
  );
}
