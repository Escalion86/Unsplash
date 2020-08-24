export const setLike = (id, liked) => {
    return {
        type: 'SET_LIKE',
        id,
        liked
    }
}

export const search = (searchText) => {
    return {
        type: 'SEARCH',
        searchText
    }
}