// Components/FilmList.js

import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import MovieItem from './MovieItem'
import { connect } from 'react-redux'
import FavoritesFilms from './FilmDetailOCL'

class FilmList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      films: []
    }
  }

  _displayDetailForFilm = (idFilm) => {
    // On a récupéré les informations de la navigation, on peut afficher le détail du film
    this.props.navigation.navigate('detail', {id: idFilm})
  }

  render() {
    return (
        <FlatList
          style={styles.list}
          data={this.props.films}
          extraData={this.props.favoritesFilms}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
           <MovieItem
            data={item} 
            isFilmFavorite={(this.props.favoritesFilms.findIndex(film => film.id === item.id) !== -1) ? true : false}
            displayDetailForFilm={this._displayDetailForFilm} 
             />
          )}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (!this.props.favoriteList && this.props.page < this.props.totalPages) {
              // On appelle la méthode loadFilm du component Search pour charger plus de films
              
              
              this.props.loadFilms()
            }
          }}
        />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    favoritesFilms: state.favoritesFilms
  }
}

export default connect(mapStateToProps)(FilmList)