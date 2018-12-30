import React,{Component} from 'react';
import {FlatList, Text, View} from "react-native";

export default class FlatListComponent extends Component {
    render() {
        return(
            <View style={{flex: 1, paddingTop: 30}} >
                <FlatList
                    data={[{key: 'a'}, {key: 'b'}]}
                    renderItem={({item}) => <Text>{item.key}</Text>}
                />
            </View>
        )
    }
}
