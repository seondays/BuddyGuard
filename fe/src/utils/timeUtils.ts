export const getCurrentDate = (isDay = true, isTime = false) => {
  const timeOptions: Intl.DateTimeFormatOptions = { timeZone: 'Asia/Seoul' };

  if (isDay) {
    timeOptions.weekday = 'long';
    timeOptions.year = 'numeric';
    timeOptions.month = 'long';
    timeOptions.day = 'numeric';
  }

  if (isTime) {
    timeOptions.hour = 'numeric';
    timeOptions.minute = 'numeric';
    timeOptions.hourCycle = 'h23';
  }
  const today = new Intl.DateTimeFormat('ko-KR', timeOptions).format(new Date());
  return today;
};
