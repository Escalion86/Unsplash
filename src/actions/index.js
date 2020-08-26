export const setLike = (id, liked, likes) => {
    return {
        type: 'SET_LIKE',
        id,
        liked,
        likes
    }
}

export const waitLike = (id) => {
    return {
        type: 'WAIT_LIKE',
        id
    }
}

export const searchStart = (searchText, newLoad) => {
    return {
        type: 'SEARCH_START',
        newLoad,
        searchText
    }
}

export const searchFinish = (photos, newLoad) => {
    return {
        type: 'SEARCH_FINISH',
        newLoad,
        photos
    }
}