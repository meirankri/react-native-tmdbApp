import React from 'react'
import {Text,View,StyleSheet,ActivityIndicator,ScrollView,Image} from 'react-native'
import {getFilmFromId, getImageFromApi} from '../API/TMDBApi'
import {connect} from 'react-redux'
class FilmDetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            film:"",
            img:'',
            isLoading: true
        }
    }
    componentDidMount(){
        getFilmFromId(this.props.route.params.id)
        .then((data)=>{
            
            this.setState({film:data,img:data.backdrop_path, isLoading:false})
        })
        
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
    
      
    render() {
        console.log(this.props);
        
        const {film} =  this.state         
        return ( 
               <ScrollView style={styles.main_container}>
                    {/* image from network must have an heigth, 
                    when the image not charging from the api on the firt call i have to put here on personal state  */}
                    <Image
                    style={styles.image} 
                    source={{uri: getImageFromApi(this.state.img)}}
                    />
                    <Text style={styles.title}> {film.title } </Text>
                   
                    
                    <Text> {film.overview} </Text>
                    <Text>Genres: {film.genres && film.genres.map((g,i)=>{
                         return g.name
                     }).join(' / ')} 
                    </Text>
                    
                    {this._displayLoading()}
                </ScrollView>
            )
        
        
    }
}
const styles = StyleSheet.create({
    main_container:{
        flex:1,
    },
    image:{
        flex: 1,
        height: 200,
        flexDirection:'row',
        flexWrap: 'wrap'
    },
    title:{
        fontWeight:'bold',
        flex:1,
        textAlign:'center',
        fontSize: 35
    }
    ,
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
const mapStateToProps = (state)=>{
    return {
        favoritesFilm : state.favoritesFilms
    }
}
export default connect(mapStateToProps)(FilmDetail)