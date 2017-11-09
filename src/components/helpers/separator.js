import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#E4E4E4',
    height: 1,
    flex: 1,
    marginLeft: 15,
  },
});

class Separator extends React.Component {
  render() {
    return <View style={styles.separator} />;
  }
}

export default Separator;
