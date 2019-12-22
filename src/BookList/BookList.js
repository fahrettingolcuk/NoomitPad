import React, { Component } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { connect } from 'react-redux'

class BookList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                <Text>BOOK List</Text>
                <FlatList
                    data={this.props.bookListReduxExp}
                    keyExtractor={(index) => index}
                    renderItem={({item}) =>
                        <View>
                             <Image
                                source={{ uri: JSON.parse(item).book_uri }}
                                style={{ width: 150, height: 150 }}
                            /> 
                            <Text>{JSON.parse(item).book_name}</Text>
                            <Text>{JSON.parse(item).book_author}</Text>
                        </View>}
                />
                <Text>sdsds</Text>
            </View>
        )
    }
}
function mapStateToProps(state) { //MAPLEME YAPARAK COMPONENTTE KULLANDIĞIMIZ COUNTERI APP TEKİ COUNTERE MATCHLEDİK
    return {
        bookListRedux: state.bookListRedux,
        bookListReduxExp: state.bookListReduxExp
    }
}

export default connect(mapStateToProps)(BookList)