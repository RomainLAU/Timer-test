import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<string>();
  const [event, setEvent] = useState<string>();
  const timeoutInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  function getEvent(
    dayNumber: number,
    hoursNumber: number,
    minutesNumber: number
  ) {
    const now = new Date();
    const currentDay: number = now.getDay();
    const currentHour: number = now.getHours();
    const currentMinutes: number = now.getMinutes();

    if (
      currentDay === dayNumber &&
      (currentHour < hoursNumber ||
        (currentHour === hoursNumber && currentMinutes < minutesNumber))
    ) {
      return new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hoursNumber,
        minutesNumber,
        0
      ).getTime();
    } else {
      const daysUntilThursday: number = (7 - currentDay + dayNumber) % 7;
      const nextThursday = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + daysUntilThursday,
        hoursNumber,
        minutesNumber,
        0
      );
      return nextThursday.getTime();
    }
  }

  const startTimer: () => void = () => {
    if (!isRunning) {
      setIsRunning(true);
      timeoutInterval.current = setInterval(() => {
        getNextDate();
      }, 1000);
    } else {
      stopTimer();
      timeoutInterval.current = setInterval(() => {
        getNextDate();
      }, 1000);
      setIsRunning(true);
    }
  };

  const stopTimer: () => void = () => {
    if (isRunning && timeoutInterval.current !== null) {
      setIsRunning(false);
      clearInterval(timeoutInterval.current);
    }
  };

  function getNextDate() {
    const events: number[] = [
      getEvent(1, 17, 0), // Lundi, 17h, 00m
      getEvent(4, 2, 37), // Jeudi, 2h, 37m
      getEvent(6, 14, 54), // Samedi, 14h, 54m
    ];

    const start: number = Math.min(...events);

    setEvent(new Date(start).toLocaleString('fr-Fr'));

    let now: number = new Date().getTime();

    let remain: number = (start - now) / 1000;

    let dd: number = pad(Math.floor(remain / (60 * 60 * 24)));
    let hh: number = pad(Math.floor((remain / (60 * 60)) % 24));
    let mm: number = pad(Math.floor((remain / 60) % 60));
    let ss: number = pad(Math.floor(remain % 60));

    let finalTime: string = '';

    if (dd >= 1) {
      finalTime += `${dd} day${dd > 1 ? 's' : ''}, `;
    }

    if (hh >= 1) {
      finalTime += `${hh} hour${hh > 1 ? 's' : ''}, `;
    }

    if (mm >= 1) {
      finalTime += `${mm} minute${mm > 1 ? 's' : ''}, `;
    }

    if (ss >= 1) {
      finalTime += `and ${ss} second${ss > 1 ? 's' : ''} remaining.`;
    }

    setCountdown(finalTime);
  }

  function pad(num: number) {
    return parseInt(('' + num).padStart(2, '0'));
  }

  useEffect(() => {
    startTimer();

    () => {
      stopTimer();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>{event}</Text>
      <Text>{countdown}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
