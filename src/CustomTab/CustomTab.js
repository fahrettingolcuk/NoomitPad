import React,{Component} from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {View,Text,StyleSheet} from 'react-native';



export default class CustomTab extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { navigate} = this.props.navigation;
        return(
            <View style={styles.tabBarContainer}>
                <TouchableOpacity
                onPress = {()=> navigate('Home')}
                >
                <View style={styles.tabBarItem}><Text>Home</Text></View>
                </TouchableOpacity>
                <TouchableOpacity
                onPress = {()=> navigate('NewRec')}
                >
                <View style={styles.tabBarItem}><Text>NewRecord</Text></View>
                </TouchableOpacity>
                <TouchableOpacity
                onPress = {()=> navigate('ListBook')}
                >
                <View style={styles.tabBarItem}><Text>Book List</Text></View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabBarContainer :{
        height:50,
        flexDirection:'row',
        backgroundColor:'green',
        justifyContent:'space-between',
        alignItems:'center'
    },
    tabBarItem : {
        backgroundColor: 'yellow',
        width:100,
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    }
})

