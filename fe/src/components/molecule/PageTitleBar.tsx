import React from 'react';
import Image from '../atoms/Image';
import Span from '../atoms/Span';

export default function PageTitleBar() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', position: 'relative', height: '2rem' }}>
      <Image src="/assets/icons/arrow_back.png" style={{ width: '1rem', position: 'absolute', left: 0 }} />
      <Span style={{ margin: '0 auto', fontSize: '1.2rem', fontWeight: 'bold' }}>알림</Span>
    </div>
  );
}
