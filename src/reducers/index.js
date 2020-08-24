let initialState = {
    photos: [],
    searchText: '',
    pagesLoad: 0,
    pagesLoading: false
};

// const loadPhotos = (state, newLoad = false, count = 10) => {
//     const {searchText, pagesLoad, pagesLoading, photos} = state;

//     const doAction = (promise, newLoad) => {
//       this.setState({pagesLoading: true});

//       promise.then(toJson)
//       .then(json => {
//         console.log('loadedPhotos json: ');
//         console.log(json);
//         this.setState((state) => {
//           if (newLoad) {
//             return {
//               photos: this.formArrPhotos(json),
//               pagesLoad: 1,
//               pagesLoading: false
//             }
//           } else {
//             return {
//               photos: [...photos, ...this.formArrPhotos(json)],
//               pagesLoad: (pagesLoad + 1),
//               pagesLoading: false
//             }
//           }
//         });
//       });
//     }

//     if (!pagesLoading) {
//       console.log('loading page ' + (newLoad ? 1 : (pagesLoad + 1)));
//       console.log('search word: ' + searchText)
//       if (searchText && searchText !== '') {
//         doAction(unsplash.search.photos(searchText, newLoad ? 1 : (pagesLoad + 1), count), newLoad);    
//       } else {
//         doAction(unsplash.photos.listPhotos(newLoad ? 1 : (pagesLoad + 1), count, "latest"), newLoad);
//       }
//     }
//   }

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

        case 'SEARCH': {
            console.log('SEARCH: ' + action.searchText);
            return {
                ...state, 
                searchText: action.searchText,
            }         
        }

        case 'LOAD_PHOTOS': {
            console.log('LOAD_PHOTOS');
            return {
                ...state
            }         
        }
                    
        default: 
            return state;
    }
}

export default reducer;