import React from 'react';
import { NavigatorIOS, StyleSheet } from 'react-native';
import Main from './src/components/main';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default class App extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Github Notetaker',
          component: Main,
        }}
      />
    );
  }
}
