interface getCurrentDateProps {
  isDay: boolean;
  isTime: boolean;
  dateString?: string;
}
export const getCurrentDate = ({ isDay = true, isTime = false, dateString }: getCurrentDateProps) => {
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

  // dateString이 없으면 현재 날짜를 사용
  const date = dateString ? new Date(dateString) : new Date();
  const formattedDate = new Intl.DateTimeFormat('ko-KR', timeOptions).format(date);

  return formattedDate;
};
