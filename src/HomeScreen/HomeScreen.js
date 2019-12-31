import React,{Component} from 'react';
import {View,Text,StyleSheet,StatusBar,ImageBackground,Dimensions} from 'react-native';


export default class HomeScreen extends React.Component {
    render() {
      return (
        <ImageBackground
        source={require('../images/new-back.png')}
        style={{ width: '100%', height: Dimensions.get('window').height }}
        resizeMode='cover'
        >
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <Text style={{color:'white',fontSize:60,fontWeight:'100'}}>NOOMITPAD</Text>
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