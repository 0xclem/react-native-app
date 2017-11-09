import React from 'react';
import PropTypes from 'prop-types';
import { View, WebView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
    flexDirection: 'column',
  },
});

class WebViewCustom extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <WebView source={{ uri: this.props.url }} />
      </View>
    );
  }
}

WebViewCustom.propTypes = {
  url: PropTypes.string.isRequired,
};

export default WebViewCustom;
