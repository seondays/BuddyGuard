import React, { useEffect, useState } from 'react';

import CommonCard from '@/components/molecules/CommonCard';
import { useFeedQuery, useDeleteFeedMutation } from '@/hooks/useFeedQuery';

import DetailModal from '../molecules/DetailModal';

interface FeedRecord {
  id: number;
  petId: number;
  date: string;
  mainCategory: string;
  subCategory: string;
  amount: number;
  amountType: string;
  feedType: string;
}

export default function FeedList() {
  const [petId, setPetId] = useState<number | null>(null);
  const [selectedFeed, setSelectedFeed] = useState<FeedRecord | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const deleteFeedMutation = useDeleteFeedMutation();

  const handleFeedClick = (feed: FeedRecord) => {
    setSelectedFeed(feed);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleDeleteFeed = () => {
    if (selectedFeed && petId) {
      deleteFeedMutation.mutate(
        { petId, feedId: selectedFeed.id },
        {
          onSuccess: () => {
            closePopup();
          },
        }
      );
    }
  };

  const updatePetIdFromStorage = () => {
    const storedBuddy = localStorage.getItem('petsStorage');
    if (storedBuddy) {
      const parsedBuddy = JSON.parse(storedBuddy);
      if (parsedBuddy?.state?.selectedBuddy) {
        const { petId } = parsedBuddy.state.selectedBuddy;
        setPetId(petId);
      } else {
        console.log('selectedBuddy가 없습니다.');
      }
    } else {
      console.log('petsStorage가 없습니다.');
    }
  };

  useEffect(() => {
    updatePetIdFromStorage();
    const interval = setInterval(() => {
      updatePetIdFromStorage();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { data: feedList, isLoading, isError } = useFeedQuery(petId ?? undefined);

  if (!petId) return <div>반려동물을 선택해 주세요.</div>;
  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>데이터가 없습니다.</div>;

  const formatDateToYMD = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR');
  };

  const formatDateToYMDHM = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return date.toLocaleString('ko-KR', options);
  };

  return (
    <div>
      {feedList &&
        feedList.map((feed: FeedRecord) => (
          <CommonCard
            key={feed.id}
            title={`${feed.feedType}`}
            time={formatDateToYMD(feed.date)}
            onClick={() => handleFeedClick(feed)}
          >
            먹이량: {feed.amount}
            {feed.amountType}
          </CommonCard>
        ))}
      {isPopupOpen && selectedFeed && (
        <DetailModal
          title={`${selectedFeed.feedType}`}
          time={formatDateToYMDHM(selectedFeed.date)}
          content={`먹이량: ${selectedFeed.amount}
          ${selectedFeed.amountType}`}
          onClose={closePopup}
          onDelete={handleDeleteFeed}
        />
      )}
    </div>
  );
}
