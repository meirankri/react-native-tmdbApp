import React from 'react'
import { View,ActivityIndicator, TextInput, Button,StyleSheet,FlatList } from 'react-native'
import Movie from './Movie' 
import {getFilmFromApi} from '../API/TMDBApi'
class Search extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            films: [],
            isLoading: false
        }
        this.page = 0
        this.totalPages = 0
        this.inputText = ""
    }
    //le underscore avant la function veut dire que c'est une methode privé
    //bien qu'on puisse l'utilisé partout, c'est une bonne pratique 
    _loadFilm (){
        if(this.inputText !== ""){ 
            this.setState({isLoading:true})           
            getFilmFromApi(this.inputText, this.page+1).then((data) => {
                //les pages c'est pour la pagination
                this.page = data.page
                this.totalPages = data.total_pages
                this.setState({
                    //ici on ajoute la suite des resultats au films deja present
                    films : [...this.state.films, ...data.results], 
                    isLoading:false})
            }
        )
        }
    }
    //pour reset la recherche de film et mettre à zero les differents variable
    _searchFilms(){
        this.page = 0
        this.totalPages = 0

        this.setState({films:[]},()=>{
            this._loadFilm()
        })
        
        
    }
    _displayDetailForFilm = (idFilm) => {
        //pour navigué vers une nouvelle vue
        this.props.navigation.navigate("detail", {id: idFilm })
      }
      //gerer le input
    _handleChange(text){
        this.inputText = text
    }
    _displayLoading() {
        //function qui est un rendu et donc on peut mettre de la logique sans avoir 
        //a faire de la logique dans le render, il suffit juste d'appeler la function dans le render 
        if (this.state.isLoading) {
          return (
            <View style={styles.loading_container}>
                {/* icon de  loading  */}
              <ActivityIndicator size="large" />
              {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de 
              chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
            </View>
          )
        }
      }
   

    render(){  
        return (
            
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    {/* onSubmitEditing cible la touche enter du clavier */}
                    <TextInput onSubmitEditing={()=>this._searchFilms()} onChangeText={(text) => this._handleChange(text)} style={styles.input} placeholder='Titre du film'/>
                    <Button title="rechercher" onPress={()=> this._searchFilms() } />
                </View>
                <FlatList
                    //data sont les donnés à affiché
                    data={this.state.films}
                    // keyExtractor est l'equvalent de key={id} dans react, il faut une chaine de caractere
                    keyExtractor={(item) => item.id.toString()}
                    //renderItem boucle sur toutes les donnés et fait un rendu du component qu'on lui donne,
                    //movie reçoie une function pour naviguer vers le detail en props
                    renderItem={({item}) => <Movie displayDetailForFilm={this._displayDetailForFilm} data={item   } />}
                    //on definit le onEndReachedThreshold a la fin du scroll
                    onEndReachedThreshold={0.5}
                    // la function qui se declenche quand on atteint le onEndReachedThreshold
                    onEndReached={()=>{
                        if(this.page < this.totalPages) this._loadFilm()
                        
                    }}
                />
                {this._displayLoading()}
            </View>
            
        )
    }
}
//StyleSheet sert à optimiser l'utilisation des styles 
//sans recreer la const style à chaque fois
const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer:{
        justifyContent:'center'
    }
    ,
    input:{
        
        marginLeft: 5,
        marginRight: 5, 
        height: 50, 
        borderColor: '#000000', 
        borderWidth: 1, 
        paddingLeft: 5
    }
})
export default Search