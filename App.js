import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {fromBottom} from 'react-navigation-transitions';
import HomePage from './src/pages/HomePage';
import AudioListPage from './src/pages/AudioListPage';
import PlayerPage from './src/pages/PlayerPage';

console.disableYellowBox = true;

const AppStackNavigator = createStackNavigator(
  {
    Home: {
      screen: HomePage,
      navigationOptions: ({navigation}) => ({
        title: '首页',
        header: null,
      }),
    },
    AudioList: {
      screen: AudioListPage,
      navigationOptions: ({navigation}) => ({
        title: '声音列表',
        header: null,
      }),
    },
    Player: {
      screen: PlayerPage,
      navigationOptions: ({navigation}) => ({
        title: '播放器',
        header: null,
      }),
    },
  },
  {
    initialRouteName: 'AudioList',
    transitionConfig: () => fromBottom(),
  },
);

export default createAppContainer(AppStackNavigator);
