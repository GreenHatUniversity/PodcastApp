import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Sound from 'react-native-sound';
import Icon from 'react-native-vector-icons/Feather';
import Slider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';
import Global from '../../Global';
import slider from '../resources/slider.png';

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
          <View style={styles.navigation}>
            <Icon size={36} name={'chevron-down'} color={'#333333'} />
          </View>
          <Text style={styles.title}>
            213. 德州仪器: 开拓硅晶体管的先驱, 213. 德州仪器:
            开拓硅晶体管的先驱7
          </Text>
          <LinearGradient
            colors={['#f1f1f1', '#ffffff']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.separator}
          />
          <Text style={styles.description}>
            213. 德州仪器: 开拓硅晶体管的先驱, 213. 德州仪器:
            开拓硅晶体管的先驱7</Text>
          <View style={styles.userInfo}>
            <Image
              source={{
                uri: Global.imagePath(
                  'wKgKjFsqBdXTDdNvAABO2sCYFqc203.png',
                  'liudongliang',
                ),
              }}
              style={styles.avatar}
            />
            <Text style={styles.name}>刘延栋</Text>
          </View>
          <View style={styles.progress}>
            <Text style={styles.audioTime}>00:00</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor={Global.themeColor}
              maximumTrackTintColor={'#EEEEEE'}
              thumbImage={slider}
            />
            <Text style={styles.audioTime}>31:12</Text>
          </View>
          <View style={styles.control}>
            <TouchableWithoutFeedback>
              <Icon
                name={'chevrons-left'}
                size={40}
                color={Global.themeColor}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <Icon name={'skip-back'} size={30} color={Global.themeColor} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <Icon name={'play-circle'} size={80} color={Global.themeColor} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <Icon name={'skip-forward'} size={30} color={Global.themeColor} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback>
              <Icon
                name={'chevrons-right'}
                size={40}
                color={Global.themeColor}
              />
            </TouchableWithoutFeedback>
          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#ffffff',
    marginHorizontal: 26,
    justifyContent: 'space-between',
    flex: 1,
  },
  navigation: {
    marginTop: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 38,
    marginRight: 90,
    color: '#333333',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 68 / 2.0,
    borderWidth: 0.5,
    borderColor: Global.themeColor,
  },
  name: {
    fontSize: 24,
    color: '#222222',
    marginLeft: 18,
  },
  separator: {
    height: 2,
    flex: -1,
  },
  description: {
    fontSize: 16,
    color: '#bebebe',
    marginRight: 90,
    lineHeight: 26,
  },
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slider: {
    flex: 1,
    marginHorizontal: 14,
  },
  audioTime: {
    color: '#666666',
  },
  control: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
