import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';
import CustomModal from '../CustomModal/CustomModal'
const db = SQLite.openDatabase({ name: 'myProject.db', location: 'default' });
let theIndex;

class BookList extends React.Component {
    state = {
        modalVisible: false,
        currentUri : ''
    }

    deleteBook = (index, listIndex) => {
        theIndex = listIndex;
        console.log(index);
        db.transaction(tx => {
            tx.executeSql('DELETE FROM Books where book_id=?', [index], (tx, results) => {
                //console.log('results',results.rowAffected);
            })
        })
        this.props.deleteBook();
    }
    showModal = (uri) => {
        this.setState({
            modalVisible: !this.state.modalVisible,
            currentUri : uri
        });
    };

    render() {
        return (
            <View>
                <Text>BOOK List</Text>
                <CustomModal modalVisible={this.state.modalVisible} onClose={this.showModal}>
                    <Text>s...a</Text>
                    <Image
                        source={{ uri: this.state.currentUri}}
                        style={{ width: '100%', height: 500 }}
                    />
                </CustomModal>
                <FlatList
                    data={this.props.bookListReduxExp}
                    keyExtractor={(index) => index}
                    renderItem={({ item, index }) =>
                        <View style={styles.listItem}>
                            <View style={{ marginLeft: 15 }}>
                                <Image
                                    source={{ uri: item.book_uri }}
                                    style={{ width: 150, height: 150 }}
                                />
                            </View>
                            <TouchableOpacity
                                style={{ backgroundColor: 'red' }}
                                onPress={() => this.deleteBook(item.book_id, index)}
                            >
                                <Text>SİL</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ backgroundColor: 'green' }}
                                onPress={() => this.showModal(item.book_uri)}
                            >
                                <Text>AÇ</Text>
                            </TouchableOpacity>
                            <View>
                                <Text>{item.book_name}</Text>
                                <Text>{item.book_descr}</Text>

                            </View>
                        </View>
                    }
                />
            </View>
        )
    }
}
function mapStateToProps(state) { //MAPLEME YAPARAK COMPONENTTE KULLANDIĞIMIZ COUNTERI APP TEKİ COUNTERE MATCHLEDİK
    return {
        bookListReduxExp: state.bookListReduxExp
    }
}
function mapDispatchToProps(dispatch) { //EĞER SADECE LİSTELEME YAPACAKSAK BUNA GEREK YOK AMA STATE'İ DEĞİŞTİRCEKSEK BU LAZIM
    return {
        deleteBook: () => dispatch({ type: 'delete_book', DeleteBookIndex: theIndex })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList)

const styles = StyleSheet.create({
    listItem: {
        backgroundColor: 'yellow',
        flexDirection: 'row',
        borderRadius: 15,
    }
})