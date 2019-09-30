import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import * as Progress from 'react-native-progress';
import LoadingView from '../components/LoadingView';
import Player from '../components/Player';
import Global from '../../Global';
import AppApi from '../apis/AppApi';

export default class AudioListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      post: null,
      dataSource: [],

      state: Player.PlayPaused,
      seconds: 0,
    };
    this.duration = 0;
  }

  componentDidMount() {
    AppApi.appApi().then(() => {
      AppApi.usersApi().then(value => {
        this.setState({user: value.data[0]});
        AppApi.postsApi(this.state.user).then(value => {
          this.setState({dataSource: value.data});
        });
      });
    });

    Global.player.addEventListener(Player.EventState, state => {
      this.setState({state: state});
      if (state === Player.PlayEnd) {
        this.setState({isLoading: true});
        this.playNext((post, error) => {
          if (error) {
            alert('播放完毕:-D');
            this.setState({isLoading: false});
          }
        });
      } else if (state === Player.PlayPlaying) {
        this.setState({isLoading: false});
      } else if (state === Player.PlayError) {
        this.setState({isLoading: false});
      }
    });
    Global.player.addEventListener(Player.EventTime, seconds => {
      this.setState({seconds: seconds});
      this.duration = Global.player.duration;
      this.state.post.duration = Global.player.duration;
    });
  }

  play(post, cb) {
    Global.player
      .play(Global.postAudioUrl(this.state.user, post), error => {
        if (!error && cb) {
          cb(post);
        }
      })
      .then();
  }

  playLast(cb) {
    const index = this.state.dataSource.indexOf(this.state.post);
    if (index === 0) {
      cb(null, {message: 'not last'});
      return;
    }
    const post = this.state.dataSource[index - 1];
    this.setState({post: post});
    this.play(post, cb);
  }

  playNext(cb) {
    const index = this.state.dataSource.indexOf(this.state.post);
    if (index + 1 === this.state.dataSource.length) {
      cb(null, {message: 'not next'});
      return;
    }
    const post = this.state.dataSource[index + 1];
    this.setState({post: post});
    this.play(post, cb);
  }

  pushPlayer() {
    this.props.navigation.navigate('Player', {
      user: this.state.user,
      post: this.state.post,
      state: this.state.state,
      isLoading: this.state.isLoading,
      parentPage: this,
    });
  }

  renderItem(item) {
    const isSelected =
      this.state.post !== null && this.state.post.title === item.title;
    let postIndex = this.state.dataSource.indexOf(this.state.post);
    const isSeparator =
      (this.state.post !== null &&
        this.state.dataSource[postIndex > 0 ? postIndex - 1 : 0].title ===
          item.title) ||
      isSelected;
    return (
      <LinearGradient
        colors={isSelected ? ['#E7F7F7', '#FFFFFF'] : ['#FFFFFF', '#FFFFFF']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <TouchableOpacity
          style={[
            styles.item,
            isSelected ? {borderLeftColor: Global.themeColor} : null,
          ]}
          onPress={() => {
            if (item === this.state.post) {
              this.pushPlayer();
            } else {
              this.setState({post: item, isLoading: true});
              this.play(item, (post, error) => {
                if (!error) {
                  this.setState({isLoading: false});
                }
              });
            }
          }}>
          <Text
            numberOfLines={2}
            style={[
              styles.itemTitle,
              isSelected ? {color: Global.themeColor} : null,
            ]}>
            {item.title}
          </Text>
          <Text
            style={[
              styles.itemTime,
              isSelected ? {color: Global.themeColor} : null,
            ]}>
            {Global.audioTimeString(item.duration)}
          </Text>
        </TouchableOpacity>
        <LinearGradient
          colors={[isSeparator ? '#ffffff' : '#cecece', '#ffffff']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.separator}
        />
      </LinearGradient>
    );
  }

  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeAreaView}>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            {this.state.user ? (
              <View style={styles.header}>
                <Text style={styles.title}>{this.state.user.description}</Text>
                <View style={styles.userRow}>
                  <View style={styles.userInfo}>
                    <Image
                      source={{
                        uri: Global.userAvatarUrl(this.state.user),
                      }}
                      style={styles.avatar}
                    />
                    <Text style={styles.name}>{this.state.user.name}</Text>
                  </View>
                  <Icon
                    name={
                      this.state.state === Player.PlayPlaying
                        ? 'pause-circle'
                        : 'play-circle'
                    }
                    color={Global.themeColor}
                    size={70}
                    style={styles.play}
                  />
                </View>
              </View>
            ) : null}
            {this.state.dataSource.length ? (
              <View style={styles.body}>
                <FlatList
                  style={styles.flatList}
                  data={this.state.dataSource}
                  renderItem={({item}) => this.renderItem(item)}
                  ItemSeparatorComponent={() => <View />}
                />
              </View>
            ) : null}
          </ScrollView>
          {this.state.post ? (
            <View style={styles.footer}>
              <TouchableWithoutFeedback onPress={() => this.pushPlayer()}>
                <Icon name={'chevron-up'} size={26} color={'#000'} />
              </TouchableWithoutFeedback>
              <View style={styles.userContainer}>
                <View style={{width: 38, height: 38}}>
                  <Image
                    source={{
                      uri: Global.postIconUrl(this.state.user, this.state.post),
                    }}
                    style={[styles.avatar, styles.absolute, styles.avatar2]}
                  />
                  {this.state.isLoading ? (
                    <LoadingView
                      color={Global.themeColor}
                      size={38}
                      direction={'clockwise'}
                      style={styles.absolute}
                    />
                  ) : (
                    <Progress.Circle
                      color={Global.themeColor}
                      unfilledColor={'#E7F7F7'}
                      borderColor={'#E7F7F7'}
                      progress={this.state.seconds / this.state.post.duration}
                      size={38}
                      style={styles.absolute}
                    />
                  )}
                </View>
                <View style={{marginLeft: 8, marginRight: 40}}>
                  <Text
                    numberOfLines={1}
                    style={{color: '#333333', fontWeight: '500'}}>
                    {this.state.post.title}
                  </Text>
                  <Text style={{color: '#999999', fontWeight: '500'}}>
                    {this.state.post.album}
                  </Text>
                </View>
              </View>
              <TouchableWithoutFeedback
                onPress={() => {
                  Global.player.pause();
                }}>
                <Icon
                  name={
                    this.state.state === Player.PlayPlaying
                      ? 'pause-circle'
                      : 'play-circle'
                  }
                  size={42}
                  color={Global.themeColor}
                />
              </TouchableWithoutFeedback>
            </View>
          ) : null}
        </SafeAreaView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#ffffff',
  },
  header: {
    marginTop: 38,
    color: '#000000',
    paddingHorizontal: 26,
  },
  userRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 38 / 2.0,
    borderWidth: 0.5,
    borderColor: Global.themeColor,
  },
  avatar2: {
    borderWidth: 3,
    borderColor: '#E7F7F7',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222222',
    marginLeft: 8,
  },
  play: {
    // shader
  },
  body: {
    marginTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginRight: 90,
    color: '#333333',
  },
  flatList: {
    // backgroundColor: '#000'
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 26,
    borderLeftWidth: 5,
    borderLeftColor: '#ffffff',
  },
  itemTitle: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 30,
    paddingRight: 48,
    flex: 1,
  },
  itemTime: {
    color: '#999999',
    fontSize: 12,
    lineHeight: 30,
  },
  separator: {
    height: 0.5,
    marginHorizontal: 26,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 26,
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderTopColor: '#e3e3e3',
  },
  userContainer: {
    marginHorizontal: 12,
    flexDirection: 'row',
    flex: 1,
  },
});
