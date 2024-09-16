import { useRef } from 'react';
import styled from 'styled-components';

import { useKakaoMap } from '@/hooks/useKakaoMap';

export default function GoWalk() {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useKakaoMap(mapRef);

  return (
    <StyledWalkWrapper>
      <StyledMap ref={mapRef}></StyledMap>
    </StyledWalkWrapper>
  );
}
const StyledWalkWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: aliceblue;
`;
const StyledMap = styled.div`
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
`;
