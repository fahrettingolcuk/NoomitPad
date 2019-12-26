import React,{Component} from 'react';
import {View,Text,StyleSheet,StatusBar} from 'react-native';
import Video from 'react-native-video';
import reco from '../video/reco.mp4'
export default class HomeScreen extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <Video
          repeat
          source={reco}
          resizeMode = 'cover'
          style={StyleSheet.absoluteFill}
          />

          <Text style={{color:'white',fontSize:60,fontWeight:'100'}}>NOOMITPAD</Text>
        </View>
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