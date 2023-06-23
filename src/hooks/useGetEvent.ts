interface EventType {
  dayNumber: number;
  hoursNumber: number;
  minutesNumber: number;
}

export default function useGetEvent(event: EventType) {
  const now = new Date();
  const currentDay: number = now.getDay();
  const currentHour: number = now.getHours();
  const currentMinutes: number = now.getMinutes();

  if (
    currentDay === event.dayNumber &&
    (currentHour < event.hoursNumber ||
      (currentHour === event.hoursNumber &&
        currentMinutes < event.minutesNumber))
  ) {
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      event.hoursNumber,
      event.minutesNumber,
      0
    ).getTime();
  } else {
    const daysUntilThursday: number = (7 - currentDay + event.dayNumber) % 7;
    const nextThursday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + daysUntilThursday,
      event.hoursNumber,
      event.minutesNumber,
      0
    );
    return nextThursday.getTime();
  }
}
