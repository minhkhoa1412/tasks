import React, {Component} from 'react';
import {
    View, TouchableOpacity, FlatList,
    Text, StyleSheet, Alert, TextInput,
    Dimensions
} from 'react-native';
import Swipeout from "react-native-swipeout";
import ActionButton from 'react-native-action-button';
import Modalize from 'react-native-modalize';

import {queryAllTodo, insertNewTodo} from "../databases/allSchemas";
import SearchBarComponent from "./SearchBarComponent";
import HeaderComponent from "./HeaderComponent";

let FlatListItem = props => {
    const {itemIndex, item, onPressItem} = props;

    const showEditModal = () => {

    };

    const showDeleteConfirmation = () => {
        Alert.alert(
            'Delete',
            'Delete this task?',
            [
                {
                    text: 'No',
                    onPress: () => {
                    },
                    style: 'cancel',
                },
                {
                    text: 'Yes',
                    onPress: () => {

                    },
                }
            ],
            {
                cancelable: true
            }
        )
    };

    return (
        <Swipeout
            right={[
                {
                    text: 'Edit',
                    backgroundColor: '#1f88ff',
                    onPress: showEditModal
                },
                {
                    text: 'Delete',
                    backgroundColor: '#ff3824',
                    onPress: showDeleteConfirmation
                }
            ]}
            autoClose={true}
        >
            <View
                style={{height: 50, justifyContent: 'center', alignItems: 'flex-start'}}
                onPress={onPressItem}>
                <Text style={{color: 'black'}} key={item.id}>{itemIndex}</Text>
            </View>
        </Swipeout>
    )
};

export default class TodoListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoLists: [
                {
                    id: 1,
                    name: 'test',
                    done: false,
                },
                {
                    id: 2,
                    name: 'test1',
                    done: false,
                }
            ],
            task: '',
        };
        // this.reloadData();
        // realm.addListener('change',() => {
        //     this.reloadData();
        // })
    }

    // reloadData = () => {
    //     queryAllTodo()
    //         .then(todoLists => {
    //             this.setState({todoLists})
    //         })
    //         .catch(error => {
    //             this.setState({todoLists: []})
    //         })
    // };

    modal = React.createRef();

    onOpen = () => {
        if (this.modal.current) {
            this.modal.current.open();
        }
    };

    onClose = () => {
        if (this.modal.current) {
            this.modal.current.close();
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent/>
                <SearchBarComponent/>
                <FlatList
                    style={styles.flatList}
                    data={[{name: 'bi'}, {name: 'bo'}]}
                    renderItem={(item, index) => (
                        <View style={{height: 50, width: 50}}>
                            <Text style={{color: 'black', backgroundColor: 'red'}}>Hello, {item.name}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.name}
                />
                <Modalize
                    handlePosition='outside'
                    height='230'
                    ref={this.modal}>
                    <View style={styles.modal}>
                        <Text style={styles.textModal}>Add your task</Text>
                        <TextInput
                            onChangeText={(text) => this.setState({task: text})}
                            value={this.state.task}
                            ref={this.textInputModal}
                            style={styles.textInputModal}/>
                        <TouchableOpacity
                            onPress={() => {
                                if (this.state.task.trim() === "") {
                                    alert("Please enter your task first!");
                                } else {
                                    const newTodo = {
                                        id: Math.floor(Date.now() / 1000),
                                        name: this.state.task,
                                        done: false,
                                    };
                                    insertNewTodo(newTodo)
                                        .then(() => {
                                            this.onClose();
                                            this.reloadData();
                                        })
                                        .catch(err => alert(err))
                                }
                            }}
                            style={styles.buttonSaveModal}>
                            <Text style={{color: '#fff'}}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </Modalize>
                <ActionButton
                    onPress={() => {
                        this.onOpen();
                    }}
                    buttonColor="#1F88FF"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    flatList: {
        flex: 1,
    },
    search: {
        height: "10%",
    },
    modal: {
        height: 210,
        padding: 30,
        justifyContent: 'space-between',
    },
    textModal: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textInputModal: {
        padding: 5,
        marginVertical: 20,
        borderWidth: 2,
        borderColor: '#1f88ff',
        borderRadius: 5,
    },
    buttonSaveModal: {
        padding: 10,
        backgroundColor: '#1f88ff',
        borderRadius: 5,
        alignSelf: 'flex-end',
    }
});