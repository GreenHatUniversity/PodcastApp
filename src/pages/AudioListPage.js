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
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

import Global from '../../Global';

export default class AudioListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [
        {
          title:
            '213. 德州仪器: 开拓硅晶体管的先驱, 213. 德州仪器: 开拓硅晶体管的先驱1',
          time: 3000,
        },
        {
          title: '213. 德州仪器: 开拓硅晶体管的先驱2',
          time: 3000,
        },
        {
          title:
            '213. 德州仪器: 开拓硅晶体管的先驱, 213. 德州仪器: 开拓硅晶体管的先驱3',
          time: 3000,
        },
        {
          title: '213. 德州仪器: 开拓硅晶体管的先驱4',
          time: 3000,
        },
        {
          title:
            '213. 德州仪器: 开拓硅晶体管的先驱, 213. 德州仪器: 开拓硅晶体管的先驱5',
          time: 3000,
        },
        {
          title: '213. 德州仪器: 开拓硅晶体管的先驱6',
          time: 3000,
        },
        {
          title:
            '213. 德州仪器: 开拓硅晶体管的先驱, 213. 德州仪器: 开拓硅晶体管的先驱7',
          time: 3000,
        },
        {
          title: '213. 德州仪器: 开拓硅晶体管的先驱8',
          time: 3000,
        },
        {
          title:
            '213. 德州仪器: 开拓硅晶体管的先驱, 213. 德州仪器: 开拓硅晶体管的先驱9',
          time: 3000,
        },
        {
          title: '213. 德州仪器: 开拓硅晶体管的先驱0',
          time: 3000,
        },
      ],
      itemSelected: null,
    };
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
            <View style={styles.header}>
              <Text style={styles.title}>
                《软件那些事儿》213. 德州仪器: 开拓硅晶体管的先驱
              </Text>
              <View style={styles.userRow}>
                <View style={styles.userInfo}>
                  <Image
                    source={{
                      uri: Global.imagePath(
                        'wKgJo1p-6_-yMyjuAAj66HVMFrY586.png',
                        'liudongliang',
                      ),
                    }}
                    style={styles.avatar}
                  />
                  <Text style={styles.name}>刘延栋</Text>
                </View>
                <Icon
                  name={'play-circle'}
                  color={Global.themeColor}
                  size={70}
                  style={styles.play}
                />
              </View>
            </View>
            <View style={styles.body}>
              <FlatList
                style={styles.flatList}
                data={this.state.dataSource}
                renderItem={({item}) => this.renderItem(item)}
                ItemSeparatorComponent={() => <View />}
              />
            </View>
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
