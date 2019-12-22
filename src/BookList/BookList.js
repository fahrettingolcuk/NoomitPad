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
            compleatedSql : false,
        }
        db.transaction((mydb) => {
            mydb.executeSql('SELECT * FROM Books', [], (tx, results) => {
                for (var i = 0; i < results.rows.length; i++) {
                    this.setState({ bookList: [...this.state.bookList, results.rows.item(i)] })
                }
                this.setState({compleatedSql: true})
            })
        })
        
    }
    render() {
        return (
            <View>
                <Text>BOOK List</Text>
                {this.state.compleatedSql ? 
                            <FlatList
                            data={this.state.bookList}
                            keyExtractor={({ id }, index) => index}
                            renderItem={({ item, index }) =>
                                <View>
                                    <Image
                                        source={{ uri: item.book_uri }}
                                        style={{ width: 150, height: 150 }}
                                    />
                            <Text>{item.book_uri}</Text>
                                    <Text>{item.book_name}</Text>
                                    <Text>{item.book_author}</Text>
                                </View>}
                        />
                        : <Text>bekle</Text>    
            }
    <Text>{this.props.counter}</Text>
            </View>
        )
    }
}
function mapStateToProps(state){ //MAPLEME YAPARAK COMPONENTTE KULLANDIĞIMIZ COUNTERI APP TEKİ COUNTERE MATCHLEDİK
    return{
      counter:state.counter
    }
  }

export default connect(mapStateToProps)(BookList)