import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import Profile from './profile';
import Repositories from './repositories';
import Notes from './notes';
import api from '../utils/api';

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1,
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: '#fff',
    alignSelf: 'center',
  },
});

class Dashboard extends React.Component {
  constructor() {
    super();
    this.goToProfile = this.goToProfile.bind(this);
    this.goToRepos = this.goToRepos.bind(this);
    this.goToNotes = this.goToNotes.bind(this);
  }

  goToProfile() {
    const { userInfo, navigator } = this.props;
    this.props.navigator.push({
      title: 'Profile Page',
      component: Profile,
      passProps: { userInfo: userInfo },
    });
  }

  goToRepos() {
    const { userInfo, navigator } = this.props;
    api.getRepos(userInfo.login).then(res => {
      this.props.navigator.push({
        title: 'Repos',
        component: Repositories,
        passProps: { userInfo: userInfo, repos: res },
      });
    });
  }

  goToNotes() {
    const { userInfo, navigator } = this.props;
    api.getNotes(userInfo.login).then(res => {
      console.log('REEEEES', res);
      res = res || {};
      this.props.navigator.push({
        title: 'Notes',
        component: Notes,
        passProps: { notes: res, userInfo: userInfo },
      });
    });
  }

  makeBackground(btn) {
    const obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1,
    };

    if (btn === 0) {
      obj.backgroundColor = '#48BBEC';
    } else if (btn === 1) {
      obj.backgroundColor = '#E77AAE';
    } else {
      obj.backgroundColor = '#758BF4';
    }

    return obj;
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: this.props.userInfo.avatar_url }}
          style={styles.image}
        />
        <TouchableHighlight
          onPress={this.goToProfile}
          underlayColor="#88D4F5"
          style={this.makeBackground(0)}
        >
          <Text style={styles.buttonText}>View profile</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.goToRepos}
          underlayColor="#88D4F5"
          style={this.makeBackground(1)}
        >
          <Text style={styles.buttonText}>View repos</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.goToNotes}
          underlayColor="#88D4F5"
          style={this.makeBackground(2)}
        >
          <Text style={styles.buttonText}>View notes</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Dashboard;
