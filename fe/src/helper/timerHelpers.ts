export const getTimeFormatString = (time: number) => {
  const hour = Math.floor(time / 3600)
    .toString()
    .padStart(2, '0');
  const min = Math.floor((time % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const sec = Math.floor(time % 60)
    .toString()
    .padStart(2, '0');

  return `${hour}:${min}:${sec}`;
};
