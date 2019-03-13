// @ts-ignore
const incA = {
    type: "INC",
    arg: 5
};
const decA = {
    type: "DEC",
    arg: 3
};
// Только эта функция будет иметь возможность изменять состояние
// Передаётся состояние и действие, которое необходимо выполнить
function updateState(state, action) {
    if (action.type === 'INC')
        return state + action.arg;
    if (action.type === 'DEC')
        return state - action.arg;

    return state;
}

class Store {
    constructor(state, updateState) {
        this._state = state;
        this._update = updateState;
    }

    update(action) {
        this._state = this._update(this._state, action);
    };

    get state() {
        return this._state;
    }
}

const store = new Store(0, updateState);

console.log(store.state);
store.update(incA);
console.log(store.state);
store.update(decA);
console.log(store.state);
store.update({});
console.log(store.state);