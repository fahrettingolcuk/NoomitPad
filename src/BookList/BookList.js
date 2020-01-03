import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';
import CustomModal from '../CustomModal/CustomModal'
const db = SQLite.openDatabase({ name: 'myProject.db', location: 'default' });
let theIndex;

class BookList extends React.Component {
    state = {
        modalVisible: false,
        currentUri: '',
        currentDetail: '',
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
    showModal = (uri, desc) => {
        this.setState({
            modalVisible: !this.state.modalVisible,
            currentUri: uri,
            currentDetail: desc
        });
    };

    render() {
        return (
            <ImageBackground
                source={require('../images/new-back.png')}
                style={{ width: '100%', height: Dimensions.get('window').height }}
                resizeMode='cover'
            >
                <View>

                    <Text>BOOK List</Text>
                    <CustomModal modalVisible={this.state.modalVisible} onClose={this.showModal}>
                        <ImageBackground
                            source={{ uri: this.state.currentUri }}
                            style={{ width: '100%', height: 500 }}
                        >
                            <Text>{this.state.currentDetail}</Text>
                        </ImageBackground>
                    </CustomModal>
                    <Text>{this.props.bookListReduxExp.length} Showing Books</Text>
                    <FlatList
                        data={this.props.bookListReduxExp}
                        keyExtractor={(index) => index}
                        renderItem={({ item, index }) =>
                            <View style={styles.listItem}>
                                <TouchableOpacity

                                    onPress={() => this.showModal(item.book_uri, item.book_descr)}
                                >
                                    <View style={{flexDirection:'row'}}>
                                    <View style={{ marginLeft: 15, padding: 5}}>
                                        <Image
                                            source={{ uri: item.book_uri }}
                                            style={{ width: 150, height: 150 }}
                                        />
                                    </View>
                                    <View>
                                        <Text>{item.book_name}</Text>
                                        <Text>{item.book_descr}</Text>
                                    </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ marginTop: -15 }}>
                                    <TouchableOpacity
                                        style={{ marginLeft: 'auto' }}
                                        onPress={() => this.deleteBook(item.book_id, index)}
                                    >
                                        <Image
                                            source={require('../images/delete.png')}
                                            style={{ width: 50, height: 50 }}
                                        />
                                    </TouchableOpacity>
                                </View>

                            </View>
                        }
                    />
                </View>

            </ImageBackground>
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
        backgroundColor: 'grey',
        flexDirection: 'row',
        borderRadius: 15,
        justifyContent: 'space-between',
        marginTop: 15
    }
})