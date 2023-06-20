import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState();
  const [event, setEvent] = useState();
  const timeoutInterval = useRef(null);

  function getEvent(dayNumber, hoursNumber, minutesNumber) {
    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

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
      const daysUntilThursday = (7 - currentDay + dayNumber) % 7;
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

  const startTimer = () => {
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

  const stopTimer = () => {
    if (isRunning && timeoutInterval.current !== null) {
      setIsRunning(false);
      clearInterval(timeoutInterval.current);
    }
  };

  function getNextDate() {
    const events = [
      getEvent(1, 17, 0), // Lundi, 17h, 00m
      getEvent(4, 2, 37), // Jeudi, 2h, 37m
      getEvent(6, 14, 54), // Samedi, 14h, 54m
    ];

    const start = Math.min(...events);

    setEvent(new Date(start).toLocaleString('fr-Fr'));

    let now = new Date().getTime();

    let remain = (start - now) / 1000;

    let dd = pad(Math.floor(remain / (60 * 60 * 24)));
    let hh = pad(Math.floor((remain / (60 * 60 * 24)) % 24));
    let mm = pad(Math.floor((remain / 60) % 60));
    let ss = pad(Math.floor(remain % 60));

    let finalTime = '';

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

  function pad(num) {
    return ('' + num).padStart(2, '0');
  }

  useEffect(() => {
    startTimer();

    () => {
        stopTimer();
    }
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
