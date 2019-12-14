
import React,{Component} from 'react';
import {
  View,
  Text,
} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation'

import CustomTab from './src/CustomTab/CustomTab'
import HomeScreen from './src/HomeScreen/HomeScreen'
import NewRecord from './src/NewRecord/NewRecord'
const TabNavigator = createBottomTabNavigator({
  Home:HomeScreen,
  NewRec : NewRecord
},{tabBarComponent:props=><CustomTab {...props}/>})
export default createAppContainer(TabNavigator);


