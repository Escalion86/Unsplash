const reducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_LIKE':
            return [
                ...state, 
                { id: action.id, autor: action.autor, text: action.text, date: action.date }
            ]          


        default: return state;
    }
}

export default reducer;