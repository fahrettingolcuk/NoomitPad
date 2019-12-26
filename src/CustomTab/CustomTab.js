import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient'


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
                        <Icon name="home" size={30} color="white" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigate('BookList')}
                >
                    <View style={styles.tabBarItem}>
                        <Icon name="book" size={30} color="white" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigate('NewRec')}
                >
                    <View style={styles.tabBarItem}>
                    <Icon name="plus-circle" size={30} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabBarContainer: {
        height: 50,
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
        alignItems: 'center'
    },
})

