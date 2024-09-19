import React from 'react';
import { useLocation } from 'react-router-dom';
import Image from '../atoms/Image';
import Span from '../atoms/Span';

export default function BuddyInfoBar() {
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <div
      style={{
        marginTop: '1rem',
        marginBottom: '1rem',
        padding: '1rem',
        backgroundColor: '#FFEEA9',
        borderRadius: '1rem',
      }}
    >
      <div id="top-info" style={{ display: 'flex', alignItems: 'center' }}>
        <Image
          src="/assets/icons/defaultBuddy.png"
          style={{ width: '2rem', borderRadius: '50%', marginRight: '1rem' }}
        />
        <Span>버디 이름</Span>
      </div>

      {isHome && (
        <div id="bottom-info" style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
          <Span>미해결</Span>
          <Span>일정</Span>
          <Span>건강</Span>
          <Span>체중</Span>
          <Span>산책</Span>
          <Span>식사량</Span>
        </div>
      )}
    </div>
  );
}
