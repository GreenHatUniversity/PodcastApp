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

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    Sound.setCategory('Playback');
  }

  renderRow(item) {
    return (
      <View style={styles.row}>
        <TouchableOpacity onPress={() => {}}>
          <Image src={item.icon} />
          <Text style={styles.text1}>姓名：{item.name}</Text>
          <Text style={styles.text2}>总数：{item.postCount}</Text>
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
              <Text style={styles.notice} />
              <Text style={styles.description} />
              <Text style={styles.details} />
            </View>
            <View style={styles.body}>
              <FlatList renderItem={({item}) => this.renderRow(item)} />
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
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#ffffff',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#ffffff',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#000000',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
