import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
const empty = '../images/star-empty.png'
const filled = '../images/star-filled.png'
export default class CustomStarRate extends React.Component {
    state = {
        defaultRating: 2,
        maxRating: 5,
        stars : [],
        star1 : empty,
    }
    InitStar() {
        for (var i = 0; i < 5; i++) {
            const temp = i;
            this.state.stars.push(
                <TouchableOpacity
                    key={i}
                    onPress = {()=>this.deneme(temp)}
                >
                    <Image
                        faho = {5}
                        width
                        height='15'
                        source={this.state.star1}
                    />
                </TouchableOpacity>
            )
        }
    }
    render() {
        this.InitStar();
        return (
            <View style={styles.container}>
                {this.state.stars}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
})
