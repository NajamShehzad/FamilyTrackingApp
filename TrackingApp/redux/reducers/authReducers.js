const reducer = (state = {}, action) => {
    switch(action.type) {
        case "UPDATE_CIRCLE_DATA": {
            return {...state, data: action.data}
        }
        case "REMOVE_CIRCLE_DATA": {
            return {...state, data: null}
        }
        default: {
            return state;
        }
    }
}

export default reducer