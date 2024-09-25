import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Span from '../atoms/Span';
import Image from '../atoms/Image';

export interface MenuItemProps {
  backgroundColor?: string;
  src: string;
  title?: string;
  path?: string;
}

export default function MenuItem({ backgroundColor, src, title, path }: MenuItemProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <MenuItemWrapper backgroundColor={backgroundColor} onClick={handleClick}>
      <Image src={src} style={{ width: '70%', height: '60%', marginBottom: '0.5rem' }} />
      {title && (
        <Span
          $color="white"
          style={{
            fontWeight: 'bold',
            position: 'absolute',
            bottom: '10px',
            left: '10px',
          }}
        >
          {title}
        </Span>
      )}
    </MenuItemWrapper>
  );
}

const MenuItemWrapper = styled.div<{ backgroundColor?: string }>`
  width: 100%;
  height: 100%;
  background-color: ${({ backgroundColor }) => backgroundColor || '#ffffff'};
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;
