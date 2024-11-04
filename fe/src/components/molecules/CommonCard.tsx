import React from 'react';
import styled from 'styled-components';

import Span from '../atoms/Span';

export interface CommonCardProps {
  subCategory?: string;
  title: string;
  time: string;
  onClick: () => void;
  children: React.ReactNode;
}

export default function CommonCard({ subCategory, title, time, onClick, children }: CommonCardProps) {
  return (
    <CardContainer onClick={onClick}>
      <CardHeader>
        <div>
          <Title>{title}</Title>
          {subCategory ? <SubCategory> - {subCategory}</SubCategory> : null}
        </div>
        <Time>{time}</Time>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  margin-bottom: 1rem;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SubCategory = styled(Span)`
  font-size: 0.8rem;
  font-weight: bold;
  color: #333;
`;

const Title = styled(Span)`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
`;

const Time = styled(Span)`
  font-size: 0.9rem;
  color: gray;
`;

const CardContent = styled.div`
  margin-top: 0.8rem;
  font-size: 1rem;
  color: #555;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
