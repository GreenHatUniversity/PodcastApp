import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import Sound from 'react-native-sound';

import AppApi from '../apis/AppApi';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    Sound.setCategory('Playback');
    this.state = {
      appInfo: {
        notice: '',
      },
      dataSource: [],
    };
  }

  async componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({appInfo: await AppApi.appApi()});
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({dataSource: (await AppApi.usersApi()).users});
  }

  renderItem(item) {
    return (
      <View style={styles.item}>
        <TouchableOpacity onPress={() => {}}>
          <Image src={item.icon} />
          <Text style={styles.text1}>姓名：{item.name}</Text>
          <Text style={styles.text2}>总数：{item.count}</Text>
          <Text style={styles.text3}>最后更新时间：{item.updateTime}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.header}>
              <Text style={styles.notice}>{this.state.appInfo.notice}</Text>
              <Text style={styles.description}>
                {this.state.appInfo.description}
              </Text>
            </View>
            <View style={styles.body}>
              <FlatList
                style={styles.list}
                data={this.state.dataSource}
                renderItem={({item}) => this.renderItem(item)}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  header: {
    marginTop: 8,
    marginHorizontal: 8,
  },
  body: {
    marginTop: 8,
    marginHorizontal: 8,
    backgroundColor: '#ffffff',
    flex: 1,
  },
  list: {
    flexDirection: 'row',
    flex: 1,
  },
});
