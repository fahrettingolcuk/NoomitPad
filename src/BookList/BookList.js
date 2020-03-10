import React, { Component } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';
import SQLite from 'react-native-sqlite-storage';
import CustomModal from '../CustomModal/CustomModal'
import Icon from 'react-native-vector-icons/Ionicons'
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
                source={require('../images/BACKGROUND-noomit.png')}
                style={{ width: '100%',height: Dimensions.get('window').height}}
                resizeMode='cover'
            >
                <View style={{alignItems:'center',marginTop:64,width:'100%'}}>

                    <Text style={{color:'#383687',fontWeight:'bold',fontSize:26}}>BOOK LIST</Text>
                    <CustomModal modalVisible={this.state.modalVisible} onClose={this.showModal}>
                        <ImageBackground
                            source={{ uri: this.state.currentUri }}
                            style={{ width: '100%', height: 500 }}
                        >
                            <Text>{this.state.currentDetail}</Text>
                        </ImageBackground>
                    </CustomModal>
                    {/* <Text>{this.props.bookListReduxExp.length} Showing Books</Text> */}
                    <FlatList
                        style={{marginTop:36,width:'95%'}}
                        data={this.props.bookListReduxExp}
                        keyExtractor={(index) => index}
                        renderItem={({ item, index }) =>
                            <View style={styles.listItem}>
                                <TouchableOpacity

                                    onPress={() => this.showModal(item.book_uri, item.book_descr)}
                                >
                                    <View style={{flexDirection:'row',width:'100%'}}>
                                    <View style={{marginRight:'auto', padding: 5,marginLeft:36}}>
                                        <Image
                                            source={{ uri: item.book_uri }}
                                            style={{ width: 150, height: 150,borderRadius:180 }}
                                        />
                                    </View>
                                    <View style={{alignItems:'center',marginRight:100,marginTop:16}}>
                                        <Text style={{color:'#383687',fontWeight:'bold',fontSize:25}}>{item.book_name}</Text>
                                        <Text style={{color:'#383687',fontWeight:'bold',fontSize:15}}>{item.book_descr}</Text>
                                    </View>
                                    </View>
                                </TouchableOpacity>
                                <View style={{justifyContent:'flex-end',marginRight:49}}>
                                    <TouchableOpacity
                                        style={{ }}
                                        onPress={() => this.deleteBook(item.book_id, index)}
                                    >
                                        <Icon
                                        name = 'ios-trash'
                                        size = {49}

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
        backgroundColor: '#F9F8FF',
        flexDirection: 'row',
        borderRadius: 15,
        justifyContent: 'center',
        marginTop: 15,
        width:'100%',
        shadowColor:'#3700F2',
        shadowRadius:10,
        shadowOpacity:0.5,
        shadowOffset:{
            width:0,
            height:3
        }
        ,elevation:8
    }
})