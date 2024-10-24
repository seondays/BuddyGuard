import styled from 'styled-components';

import PageTitleBar from '../molecules/PageTitleBar';
import BuddyInfoBar from '../organisms/BuddyInfoBar';
import { NAV_HEIGHT } from '../organisms/Nav';
import NotificationList from '../organisms/NotificationList';

export default function Notification() {
  return (
    <StyledNotificationContainer>
      <PageTitleBar title="알림" />
      <BuddyInfoBar />

      <StyledListWrapper>
        <NotificationList />
      </StyledListWrapper>
    </StyledNotificationContainer>
  );
}

const StyledListWrapper = styled.div`
  overflow-y: scroll;
  scrollbar-width: none;
  height: 70vh;
  padding-bottom: ${NAV_HEIGHT};
`;
const StyledNotificationContainer = styled.div`
  padding: 1rem;
  height: 100%;
`;
