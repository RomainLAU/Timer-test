import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useTimeToString from '../hooks/useTimeToString';
import useGetEvent, { EventType } from '../hooks/useGetEvent';

export default function Timer() {
  const [countdown, setCountdown] = useState<string>();
  const [event, setEvent] = useState<string>();

  const eventDetails: EventType[] = [
    { dayNumber: 1, hoursNumber: 17, minutesNumber: 0 }, // Lundi, 17h, 00m
    { dayNumber: 4, hoursNumber: 2, minutesNumber: 37 }, // Jeudi, 2h, 37m
    { dayNumber: 6, hoursNumber: 14, minutesNumber: 54 }, // Samedi, 14h, 54m
  ];

  const getNextDate = () => {
    const events: number[] = eventDetails.map((event) => useGetEvent(event));

    const start: number = Math.min(...events);

    setEvent(new Date(start).toLocaleString('fr-Fr'));

    const finalTime: string = useTimeToString(start);

    setCountdown(finalTime);
  };

  useEffect(() => {
    const countdown: ReturnType<typeof setInterval> = setInterval(() => {
      getNextDate();
    }, 1000);

    () => {
      clearInterval(countdown);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>{event}</Text>
      <Text>{countdown}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 24,
    fontFamily: 'sans-serif',
  },
  h1: {
    fontSize: 24,
  },
});
