
import React,{Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation'
import CustomTab from '../CustomTab/CustomTab'


import HomeScreen from '../HomeScreen/HomeScreen'
import NewRecord from '../NewRecord/NewRecord'
import BookList from '../BookList/BookList'

const TabNavigator = createBottomTabNavigator({
    Home:HomeScreen,
    NewRec : NewRecord,
    BookList : BookList
  },{tabBarComponent:props=><CustomTab {...props}/>})
  export default createAppContainer(TabNavigator);