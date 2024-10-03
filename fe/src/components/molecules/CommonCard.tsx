import Span from '../atoms/Span';
import React from 'react';

export interface CommonCardProps {
  title: string;
  time: string;
  onClick: () => void;
  children: React.ReactNode;
}

export default function CommonCard({ title, time, onClick, children }: CommonCardProps) {
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
        {children}
      </div>
    </div>
  );
}
