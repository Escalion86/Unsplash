let initialState = {
    photos: [],
    searchText: '',
    pagesLoad: 0,
    pagesLoading: false
};

// let action1 = {
//     type: 'TOGGLE_LIKE',
//     id: 'Y8riNmDq4SU',
//     liked: true
// }

// let action2 = {
//     type: 'SEARCH',
//     searchText: 'cat'
// }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LIKE': {
            const newPhotos = this.state.photos.map((photo) => {
                if (action.id === photo.id) {
                  return {...photo, liked_by_user: action.liked};
                }
                return photo;
            });
            return {
                ...state, 
                photos: newPhotos,
            }
        }

        case 'SEARCH': {
            return {
                ...state, 
                searchText: action.searchText,
            }
        }
                    
        default: 
            return state;
    }
}

export default reducer;