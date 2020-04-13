import React from 'react'
import {Text,View,StyleSheet,ActivityIndicator,ScrollView,Image} from 'react-native'
import {getFilmFromId} from '../API/TMDBApi'
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
    getImageFromApi (name) {
        return 'https://image.tmdb.org/t/p/w300' + name
      }
      
    render() {
        
        const {film} =  this.state 
        console.log(this.getImageFromApi(this.state.img));
        
        let imgUri = this.getImageFromApi(this.state.img)
        return ( 
               <ScrollView style={styles.main_container}>
                    <Image
                    key={imgUri}
                    style={styles.image}
                    source={{uri: this.state.img != undefined ? imgUri : "../assets/loading.png", cache: 'reload'}}
                    />
    
                    <Text> {film.title } </Text>
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
export default FilmDetail