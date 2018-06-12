import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, Text, View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator,createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import AuthLoadingScreen from './screens/auth_loading';
import SignInScreen from './screens/signin';
import SignUpScreen from './screens/signup';

import MyPostDetailScreen from './screens/MyPostDetail';

import HomeScreen from './tabnavigator/HomeTab';
import HeartScreen from './tabnavigator/LikeTab';
import WriteScreen from './tabnavigator/PlusTab';
import SearchScreen from './tabnavigator/SearchTab';
import ProfileScreen from './tabnavigator/ProfileTab';
import { Theme } from './config';

import { connect } from 'react-redux';
import { fetchUsers } from './actions';

const PostDetailStack = createStackNavigator({Profile: ProfileScreen, PostDetail: MyPostDetailScreen  });
const SignStack = createStackNavigator({ SignIn: SignInScreen });
const HomesStack = createStackNavigator({ Home: HomeScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen,SignUp: SignUpScreen });
const HomeStack = createStackNavigator({ Home: HomeScreen, Profile: ProfileScreen });
const SearchStack = createStackNavigator({ Search: SearchScreen });
const WriteStack = createStackNavigator({ Write: WriteScreen });
const HeartStack = createStackNavigator({ Heart: HeartScreen });
const ProfileStack = createStackNavigator({ Profile: ProfileScreen });
const RootStack = createBottomTabNavigator(
  {
    Home: HomeStack,
    Search: SearchStack,
    Write: WriteStack,
    Heart: HeartStack,
    Profile: PostDetailStack,

  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Profile') {
          iconName = `ios-person${focused ? '' : '-outline'}`;
        }
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Search') {
          iconName = `ios-search${focused ? '' : '-outline'}`;
        } else if (routeName === 'Write') {
          iconName = `ios-add-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Heart') {
          iconName = `ios-heart${focused ? '' : '-outline'}`;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: Theme.tintColor,
      inactiveTintColor: 'gray',
    },
  }
);



const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: RootStack,
    Auth: AuthStack,
    Sign:SignStack,
    Home:HomeStack,
    PostDetail:PostDetailStack
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default AppNavigator;