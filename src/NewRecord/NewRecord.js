import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, TextInput, FlatList, Alert,TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import SQLite from 'react-native-sqlite-storage';

import {connect} from 'react-redux'

const db = SQLite.openDatabase({ name: 'Records.db', location: 'default' });
class NewRecord extends React.Component {
  constructor(props) {
    super(props);
  }
  // saveBook = () => {
  //   db.transaction((mydb) => {
  //     console.log(this.state.bookAuthor);
  //     console.log(this.state.bookUri);
  //     mydb.executeSql('INSERT INTO Bookss (book_name,book_author,book_uri) VALUES (:book_name,:book_author,:book_uri)', [this.state.bookName, this.state.bookAuthor,this.state.bookUri]);
  //   })
  //   Alert.alert('BOOK SAVEDs');
  // }

  render() {
    const { photo } = this.props; //this props olacak.
    return (
      <View style={styles.container}>
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 250, height: 250 }}
          />
        )}
        <Text>BOOKS NAME</Text>
        <TextInput
          onChangeText={(value) => this.props.bookNameFunct(value)}
          style={{ borderWidth: 1, width: 150 }}
        />
        <Text>BOOK AUTHOR</Text>
        <TextInput
          onChangeText={(value) => this.props.bookAuthorFunct(value)}
          //propstaki bookauthora at 
          style={{ borderWidth: 1, width: 150 }}
        />
        <Button title="Choose Photo" onPress={() => this.props.handleChoosePhoto()} />
        <Button title="SAVE BOOK" onPress={() => this.props.saveBook()} />
        <View>
        <Text>{this.props.bookName}</Text>
        <Text>--------</Text>
        <Text>{this.props.bookAuthor}</Text>
        </View>
      </View>
    );
  }
}
function mapStateToProps(state){
  return{
    bookName : state.bookName,
    bookAuthor : state.bookAuthor,
    bookUri : state.bookUri,
    photo : state.photo,
  }
}
function mapDispatchToProps(dispatch){
  return {
    saveBook : ()=>dispatch({type:'SaveBook'}),
    bookNameFunct : (myvalueName)=>dispatch({type:'UpdateBookName',valueName : myvalueName}),
    bookAuthorFunct : (myvalueAuthor)=>dispatch({type:'UpdateBookAuthor',valueAuthor : myvalueAuthor}),
    handleChoosePhoto : ()=>dispatch({type:'HandlePhoto'}),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(NewRecord)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
