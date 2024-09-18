import React from 'react';
import Span from '../atoms/Span';
import Image from '../atoms/Image';

export default function MyPageItem() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #ddd',
        marginBottom: '0.5rem',
        paddingBottom: '1rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Image src="/assets/icons/My_Buddies.png" style={{ width: '2rem' }} />
        <Span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>My Buddies</Span>
      </div>
      <Image src="/assets/icons/arrow_right.png" style={{ width: '0.5rem' }} />
    </div>
  );
}
