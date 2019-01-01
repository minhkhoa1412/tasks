import React, {Component} from 'react'
import {
    View, TouchableOpacity, FlatList,
    Text, StyleSheet, Alert, TextInput
} from 'react-native'
import Swipeout from 'react-native-swipeout'
import ActionButton from 'react-native-action-button'
import Modalize from 'react-native-modalize'

import SearchBarComponent from './SearchBarComponent'
import HeaderComponent from './HeaderComponent'
import CheckBoxComponent from './CheckBoxComponent'

let FlatListItem = props => {
    const {onDelete, onEdit, item, onPressItem} = props

    const showEditModal = () => {
        onEdit(item)
    }

    const showDeleteConfirmation = () => {
        Alert.alert(
            'Delete',
            'Delete this task?',
            [
                {
                    text: 'No',
                    onPress: () => {
                    },
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        onDelete(item)
                    }
                }
            ],
            {
                cancelable: true
            }
        )
    }

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
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: 'white'
                }}
                onPress={onPressItem}>
                <CheckBoxComponent status={props.item.done} onPress={cb => props.onPress(props.item, cb)}/>
                <Text style={{color: 'black', fontSize: 16}} key={item.id}>{item.name}</Text>
            </View>
        </Swipeout>
    )
}

export default class TodoListComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todoLists: [],
            taskId: 0,
            task: '',
            isEdit: false
        }
    }

    componentDidMount(): void {
        class Person {
        }

        Person.schema = {
            name: 'Todo',
            primaryKey: 'id',
            properties: {
                id: 'int',
                name: 'string',
                done: {type: 'bool', default: false}
            }
        }

        this.realm = new Realm({schema: [Person]})

        this.queryAllData()
    }

    queryAllData = () => {
        let allTodo = this.realm.objects('Todo')
        allTodo.addListener((col) => {
            this.setState({
                todoLists: col
            }, () => {
                this.forceUpdate()
            })
        })
    }

    modal = React.createRef()

    onOpen = () => {
        if (this.modal.current) {
            this.modal.current.open()
        }
    }

    onClose = () => {
        if (this.modal.current) {
            this.modal.current.close()
        }
    }

    test = (item, cb) => {
        this.realm.write(() => {
            this.realm.create('Todo', {
                id: item.id,
                done: !item.done
            }, true)
        })
        cb()
    }

    deleteData = (item) => {
        this.realm.write(() => {
            this.realm.delete(item)
        })
    }

    editData = (item) => {
        this.setState({
            task: item.name,
            taskId: item.id,
            isEdit: true
        }, () => {
            this.onOpen()
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <HeaderComponent/>
                <SearchBarComponent/>
                <FlatList
                    style={styles.flatList}
                    data={this.state.todoLists}
                    extraData={this.state}
                    renderItem={({item, index}) => (
                        <FlatListItem
                            onEdit={this.editData}
                            onDelete={this.deleteData}
                            item={item}
                            onPress={this.test}
                        />
                    )}
                    keyExtractor={(item) => item.name}
                />
                <Modalize
                    onClose={() => this.setState({task: '', isEdit: false})}
                    handlePosition='outside'
                    height='230'
                    ref={this.modal}>
                    <View style={styles.modal}>
                        <Text style={styles.textModal}>Add your task</Text>
                        <TextInput
                            autoCorrect={false}
                            autoFocus
                            onChangeText={(text) => this.setState({task: text})}
                            value={this.state.task}
                            ref={this.textInputModal}
                            style={styles.textInputModal}/>
                        <TouchableOpacity
                            onPress={() => {
                                if (this.state.task.trim() === '') {
                                    alert('Please enter your task first!')
                                } else {
                                    if(this.state.isEdit) {
                                        this.realm.write(() => {
                                            this.realm.create('Todo', {
                                                id: this.state.taskId,
                                                name: this.state.task
                                            },true)
                                        })
                                        this.modal.current.close()
                                    } else {
                                        this.realm.write(() => {
                                            this.realm.create('Todo', {
                                                id: Math.floor(Date.now() / 1000),
                                                name: this.state.task,
                                                done: false
                                            })
                                        })
                                        this.modal.current.close()
                                    }
                                }
                            }}
                            style={styles.buttonSaveModal}>
                            <Text style={{color: '#fff'}}>SAVE</Text>
                        </TouchableOpacity>
                    </View>
                </Modalize>
                <ActionButton
                    onPress={() => {
                        this.onOpen()
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
        flex: 1
    },
    search: {
        height: '10%'
    },
    modal: {
        height: 210,
        padding: 30,
        justifyContent: 'space-between'
    },
    textModal: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    textInputModal: {
        padding: 5,
        marginVertical: 20,
        borderWidth: 2,
        borderColor: '#1f88ff',
        borderRadius: 5
    },
    buttonSaveModal: {
        padding: 10,
        backgroundColor: '#1f88ff',
        borderRadius: 5,
        alignSelf: 'flex-end'
    }
})