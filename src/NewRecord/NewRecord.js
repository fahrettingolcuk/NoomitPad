import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert,ImageBackground,Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';
import CustomStarRate from '../CustomStarRate/CustomStarRate';
import {Icon} from 'react-native-elements'


import { connect } from 'react-redux'
const db = SQLite.openDatabase({ name: 'myProject.db', location: 'default' });

let NewBookObj = [];

class NewRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      bookName: '',
      bookAuthor: '',
      bookUri: '',
      bookDescription: ''
    }
    db.transaction((tx) => {
      //tx.executeSql('DROP TABLE Books')
      tx.executeSql('CREATE TABLE IF NOT EXISTS Books(book_id INTEGER PRIMARY KEY NOT NULL,book_name VARCHAR(30),book_author VARCHAR(30),book_uri VARCHAR(50),book_descr VARCHAR(350))', []);
    })
  }
  handleChoosePhoto = () => {
    const options = {
      noData: true
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ bookUri: response.uri, photo: response });
      }
    })
  }
  saveBook = () => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO Books (book_name,book_author,book_uri,book_descr) VALUES (:book_name,:book_author,:book_uri,:book_descr)', [this.state.bookName, this.state.bookAuthor, this.state.bookUri,this.state.bookDescription]);
      tx.executeSql('SELECT * FROM Books', [], (tx, result) => {
        NewBookObj = result.rows.item(result.rows.length - 1) //NEWBOOK has make new object
        this.props.newBook();  //object have send to redux state
      })
    })
    Alert.alert('SAVE BOOK');
  }
  render() {
    const { photo } = this.state;
    return (
      <ImageBackground
      source={require('../images/BACKGROUND-noomit.png')}
      style={{ width: '100%', height: Dimensions.get('window').height }}
      resizeMode='cover'
  >
      <View style={styles.container}>



        <Text style={{color:'#383687',fontWeight:'bold',fontSize:16}}>Book Name</Text>
        <View style={{backgroundColor:'#C8CEFF',flexDirection:'row',alignItems:'center',borderRadius:180,width:'60%',
        shadowColor:'#3100FF',shadowOffset:{width:0,height:3},shadowOpacity:0.5,shadowRadius:2,elevation:10        
        }}>
          <View style={{marginLeft:8}}>
          <Icon
          name='attachment'
          />
          </View>
        <TextInput
          placeholder='Book Name'
          style={{width:'81%',color:'#383687',fontWeight:'bold'}}
          onChangeText={(value) => this.setState({ bookName: value })}
        />
        </View>



        <Text style={{color:'#383687',fontWeight:'bold',fontSize:16,marginTop:16}}>Book Author</Text>
        <View style={{backgroundColor:'#C8CEFF',flexDirection:'row',alignItems:'center',borderRadius:180,width:'60%',
        shadowColor:'#3100FF',shadowOffset:{width:0,height:3},shadowOpacity:0.5,shadowRadius:2,elevation:10        
        }}>
          <View style={{marginLeft:8}}>
          <Icon
          name='person'
          />
          </View>
        <TextInput
          placeholder='Book Author'
          style={{width:'81%',color:'#383687',fontWeight:'bold'}}
          onChangeText={(value) => this.setState({ bookAuthor: value })}
        />
        </View>



        <Text style={{color:'#383687',fontWeight:'bold',fontSize:16,marginTop:16}}>Book Description</Text>
        <TextInput
          placeholder='Book Description'
          multiline = {true}
          numberOfLines = {5}
          style={{ backgroundColor: '#C8CEFF', width: 250,color:'#383687',fontWeight:'bold',borderRadius:25,
          shadowColor:'#3100FF',shadowOffset:{width:0,height:3},shadowOpacity:0.5,shadowRadius:2,elevation:10 }}
          onChangeText={(value) => this.setState({ bookDescription: value })}
        />
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 150, height: 150,marginTop:16 }}
          />)}
        <TouchableOpacity onPress={()=>this.handleChoosePhoto()}>
          <View style={{marginTop:25,width:60,height:60,justifyContent:'center',alignItems:'center',borderRadius:180,borderColor:'#715BFF',borderWidth:3}}>
            <Text style={{fontSize:64,fontWeight:'bold',color:'#715BFF',marginBottom:4}}>+</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:36}} onPress={() => this.saveBook()}>
          <View style={{ backgroundColor: 'white', width: 169, height: 81, justifyContent: 'center', alignItems: 'center', marginTop:2,borderRadius:180 }}>
            <Text style={{fontSize:45,fontWeight:'bold',color:'#715BFF'}}>SAVE</Text>
          </View>
        </TouchableOpacity>
      </View>
      </ImageBackground>
    );
  }
}
function mapStateToProps(state) { //MAPLEME YAPARAK COMPONENTTE KULLANDIĞIMIZ COUNTERI APP TEKİ COUNTERE MATCHLEDİK
  return {
    bookListRedux: state.bookListRedux
  }
}
function mapDispatchToProps(dispatch) { //EĞER SADECE LİSTELEME YAPACAKSAK BUNA GEREK YOK AMA STATE'İ DEĞİŞTİRCEKSEK BU LAZIM
  return {
    newBook: () => dispatch({ type: 'new_book', NewBook: NewBookObj })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewRecord)




const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:81,
    alignItems: 'center'
  }
});
