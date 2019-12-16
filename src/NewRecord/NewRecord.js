import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image, TextInput, FlatList, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import SQLite from 'react-native-sqlite-storage';
import BookList from '../BookList/BookList'
const db = SQLite.openDatabase({ name: 'Records.db', location: 'default' });
export default class NewRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null,
      bookName: '',
      bookAuthor: '',
      bookUri:'',
      Values: [],
    }
    db.transaction((mydb) => {
      //mydb.executeSql('DELETE FROM Bookss', []);
      mydb.executeSql('CREATE TABLE IF NOT EXISTS Bookss(book_id INTEGER PRIMARY KEY NOT NULL,book_name VARCHAR(30),book_author VARCHAR(30),book_uri VARCHAR(30))', []);
    });
  }
  handleChoosePhoto = () => {
    const options = {
      noData: true
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({bookUri: response.uri})
        this.setState({ photo: response});
      }
    })
  }
  saveBook = () => {
    this.state.Values.length = 0;
    db.transaction((mydb) => {
      console.log(this.state.bookAuthor);
      console.log(this.state.bookUri);
      mydb.executeSql('INSERT INTO Bookss (book_name,book_author,book_uri) VALUES (:book_name,:book_author,:book_uri)', [this.state.bookName, this.state.bookAuthor,this.state.bookUri]);
    })
    Alert.alert('BOOK SAVEDs');
  }

  render() {
    const { photo } = this.state;
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
          onChangeText={(value) => this.setState({ bookName: value })}
          style={{ borderWidth: 1, width: 150 }}
        />
        <Text>BOOK AUTHOR</Text>
        <TextInput
          onChangeText={(value) => this.setState({ bookAuthor: value })}
          style={{ borderWidth: 1, width: 150 }}
        />
        <Button title="Choose Photo" onPress={() => this.handleChoosePhoto()} />
        <Button title="SAVE BOOK" onPress={() => this.saveBook()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
