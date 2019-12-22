import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import SQLite from 'react-native-sqlite-storage';
import TabNavigator from './src/TabNavigator/TabNavigator'

const db = SQLite.openDatabase({ name: 'myProject.db', location: 'default' });

let bookItems = [];

const initialState = {  //GLOBAL STATE
  bookListReduxExp: [],
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'new_book':
      return {
        ...state,
        bookListReduxExp: [...state.bookListReduxExp, action.NewBook]
      }
  }
  return state
}
const store = createStore(reducer) //STORE CONNECTION


export default class App extends Component {
  constructor(props) {
    super(props);

    db.transaction((mydb) => {
      mydb.executeSql('SELECT * FROM Books', [], (tx, results) => {
        for (var i = 0; i < results.rows.length; i++) {
          bookItems.push(results.rows.item(i)); 
        }                                          //state initialize for book list
        initialState.bookListReduxExp = [...bookItems]
      })
    })

  }
  render() {
    return (
      <Provider store={store} >
        <TabNavigator />
      </Provider>
    )
  }
}



