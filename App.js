import React from 'react';
import Search from './components/Search'
import FilmDetail from './components/FilmDetail'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
/*pour activer la navigation il faut   telecharger les dependence de la doc navigation
importer les functions, encapsuler les component par un container de navigation avec à l'interieur un componenet
de la stack de la navigation et les differents view, ensuite tout les components auront un object avec plusieurs function
qui perment de naviger entre les views  */
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="detail" component={FilmDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;