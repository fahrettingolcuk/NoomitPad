import React,{Component} from 'react';
import {View,Text,StyleSheet, Button, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
export default class NewRecord extends React.Component {
    constructor(props){
        super(props);
        this.state  = {
            photo : null
        }
    }
    handleChoosePhoto = () =>{
        const options = {
            noData:true
        };
        ImagePicker.launchImageLibrary(options,response=>{
            console.log('response:',response);
            if(response.uri){
                this.setState({photo:response});
            }
        })
    }
    render() {
        const { photo } = this.state;
      return (
        <View style={styles.container}>
          <Text>NewwwRescord!</Text>
          <Text>faho!</Text>
          {photo&& (
          <Image
          source = {{uri:photo.uri}}
          style={{width:250,height:250}}
          />)}
          <Button title="Choose Photo" onPress={()=>this.handleChoosePhoto()}/>
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
  