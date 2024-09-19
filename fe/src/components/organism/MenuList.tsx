import React from 'react';
import MenuItem from '../molecule/MenuItem';

export default function MenuList() {
  // api 완성되면 배열 갯수대로 MenuItem map 돌릴 예정
  const menuItems = [
    { id: 1, backgroundColor: '#8C8C8C' },
    { id: 2, backgroundColor: '#6dd47e' },
    { id: 3, backgroundColor: '#A7C4A5' },
    { id: 4, backgroundColor: '#FF7D29' },
    { id: 5, backgroundColor: '#A6C8DD' },
    { id: 6, backgroundColor: '#F7DB78' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', padding: '2rem' }}>
      {menuItems.map((item) => (
        <MenuItem key={item.id} backgroundColor={item.backgroundColor} />
      ))}
    </div>
  );
}
