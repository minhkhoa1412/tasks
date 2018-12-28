import Realm from "realm";

export const TODO_SCHEMA = "Todo";

export const TodoSchema = {
    name: TODO_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int', //primary
        name: {types: 'string', indexed: true},
        done: {types: 'bool', default: false},
    }
};

const databaseOptions = {
    path: 'todoListApp.realm',
    schema: [TodoSchema],
    schemaVersion: 0
};

//function
export const insertNewTodo= newTodo => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                realm.create(TODO_SCHEMA, newTodo);
                resolve(newTodo);
            })
        })
        .catch(error => {
            reject(error);
        })
});

export const updateTodo = todo => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                let updatingTodo = realm.objectForPrimaryKey(TODO_SCHEMA, todo.id);
                updatingTodo.name = todo.name;
                resolve();
            })
        })
        .catch(error => {
            reject(error);
        })
});

export const deleteTodo = todoId => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                let deletingTodo = realm.objectForPrimaryKey(TODO_SCHEMA,todoId);
                realm.delete(deletingTodo);
                resolve();
            })
        })
        .catch(error => {
            reject(error);
        })
});

export const deleteAllTodo = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                let allTodo = realm.objects(TODO_SCHEMA);
                realm.delete(allTodo);
                resolve();
            })
        })
        .catch(error => {
            reject(error);
        })
});

export const queryAllTodo = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
        .then(realm => {
            realm.write(() => {
                let allTodo = realm.objects(TODO_SCHEMA);
                resolve(allTodo);
            })
        })
        .catch(error => {
            reject(error);
        })
});