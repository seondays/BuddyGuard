import { useTheme } from 'styled-components';

import Image from '@/components/atoms/Image';
import Span from '@/components/atoms/Span';
import { DASHBOARD_DESCRIPTION_TEXT } from '@/constants/textConstants';

export default function DashBoard() {
  const { textSecondary: spanColor, modalBackground2: dashBoardColor, shadow: shadowColor } = useTheme().currentTheme;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: '1rem 1rem 2rem 1rem',
        marginTop: '1rem',
        borderRadius: '1rem',
        boxShadow: `0 0.15rem 0.5rem ${shadowColor}, 0 0.15rem 0.8rem ${shadowColor}`,
        backgroundColor: dashBoardColor,
      }}
    >
      <Image src="/assets/images/mascot.png" style={{ width: '50%', opacity: '20%', marginBottom: '1rem' }} />
      <Span style={{ fontWeight: 'bold', opacity: '40%', color: spanColor }}>{DASHBOARD_DESCRIPTION_TEXT}</Span>
    </div>
  );
}
