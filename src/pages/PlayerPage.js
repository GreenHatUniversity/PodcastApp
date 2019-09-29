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
import Icon from 'react-native-vector-icons/Feather';
import Slider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';
import Global, {Player} from '../../Global';
import slider from '../resources/slider.png';

export default class PlayerPage extends React.Component {
  constructor(props) {
    super(props);
    this.parentPage = this.props.navigation.getParam('parentPage');
    this.state = {
      user: this.props.navigation.getParam('user'),
      album: this.props.navigation.getParam('album'),
      post: this.props.navigation.getParam('post'),

      state: this.props.navigation.getParam('state'),
      seconds: 0,
      duration: 0,

      isLoading: false,
    };
  }

  componentDidMount() {
    Global.player.addEventListener(Player.EventState, state => {
      this.setState({state: state});
      if (state === Player.PlayEnd) {
        const posts = this.state.user.posts.data;
        const index = posts.indexOf(this.state.post);
        if (index + 1 === posts.length) {
          return;
        }
        this.setState({isLoading: true, post: posts[index + 1]});
      } else if (state === Player.PlayPlaying) {
        this.setState({isLoading: false});
      } else if (state === Player.PlayError) {
        this.setState({isLoading: false});
      }
    });
    Global.player.addEventListener(Player.EventTime, seconds => {
      this.setState({seconds: seconds, duration: Global.player.duration});
    });
  }

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.navigation}>
            <TouchableWithoutFeedback
              onPress={() => this.props.navigation.pop()}>
              <Icon size={36} name={'chevron-down'} color={'#333333'} />
            </TouchableWithoutFeedback>
          </View>
          <Text style={styles.title}>{this.state.post.title}</Text>
          <LinearGradient
            colors={['#f1f1f1', '#ffffff']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.separator}
          />
          <Text style={styles.description}>{this.state.post.title}</Text>
          <View style={styles.userInfo}>
            <Image
              source={{
                uri: Global.postIconUrl(this.state.user, this.state.post),
              }}
              style={styles.avatar}
            />
            <Text style={styles.name}>{this.state.user.name}</Text>
          </View>
          <View style={styles.progress}>
            <Text style={styles.audioTime}>
              {Global.audioTimeString(this.state.seconds)}
            </Text>
            <Slider
              style={styles.slider}
              value={this.state.seconds}
              minimumValue={0}
              maximumValue={this.state.duration}
              minimumTrackTintColor={Global.themeColor}
              maximumTrackTintColor={'#EEEEEE'}
              thumbImage={slider}
              onValueChange={value => {
                Global.player.jumpToTime(value);
              }}
            />
            <Text style={styles.audioTime}>
              {Global.audioTimeString(this.state.duration)}
            </Text>
          </View>
          <View style={styles.control}>
            <TouchableWithoutFeedback
              onPress={() => Global.player.jumpPrev15Seconds()}>
              <Icon
                name={'chevrons-left'}
                size={40}
                color={Global.themeColor}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() =>
                this.parentPage.playLast((post, error) => {
                  if (!error) {
                    this.setState({post: post});
                  }
                })
              }>
              <Icon name={'skip-back'} size={30} color={Global.themeColor} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => Global.player.pause()}>
              <Icon
                name={
                  this.state.state === Player.PlayPlaying
                    ? 'pause-circle'
                    : 'play-circle'
                }
                size={80}
                color={Global.themeColor}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() =>
                this.parentPage.playNext((post, error) => {
                  if (!error) {
                    this.setState({post: post});
                  }
                })
              }>
              <Icon name={'skip-forward'} size={30} color={Global.themeColor} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => Global.player.jumpNext15Seconds()}>
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
