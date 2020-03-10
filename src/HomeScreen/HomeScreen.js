import React,{Component} from 'react';
import {View,Text,StyleSheet,StatusBar,ImageBackground,Dimensions} from 'react-native';
import Svg,{Image} from 'react-native-svg'

export default class HomeScreen extends React.Component {
    render() {
      return (
        <ImageBackground
        source={require('../images/BACKGROUND-noomit.png')}
        style={{ width: '100%', height: Dimensions.get('window').height}}
        resizeMode='cover'
        >
        <View style={styles.container}>
          <StatusBar hidden={true} />
          
        </View>
        </ImageBackground>
      );
    }
  }
  const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent:'center',
        alignItems:'center'
    }
  });