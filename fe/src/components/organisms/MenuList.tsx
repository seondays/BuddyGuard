import styled from 'styled-components';

import MenuItem from '@/components/molecules/MenuItem';

export default function MenuList() {
  const menuItems = [
    {
      id: 1,
      backgroundColor: 'white',
      title: '일정',
      src: '/assets/icons/menu_calendar.png',
      path: '/menu/schedule',
    },
    { id: 2, backgroundColor: 'white', title: '', src: '/assets/images/mascot.png', path: '' },
    { id: 3, backgroundColor: 'white', title: '건강', src: '/assets/icons/menu_health.png', path: '/menu/hospital' },
    { id: 4, backgroundColor: 'white', title: '식사', src: '/assets/icons/menu_meal.png', path: '/menu/feed' },
    { id: 5, backgroundColor: 'white', title: '산책', src: '/assets/icons/menu_walk.png', path: '/menu/walk' },
    { id: 6, backgroundColor: 'white', title: '체중', src: '/assets/icons/menu_weight.png', path: '/menu/weight' },
  ];

  return (
    <MenuWrapper>
      {menuItems.map((item) => (
        <MenuItem
          key={item.id}
          $backgroundColor={item.backgroundColor}
          src={item.src}
          title={item.title}
          path={item.path}
        />
      ))}
    </MenuWrapper>
  );
}

const MenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 2rem;
  padding: 1rem;
`;
