import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert,ImageBackground,Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';
import CustomStarRate from '../CustomStarRate/CustomStarRate';


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
      source={require('../images/new-back.png')}
      style={{ width: '100%', height: Dimensions.get('window').height }}
      resizeMode='cover'
  >
      <View style={styles.container}>
        <Text>Book Name</Text>
        <TextInput
          placeholder='Book Name'
          style={{ backgroundColor: 'grey', width: 150 }}
          onChangeText={(value) => this.setState({ bookName: value })}
        />
        <Text>Book Author</Text>
        <TextInput
          placeholder='Book Author'
          style={{ backgroundColor: 'grey', width: 150 }}
          onChangeText={(value) => this.setState({ bookAuthor: value })}
        />
        <Text>Book Description</Text>
        <TextInput
          placeholder='Book Description'
          multiline = {true}
          numberOfLines = {5}
          style={{ backgroundColor: 'grey', width: 250 }}
          onChangeText={(value) => this.setState({ bookDescription: value })}
        />
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 150, height: 150 }}
          />)}
        <TouchableOpacity onPress={()=>this.handleChoosePhoto()}>
          <View style={{marginTop:25,backgroundColor:'red',width:60,height:60,justifyContent:'center',alignItems:'center',borderRadius:180}}>
            <Text style={{fontSize:40,fontWeight:'bold'}}>+</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.saveBook()}>
          <View style={{ backgroundColor: 'green', width: 100, height: 50, justifyContent: 'center', alignItems: 'center', marginTop: 25 }}>
            <Text style={{fontSize:15,fontWeight:'bold'}}>SAVE BOOK</Text>
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
    justifyContent: 'center',
    alignItems: 'center'
  }
});
