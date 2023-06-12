import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState();

  function mondayEvent() {
    const date = new Date();
    date.setDate(date.getDate() + ((1 + 7 - date.getDay()) % 7 || 7));
    date.setHours(17, 0, 0); // 5:00PM

    return date;
  }

  function thursdayEvent() {
    const date = new Date();
    date.setDate(date.getDate() + ((1 + 7 - date.getDay()) % 7 || 7));
    date.setHours(2, 37, 0); // 2:37AM

    return date;
  }

  function SaturdayEvent() {
    const date = new Date();
    date.setDate(date.getDate() + ((1 + 7 - date.getDay()) % 7 || 7));
    date.setHours(14, 54, 0); // 2:54PM

    return date;
  }

  const timeoutInterval = useRef(null);

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
    }
  };

  const stopTimer = () => {
    if (isRunning && timeoutInterval.current !== null) {
      setIsRunning(false);
      clearInterval(timeoutInterval.current);
    }
  };

  function msToTime(duration) {
    let milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
  }

  function getNextDate() {
    // const eventsAsMs = [
    //   mondayEvent().getTime(),
    //   thursdayEvent().getTime(),
    //   SaturdayEvent().getTime(),
    // ];

    // console.log(eventsAsMs);

    // const start = Math.min(...eventsAsMs);

    // console.log(start);

    const start = mondayEvent();

    console.log(start);

    let now = new Date();
    if (now > start) {
      start.setDate(start.getDate() + 1);
    }
    let remain = (start - now) / 1000;
    let hh = pad((remain / 60 / 60) % 60);
    let mm = pad((remain / 60) % 60);
    let ss = pad(remain % 60);
    setCountdown(hh + ':' + mm + ':' + ss);
  }

  function pad(num) {
    return ('' + parseInt(num)).padStart(2, '0');
  }

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <View style={styles.container}>
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
