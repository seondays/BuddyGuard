import { useNavigate } from 'react-router-dom';

import Image from '../atoms/Image';
import Span from '../atoms/Span';

interface MyPageItemProps {
  title: string;
  router?: string;
  onClick?: () => void;
}

export default function MyPageItem({ title, router, onClick }: MyPageItemProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (router) {
      navigate(router);
    }
  };

  return (
    <div
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #ddd',
        margin: '2rem 0',
        paddingBottom: '1rem',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Image src="/assets/icons/My_Buddies.png" style={{ width: '2rem' }} />
        <Span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>{title}</Span>
      </div>
      <Image src="/assets/icons/arrow_right.png" style={{ width: '0.5rem' }} />
    </div>
  );
}
