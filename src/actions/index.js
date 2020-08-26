export const setLike = (id, liked) => {
    return {
        type: 'SET_LIKE',
        id,
        liked
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