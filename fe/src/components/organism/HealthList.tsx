import React from 'react';
import CommonCard from '../molecule/CommonCard';

export default function HealthList() {
  const healthList = [
    {
      title: '건강 이력 1',
      time: '2024년 5월 24일 월요일 17:32 ',
      content:
        '이것은 건강 내용 예시입니다. 아주 긴 내용입니다. 긴 내용은 잘립니다. 이것은 건강 내용 예시입니다. 아주 긴 내용입니다. 긴 내용은 잘립니다. 이것은 건강 내용 예시입니다. 아주 긴 내용입니다. 긴 내용은 잘립니다.',
    },
    { title: '건강 이력 2', time: '2024년 5월 27일 화요일 12:32 ', content: '건강 내용 예시 2번' },
    {
      title: '건강 이력 3',
      time: '2024년 6월 14일 목요일 20:32 ',
      content: '긴 건강 내용 예시입니다. 이 내용은 칸을 벗어나서 ...으로 표시됩니다.',
    },
    { title: '건강 이력 4', time: '2024년 6월 21일 토요일 12:32', content: '건강 내용 예시 4번' },
    { title: '건강 이력 5', time: '2024년 6월 24일 월요일 13:32 ', content: '건강 내용 예시 5번' },
    {
      title: '건강 이력 6',
      time: '2024년 7월 24일 월요일 09:32 ',
      content: '긴 내용이 포함된 건강입니다. 이것도 자를 필요가 있습니다.',
    },
    { title: '건강 이력 7', time: '2024년 8월 14일 월요일 16:22 ', content: '건강 내용 예시 7번' },
    { title: '건강 이력 8', time: '2024년 9월 29일 화요일 13:13 ', content: '건강 내용 예시 8번' },
    { title: '건강 이력 9', time: '2024년 10월 3일 월요일 17:36 ', content: '건강 내용 예시 9번' },
  ];
  return (
    <div>
      {healthList.map((health, index) => (
        <CommonCard key={index} title={health.title} time={health.time} onClick={() => NaN}>
          {health.content}
        </CommonCard>
      ))}
    </div>
  );
}
