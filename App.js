import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import SQLite from 'react-native-sqlite-storage';
import TabNavigator from './src/TabNavigator/TabNavigator'
const db = SQLite.openDatabase({ name: 'myProject.db', location: 'default' });



const initialState = {  //GLOBAL STATE
  bookListReduxExp: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case 'INCREASE_COUNTER':
    //   db.transaction((mydb) => {
    //     mydb.executeSql('SELECT * FROM Books', [], (tx, results) => {
    //       for (var i = 0; i < results.rows.length; i++) {
    //         bookItems.push(results.rows.item(i));
    //       }
    //       return {
    //         ...state,
    //         bookListReduxExp: [...state.bookListReduxExp, bookItems]
    //       }
    //     })
    //   })
    case 'new_book':
      console.log(action.NewBook)
      return {
        ...state,
        bookListReduxExp: [...state.bookListReduxExp,action.NewBook]
      }
  }
  return state
}
const store = createStore(reducer) //STORE CONNECTION
export default class App extends Component {
  constructor(props) {
    super(props);
    db.transaction((tx) => {
      //tx.executeSql('DROP TABLE Books')
      tx.executeSql('CREATE TABLE IF NOT EXISTS Books(book_id INTEGER PRIMARY KEY NOT NULL,book_name VARCHAR(30),book_author VARCHAR(30),book_uri VARCHAR(50))', []);
    })
  }
  render() {
    return (
      <Provider store={store}>
        <TabNavigator />
      </Provider>
    )
  }
}



