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
import Icon from 'react-native-vector-icons/Feather';
import Progress from 'react-native-progress';

export default class PlayerPage extends React.Component {
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
  //
  // async componentDidMount() {
  //   // eslint-disable-next-line react/no-did-mount-set-state
  //   this.setState({appInfo: await AppApi.appApi()});
  //   // eslint-disable-next-line react/no-did-mount-set-state
  //   this.setState({dataSource: (await AppApi.usersApi()).users});
  // }

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.navigation}><Icon size={26} name={'chevron-down'} /></View>
          <View style={styles.title}>
            <Text>asdfasdfasdfdas</Text>
            <View/>
            <Text>asdfasdfasdfdas</Text>
            <View style={styles.userInfo}>
              <Image />
              <Text>刘栋梁</Text>
            </View>
          </View>
          <View style={styles.body}></View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
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
