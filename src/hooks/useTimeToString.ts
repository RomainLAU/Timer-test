export default function useTimeToString(start: number) {
  const pad = (num: number) => {
    return parseInt(('' + num).padStart(2, '0'));
  };

  const now: number = new Date().getTime();

  const remain: number = (start - now) / 1000;

  const days: number = pad(Math.floor(remain / (60 * 60 * 24)));
  const hours: number = pad(Math.floor((remain / (60 * 60)) % 24));
  const minutes: number = pad(Math.floor((remain / 60) % 60));
  const seconds: number = pad(Math.floor(remain % 60));

  let finalTime: string = '';

  finalTime += `${days} day${days > 1 ? 's' : ''}, `;

  finalTime += `${hours} hour${hours > 1 ? 's' : ''}, `;

  finalTime += `${minutes} minute${minutes > 1 ? 's' : ''}, `;

  finalTime += `and ${seconds} second${seconds > 1 ? 's' : ''} remaining.`;

  return finalTime;
}
