import React from 'react';
import Image from '../atoms/Image';
import Span from '../atoms/Span';
import { DASHBOARD_DESCRIPTION_TEXT } from '@/constants/textConstants';

export default function DashBoard() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '1rem 1rem 2rem 1rem',
        margin: '1rem 0rem',
        border: '1px solid gray',
        borderRadius: '1rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1)', // 그림자 효과 추가
      }}
    >
      <Image src="/assets/images/mascot.png" style={{ width: '50%', opacity: '20%' }} />
      <Span style={{ fontWeight: 'bold', opacity: '40%' }}>{DASHBOARD_DESCRIPTION_TEXT}</Span>
    </div>
  );
}
