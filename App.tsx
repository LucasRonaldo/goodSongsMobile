import React, { JSXElementConstructor } from 'react';
import { Text, View } from 'react-native';

import CadastroMusica from './src/screens/cadastroMusica';
import SignIn from './src/screens/sign';
import VizualizarMusica from './src/screens/VizualizarMusica';

function App():JSX.Element{

  return(
    <VizualizarMusica/>

  );
}



export default App;