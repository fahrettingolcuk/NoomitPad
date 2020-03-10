
import React,{Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation'
import CustomTab from '../CustomTab/CustomTab'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View,Text,Image} from 'react-native'

import HomeScreen from '../HomeScreen/HomeScreen'
import NewRecord from '../NewRecord/NewRecord'
import BookList from '../BookList/BookList'

import Icon from 'react-native-vector-icons/Ionicons'



const TabNavigator = createBottomTabNavigator({
    Home:{
     screen:HomeScreen,
     navigationOptions:{
       tabBarIcon:({tintColor,size})=>(
         <Icon
         name = 'ios-home'
         color = {tintColor}
         size = {36}
         />
       )
     }
     
    },
    BookList :{
      screen:BookList,
      navigationOptions:{
        tabBarLabel:'Book List',
        tabBarIcon:({tintColor,size})=>(
          <Icon
          name = 'ios-book'
          color = {tintColor}
          size = {36}
          />
        )
      },
    },
    NewRec :{
      screen:NewRecord,
      navigationOptions:{
        tabBarLabel:'New Book',
        tabBarIcon:({tintColor,size})=>(
          <Icon
          name = 'ios-document'
          color = {tintColor}
          size = {36}
          />
        )
      },
    },
},
{
  initialRouteName:'Home',
  tabBarOptions:{
    activeTintColor:'white',
    tabStyle:{backgroundColor:'#462BF3',marginTop:-1,marginBottom:-1}
  }
}
)
  export default createAppContainer(TabNavigator);
  //,{tabBarComponent:props=><CustomTab {...props}/>}