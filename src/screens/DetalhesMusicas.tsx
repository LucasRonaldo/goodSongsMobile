
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const DetalhesMusica = ({ route }) => {
    
    const { musica } = route.params;

    
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Título: {musica.titulo}</Text>
            <Text style={styles.text}>Duração: {musica.duracao}</Text>
            <Text style={styles.text}>Artista: {musica.artista}</Text>
            <Text style={styles.text}>Gênero: {musica.genero}</Text>
            <Text style={styles.text}>Nacionalidade: {musica.nacionalidade}</Text>
            <Text style={styles.text}>Ano de Lançamento: {musica.ano_lancamento}</Text>
            <Text style={styles.text}>Álbum: {musica.album}</Text>
        </View>
    );
};

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default DetalhesMusica;
