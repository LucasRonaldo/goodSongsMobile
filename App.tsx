import React, { JSXElementConstructor } from 'react';
import { Text, View } from 'react-native';


import VizualizarMusica from './src/screens/VizualizarMusica';
import Editar from './src/screens/Editar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Cadastro from './src/screens/Cadastro';

const Stack = createStackNavigator();

function App():JSX.Element{

  return(
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Vizualizar' component={VizualizarMusica} options={{headerShown:false}} />
      <Stack.Screen name='Cadastro' component={Cadastro} options={{headerShown:false}} />
      <Stack.Screen name='Update' component={Editar} options={{headerShown:false}} />
      
 
    </Stack.Navigator>
  </NavigationContainer>

  );
}



export default App;