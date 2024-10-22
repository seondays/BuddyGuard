import Span from '../atoms/Span';

export default function DetailModal({
  title,
  time,
  content,
  onClose,
  subCategory,
}: {
  title: string;
  time: string;
  content: string;
  subCategory?: string;
  onClose: () => void;
}) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        width: '80%',
        maxWidth: '400px',
      }}
    >
      <div style={{ marginBottom: '0.5rem' }}>
        <Span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>{title} - </Span>
        <Span style={{ fontWeight: 'bold' }}>{subCategory}</Span>
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <Span $color="gray">{time}</Span>
      </div>
      <div style={{ marginBottom: '2rem' }}>
        <Span>{content}</Span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={onClose}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#ff5c5c',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          닫기
        </button>
      </div>
    </div>
  );
}
