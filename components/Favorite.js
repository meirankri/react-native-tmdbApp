// Components/Favorite.js

import React from 'react'
import { StyleSheet, View, Text, Image ,TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import FilmList from './FilmList'
class Favorite extends React.Component {

  

  render() {
      
    return (
      <FilmList
      films={this.props.favoritesFilms} 
      navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
      // Ici on est bien dans le cas de la liste des films favoris. 
      //Ce booléen à true permettra d'empêcher de lancer la recherche de plus de films après un scroll lorsqu'on est sur la vue Favoris.
      favoriteList={true}
      >

      </FilmList>
    )
  }
}

const styles = StyleSheet.create({
  
})
const mapStateToProps = (state)=>{
  return {
    favoritesFilms : state.favoritesFilms
}
}
export default connect(mapStateToProps)(Favorite)