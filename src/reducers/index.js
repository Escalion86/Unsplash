let initialState = {
    photos: [],
    searchText: '',
    pagesLoad: 0,
    pagesLoading: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LIKE': {
            console.log('SET_LIKE');
            const newPhotos = state.photos.map((photo) => {
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

        case 'SEARCH_START': {
            console.log('SEARCH: ' + action.searchText);
            return {
                ...state, 
                photos: action.newLoad ? [] : state.photos,
                pagesLoad: action.newLoad ? 0 : state.pagesLoad,
                pagesLoading: true,
                searchText: action.searchText
            }         
        }

        case 'SEARCH_FINISH': {
            console.log('SEARCH_FINISH');
            return {
                ...state, 
                pagesLoad: state.pagesLoad + 1,
                pagesLoading: false,
                photos: action.newLoad ? action.photos : [...state.photos, ...action.photos]
            }         
        }

        // case 'LOAD_PHOTOS': {
        //     console.log('LOAD_PHOTOS');
        //     return {
        //         ...state
        //     }         
        // }
                    
        default: 
            return state;
    }
}

export default reducer;