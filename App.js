
import React,{Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation'

import CustomTab from './src/CustomTab/CustomTab'
import HomeScreen from './src/HomeScreen/HomeScreen'
import NewRecord from './src/NewRecord/NewRecord'
import BookList from './src/BookList/BookList'
const TabNavigator = createBottomTabNavigator({
  Home:HomeScreen,
  NewRec : NewRecord,
  ListBook : BookList
},{tabBarComponent:props=><CustomTab {...props}/>})
export default createAppContainer(TabNavigator);
