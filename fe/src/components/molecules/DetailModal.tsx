import Span from '../atoms/Span';

export default function DetailModal({
  title,
  time,
  content,
  onClose,
  subCategory,
  onDelete,
}: {
  title: string;
  time: string;
  content: string;
  subCategory?: string;
  onClose: () => void;
  onDelete?: () => void;
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
        borderRadius: '1rem',
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
        zIndex: 1000,
        width: '90%',
        maxWidth: '450px',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'none',
          border: 'none',
          fontSize: '1rem',
          cursor: 'pointer',
        }}
      >
        &#x2715;
      </button>

      <div
        style={{
          display: 'flex',
          justifyContent: 'start',
          alignItems: 'center',
          marginBottom: '1rem',
        }}
      >
        <Span style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#333' }}>{title}</Span>
        {subCategory && (
          <Span style={{ fontWeight: 'bold', fontSize: '1rem', color: '#666', paddingLeft: '1rem' }}>
            {subCategory}
          </Span>
        )}
      </div>
      <div style={{ marginBottom: '1.5rem', textAlign: 'start' }}>
        <Span style={{ color: '#999', fontSize: '1rem' }}>{time}</Span>
      </div>
      <div style={{ marginBottom: '2rem', textAlign: 'start', lineHeight: '1.5' }}>
        <Span style={{ color: '#555', fontSize: '1.1rem' }}>{content}</Span>
      </div>

      {onDelete && (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={onDelete}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#FF3B30',
              color: '#fff',
              border: 'none',
              borderRadius: '1rem',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              marginTop: '1rem',
            }}
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
