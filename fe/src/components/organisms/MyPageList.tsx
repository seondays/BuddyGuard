import MyPageItem from '../molecules/MyPageItem';

export default function MyPageList() {
  const handleLogout = () => {
    localStorage.clear();

    document.cookie.split(';').forEach((cookie) => {
      const [name] = cookie.split('=');
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    window.location.href = '/';
  };

  return (
    <div>
      <MyPageItem title="내 버디" router={`/MyPage/MyBuddy`} />
      <MyPageItem title="버디 추가하기" router="/MyPage/AddBuddy" />
      <MyPageItem title="버디가드 추가하기" router="/add-group-member" />
      <MyPageItem title="로그아웃" onClick={handleLogout} />
    </div>
  );
}
