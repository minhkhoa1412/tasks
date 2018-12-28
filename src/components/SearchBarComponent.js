import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class SearchBarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchStatus: false,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.search}>
                    {this.state.searchStatus ? null :
                        <Icon style={styles.icon} name='ios-search' size={18} color='gray'/>}
                    <TextInput
                        style={styles.textInput}
                        onFocus={() => {
                            this.setState({searchStatus: true})
                        }}
                        placeholder="Search"/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        paddingVertical: 14,
    },
    search: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: 5,
        backgroundColor: '#dedede',
        borderRadius: 7,
    },
    icon: {
        marginStart: 8,
    },
    textInput: {
        flex: 1,
        paddingStart: 10,
        paddingVertical: 6,
    }
});