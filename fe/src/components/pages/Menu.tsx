import BuddyInfoBar from '../organisms/BuddyInfoBar';
import MenuList from '../organisms/MenuList';

export default function Menu() {
  return (
    <div style={{ padding: '1rem' }}>
      <BuddyInfoBar />
      <div style={{ height: '75vh' }}>
        <MenuList />
      </div>
    </div>
  );
}
