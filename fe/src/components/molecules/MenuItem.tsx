import React from 'react';
import Span from '../atoms/Span';
import Image from '../atoms/Image';

export interface MenuItemProps {
  backgroundColor?: string;
}

export default function MenuItem({ backgroundColor }: MenuItemProps) {
  return (
    <div style={{ backgroundColor, padding: '1rem', borderRadius: '0.5rem' }}>
      <Image src="/assets/icons/calendarIcon.png" />
      <Span $color="white" style={{ fontWeight: 'bold' }}>
        일정
      </Span>
    </div>
  );
}
