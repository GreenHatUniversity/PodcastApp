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
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

import Global from '../../Global';
import AppApi from '../apis/AppApi';

export default class AudioListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      dataSource: [],
      itemSelected: null,
    };
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
  }

  renderItem(item) {
    const isSelected =
      this.state.itemSelected !== null &&
      this.state.itemSelected.title === item.title;
    let itemSelectedIndex = this.state.dataSource.indexOf(
      this.state.itemSelected,
    );
    const isSeparator =
      (this.state.itemSelected !== null &&
        this.state.dataSource[itemSelectedIndex > 0 ? itemSelectedIndex - 1 : 0]
          .title === item.title) ||
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
            this.setState({itemSelected: item});
          }}>
          <Text
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
            {item.time}
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
                    name={'play-circle'}
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
});
