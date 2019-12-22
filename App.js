
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TabNavigator from './src/TabNavigator/TabNavigator';
import { createStore } from 'redux';
import ImagePicker from 'react-native-image-picker';
import { Provider } from 'react-redux'
import SQLite from 'react-native-sqlite-storage';
const db = SQLite.openDatabase({ name: 'Records.db', location: 'default' });
const initialState = {
  BookItems: [],
  bookName: 'a',
  bookAuthor: 'a',
  bookUri: '',
  photo: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SaveBook':
      db.transaction((mydb) => {
        mydb.executeSql('INSERT INTO Bookss (book_name,book_author,book_uri) VALUES (:book_name,:book_author,:book_uri)', [state.bookName, state.bookAuthor, state.bookUri])
        mydb.executeSql('SELECT * FROM Bookss', [], (tx, results) => {
          for (var i = 0; i < results.rows.length; i++) {
            return { BookItems: [...state.BookItems, results.rows.item(i)] }
          }
        })
      })
    case 'UpdateBookName':
      return [...state,{bookName : action.valueName}]
    case 'UpdateBookAuthor':
      return[...state,{bookAuthor: action.valueAuthor}]
    case 'HandlePhoto':
      const options = {
        noData: true
      };
      ImagePicker.launchImageLibrary(options, response => {
        if (response.uri) {
          console.log(response)
          return { bookUri: response.uri, photo: response }
        }
      })
  }
  return state
}

const store = createStore(reducer)

export default class App extends Component {
  constructor(props) {
    super(props);
    db.transaction((mydb) => {
      mydb.executeSql('SELECT * FROM Bookss', [], (tx, results) => {
        for (var i = 0; i < results.rows.length; i++) {
          return { BookItems: [...state.BookItems, results.rows.item(i)] }
        }
      })
    })
    db.transaction((mydb) => {
      //mydb.executeSql('DELETE FROM Bookss', []);
      mydb.executeSql('CREATE TABLE IF NOT EXISTS Bookss(book_id INTEGER PRIMARY KEY NOT NULL,book_name VARCHAR(30),book_author VARCHAR(30),book_uri VARCHAR(30))', []);
    });
  }
  render() {
    return (
      <Provider store={store}>
        {/* <NewRecord/> */}
        <TabNavigator />
      </Provider>
    )
  }
}
