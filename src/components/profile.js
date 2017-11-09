import React from 'react';
import { Text, StyleSheet, View, ScrollView } from 'react-native';
import Badge from './badge';
import Separator from './helpers/separator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 18,
    color: '#fff',
  },
  rowContainer: {
    padding: 10,
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16,
  },
  rowContent: {
    fontSize: 19,
  },
});

class Profile extends React.Component {
  getRowTitle(user, item) {
    item = item === 'public_repos' ? item.replace('_', ' ') : item;
    return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
  }

  render() {
    const { userInfo } = this.props;
    const topicArr = [
      'company',
      'location',
      'followers',
      'following',
      'email',
      'bio',
      'public_repos',
    ];
    const list = topicArr.map((item, index) => {
      if (!userInfo[item]) {
        return <View key={index} />;
      } else {
        return (
          <View key={index}>
            <View style={styles.rowContainer}>
              <Text style={styles.rowTitle}>
                {this.getRowTitle(userInfo, item)}
              </Text>
              <Text style={styles.rowContent}>{userInfo[item]}</Text>
            </View>
            <Separator />
          </View>
        );
      }
    });
    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={this.props.userInfo} />
        {list}
      </ScrollView>
    );
  }
}

export default Profile;
