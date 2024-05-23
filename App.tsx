import React, { JSXElementConstructor } from 'react';
import { Text, View } from 'react-native';

import CadastroMusica from './src/screens/cadastroMusica';
import SignIn from './src/screens/sign';
import VizualizarMusica from './src/screens/VizualizarMusica';
import UpdateMusica from './src/screens/UpdateMusica';

function App():JSX.Element{

  return(
    <VizualizarMusica/>

  );
}



export default App;