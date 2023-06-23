import React from 'react';
import { StyleSheet, View } from 'react-native';
import Countdown from './src/pages/Countdown';

export default function App() {
  return (
    <View style={styles.container}>
      <Countdown />
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
