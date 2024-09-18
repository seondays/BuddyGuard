import React from 'react';
import Span from '../atoms/Span';

export default function NotificationItem({ title, time, content }: { title: string; time: string; content: string }) {
  return (
    <div style={{ borderBottom: '1px solid #ddd', padding: '1rem', position: 'relative', height: '7rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Span style={{ fontWeight: 'bold' }}>{title}</Span>
        <Span $color="gray" style={{ position: 'absolute', right: '1rem', textAlign: 'right' }}>
          {time}
        </Span>
      </div>
      <div style={{ marginTop: '2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        <Span>{content}</Span>
      </div>
    </div>
  );
}
