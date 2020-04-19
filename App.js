import React from 'react';
import {Image} from 'react-native'
import Search from './components/Search'
import FilmDetail from './components/FilmDetail'
import Favorite from './components/Favorite'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux'
import store from './store'
import { Ionicons } from '@expo/vector-icons'

/*pour activer la navigation il faut   telecharger les dependence de la doc navigation
importer les functions, encapsuler les component par un container de navigation avec à l'interieur un componenet
de la stack de la navigation et les differents view, ensuite tout les components auront un object avec plusieurs function
qui perment de naviger entre les views  */
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
        <Tab.Navigator 
        tabBarOptions={{
          activeTintColor: '#101010'
        }}>
          <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='ios-search' color={color} size={size} />
            )
          }}
          name="Search" component={Search} />
          <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name='md-checkmark-circle' size={size} color={color} />
            )
          }}
          name="favori" component={Favorite} />
        </Tab.Navigator>
  );
}

function App() {
  return (
    <Provider store={store}>
       <NavigationContainer>
        <Stack.Navigator initialRouteName="Search">
          <Stack.Screen name="Tmdb FIlm" component={TabNavigator} />
          <Stack.Screen name="detail" component={FilmDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
   
  );
}

export default App;