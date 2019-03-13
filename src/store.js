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
// Функция - reducer. Она не изменяет состояние, а возвращает новое. Данная функция является чистой
function updateState(state, action) {
    if (action.type === 'INC')
        return {count: state.count + action.arg};
    if (action.type === 'DEC')
        return {count: state.count - action.arg};

    return state;
}

export default class Store {
    constructor(state, updateState) {
        this._state = state;
        this._update = updateState;
        this._callbacks = [];
    }

    update(action) {
        this._state = this._update(this._state, action);
        this._callbacks.forEach(callback => callback());
    };

    get state() {
        return this._state;
    }

    subscribe(callback) {
        this._callbacks.push(callback);
        return () => this._callbacks = this._callbacks.filter(cb => cb !== callback);
    }
}

const initState = {count: 0};
const store = new Store(initState, updateState);
const unsubscribe = store.subscribe(() => console.log("State changed1:", store.state));
store.update(incA);
store.update(decA);
// unsubscribe();
store.update({});