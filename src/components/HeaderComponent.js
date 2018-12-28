import React,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class HeaderComponent extends Component {
    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.textTitle}>Tasks</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '17%',
        backgroundColor: '#e6e6e6',
        justifyContent: 'flex-end',
        padding: 10,
        paddingLeft: 18,
        shadowRadius: 7,
        shadowOpacity: 0.5,
    },
    textTitle: {
        fontSize: 33,
        fontWeight: 'bold',
    }
});