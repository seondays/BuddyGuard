import Image from '@/components/atoms/Image';
import Span from '@/components/atoms/Span';

export default function UserInfoBar() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '3rem',
        padding: '2rem 1rem',
        borderBottom: '1px solid #ddd',
      }}
    >
      <div>
        <Span style={{ fontSize: '2rem', fontWeight: 'bold' }}>JIN JANJAN</Span>
        <div style={{ marginTop: '1rem' }}>
          <Image src="/assets/icons/mail.png" style={{ width: '1rem', marginRight: '0.5rem' }} />
          <Span>JINJANJAN@icloud.com</Span>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <Image src="/assets/icons/telephone.png" style={{ width: '1rem', marginRight: '0.5rem' }} />
          <Span>010-1234-5678</Span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Image src="/assets/icons/signout.png" style={{ width: '1rem', marginRight: '0.5rem' }} />
        <Span $color="red" style={{ fontWeight: 'bold', cursor: 'pointer' }}>
          Sign out
        </Span>
      </div>
    </div>
  );
}
