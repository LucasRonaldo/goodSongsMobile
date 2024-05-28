import React, { JSXElementConstructor } from 'react';
import { Text, View } from 'react-native';

import CadastroMusica from './src/screens/cadastroMusica';
import SignIn from './src/screens/sign';
import VizualizarMusica from './src/screens/VizualizarMusica';
import UpdateMusica from './src/screens/UpdateMusica';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App():JSX.Element{

  return(
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='vizualizar' component={VizualizarMusica} options={{headerShown:false}} />
      <Stack.Screen name='cadastro' component={SignIn} options={{headerShown:false}} />
      <Stack.Screen name='update' component={UpdateMusica} options={{headerShown:false}} />
      
 
    </Stack.Navigator>
  </NavigationContainer>

  );
}



export default App;