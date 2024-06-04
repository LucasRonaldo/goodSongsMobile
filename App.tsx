import React, { JSXElementConstructor } from 'react';
import { Text, View } from 'react-native';

import CadastroMusica from './src/screens/cadastroMusica';
import SignIn from './src/screens/Cadastro';
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
      <Stack.Screen name='vizualizar' component={VizualizarMusica} options={{headerShown:false}} />
      <Stack.Screen name='cadastro' component={Cadastro} options={{headerShown:false}} />
      {/*<Stack.Screen name='update' component={Editar} options={{headerShown:false}} />*/}
      
 
    </Stack.Navigator>
  </NavigationContainer>

  );
}



export default App;