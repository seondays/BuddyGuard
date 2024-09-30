export const getCurrentDate = (isTime = false) => {
  const timeOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Seoul',
  };

  if (isTime) {
    timeOptions.hour = 'numeric';
    timeOptions.minute = 'numeric';
    timeOptions.hourCycle = 'h23';
  }
  const today = new Intl.DateTimeFormat('ko-KR', timeOptions).format(new Date());
  return today;
};
