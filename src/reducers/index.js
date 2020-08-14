let initialState = {
    auth: localStorage.getItem("unsplash-authAC-code")
};

const reducer = (state = initialState, action) => {
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