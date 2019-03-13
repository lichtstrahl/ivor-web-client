export function createStore(reducer, initState) {
    let state = initState;
    let callbacks = [];

    const getState = () => state;
    const dispatch = action => {
        state = reducer(state, action);
        callbacks.forEach(cb => cb());
    };
    const subscribe = callback => {
        callbacks.push(callback);
        return () => callbacks.filter(c => c !== callback);
    };

    // Чтобы объект состояния всегда был определён
    dispatch({});
    return {getState, dispatch, subscribe};
}