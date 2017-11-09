import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';
import {
  View,
  Text,
  ListView,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import Badge from './badge';
import Separator from './helpers/separator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10,
  },
  rowContainer: {
    padding: 10,
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      note: '',
      dataSource: this.ds.cloneWithRows(props.notes),
      error: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  handleChange(e) {
    this.setState({
      note: e.nativeEvent.text,
    });
  }

  handleSubmit() {
    const { note } = this.state;
    this.setState({ note: '' });
    api.addNote(this.props.userInfo.login, note).then(data => {
      api
        .getNotes(this.props.userInfo.login)
        .then(data => {
          this.setState({
            dataSource: this.ds.cloneWithRows(data),
          });
        })
        .catch(err => {
          console.log('Request failed', err);
          this.setState({ error: err });
        });
    });
  }

  renderRow(rowData) {
    return (
      <View>
        <View style={styles.rowContainer}>
          <Text>{rowData}</Text>
        </View>
        <Separator />
      </View>
    );
  }

  renderHeader() {
    return <Badge userInfo={this.props.userInfo} />;
  }

  footer() {
    return (
      <View style={styles.footerContainer}>
        <TextInput
          style={styles.searchInput}
          value={this.state.note}
          onChange={this.handleChange}
          placeholder={'New Note'}
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit}
          underlayColor="#88D4F5"
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }
  render() {
    const { dataSource } = this.state;
    return (
      <View style={styles.container}>
        <ListView
          dataSource={dataSource}
          renderRow={this.renderRow}
          renderHeader={this.renderHeader}
          enableEmptySections={true}
        />
        {this.footer()}
      </View>
    );
  }
}

Notes.propTypes = {
  userInfo: PropTypes.object.isRequired,
  notes: PropTypes.object.isRequired,
};

export default Notes;
