import React, { Component } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { connect } from 'react-redux'


const db = SQLite.openDatabase({ name: 'Records.db', location: 'default' });
class BookList extends React.Component {
    constructor(props) {
        super(props);
        db.transaction((mydb) => {
            mydb.executeSql('SELECT * FROM Bookss', [], (tx, results) => {
                for (var i = 0; i < results.rows.length; i++) {
                     this.setState({ BookItems: [...this.props.BookItems, results.rows.item(i)] })
                }
            })
         })
    }
    componentDidUpdate() {
        console.log('guncellendi');
    }
    render() {
        return (
            <View>
                <Text>BOOK List</Text>
                <FlatList
                    data={this.props.BookItems}
                    renderItem={({ item }) => <View>
                        <Text>{item.book_name}</Text>
                        <Image
                            source={{ uri: item.book_uri }}
                            style={{ width: 250, height: 250 }}
                        />
                    </View>}
                    keyExtractor={item => item.id}
                />
            </View>
        )
    }
}
export default BookList