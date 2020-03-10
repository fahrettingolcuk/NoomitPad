import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, StyleSheet,Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class CustomTab extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.tabBarContainer}>
                <TouchableOpacity
                    onPress={() => navigate('Home')}
                >
                    <View style={styles.tabBarItem}>
                        <Image
                        source={require('../images/home.png')}
                        style={{width:30,height:30}}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigate('BookList')}
                >
                    <View style={styles.tabBarItem}>
                    <Image
                        source={require('../images/book.png')}
                        style={{width:30,height:30}}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigate('NewdsRec')}
                >
                    <View style={styles.tabBarItem}>
                    <Image
                        source={require('../images/new-record.png')}
                        style={{width:30,height:30}}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabBarContainer: {
        height:50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth:0.1,
        backgroundColor:'black'
        
    },
    tabBarItem: {
        width: 100,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'red'
    },
})

