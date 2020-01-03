
import React,{Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation'
import CustomTab from '../CustomTab/CustomTab'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View,Text,Image} from 'react-native'

import HomeScreen from '../HomeScreen/HomeScreen'
import NewRecord from '../NewRecord/NewRecord'
import BookList from '../BookList/BookList'




const TabNavigator = createBottomTabNavigator({
    Home:{
     screen:HomeScreen,
     navigationOptions:{
       tabBarIcon:({color,size})=>(
       <Image source={require('../images/home.png')} style={{width:30,height:30,tintColor:color}}/>
       )
     }
     
    },
    BookList :{
      screen:BookList,
      navigationOptions:{
        tabBarIcon:({color,size})=>(<Image source={require('../images/book.png')} style={{width:30,height:30,tintColor:color}}/>)
      },
    },
    NewRec :{
      screen:NewRecord,
      navigationOptions:{
        tabBarIcon:({color,size})=>(<Image source={require('../images/new-record.png')} style={{width:30,height:30,tintColor:color}}/>)
      } 
    },
},
{
  initialRouteName:'Home',
  tabBarOptions:{
    activeTintColor:'tomato',
  }
}
)
  export default createAppContainer(TabNavigator);
  //,{tabBarComponent:props=><CustomTab {...props}/>}