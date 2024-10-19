import MyPageItem from '../molecules/MyPageItem';

export default function MyPageList() {
  const handleLogout = () => {
    // 캐시 스토리지 삭제
    caches.keys().then(function (names) {
      for (const name of names) caches.delete(name);
    });

    // 로컬 스토리지 삭제
    localStorage.clear();

    // 쿠키 삭제
    document.cookie.split(';').forEach((cookie) => {
      const [name] = cookie.split('=');
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });

    window.location.href = '/join';
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
