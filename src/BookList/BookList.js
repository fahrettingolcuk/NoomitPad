import React, { Component } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { connect } from 'react-redux'

const db = SQLite.openDatabase({ name: 'myProject.db', location: 'default' });
class BookList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookList: [],
        }
        db.transaction((mydb) => {
            mydb.executeSql('SELECT * FROM Books', [], (tx, results) => {
                for (var i = 0; i < results.rows.length; i++) {
                    this.setState({ bookList: [...this.state.bookList, results.rows.item(i)] })
                }
            })
        })
    }
    render() {
        return (
            <View>
                <Text>BOOK List</Text>
                <FlatList
                    data={this.state.bookList}
                    keyExtractor={({ id }, index) => index}
                    renderItem={({ item, index }) =>
                        <View>
                            <Image
                                source={{ uri: item.book_uri }}
                                style={{ width: 150, height: 150 }}
                            />
                            <Text>{item.book_name}</Text>
                            <Text>{item.book_author}</Text>
                        </View>}
                />
            </View>
        )
    }
}
export default BookList