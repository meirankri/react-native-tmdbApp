const initialState = {
    favoritesFilms : []
}

function toggleFavorite(state = initialState,action){
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteFilmIndex = state.favoritesFilms.findIndex(item =>item.id === action.value.id)
            if(favoriteFilmIndex !== -1){
                return {
                    ...state,
                    favoritesFilms : state.favoritesFilms.filter((film ,i)=> i !== favoriteFilmIndex)
                }
            }
            else{
                return {
                    ...state,
                    favoritesFilms:[...favoritesFilms, action.value]
                }
            }
        default:
            return  state;  
    }
}
export default toggleFavorite