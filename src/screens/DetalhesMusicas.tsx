
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-animatable';


const DetalhesMusica = ({ route }) => {
    
    const { musica } = route.params;

    
    return (
        <View style={styles.container}>

<View style={styles.containerLogo}>
                <Image
                    source={require('../images/play.png')}
                    style={{ width: '100%' }}
                    resizeMode="contain"
                />
                
            
            </View>
            <View   style={styles.containerForm}>
                <Text style={styles.title}>{musica.titulo}</Text>
                <Text style={styles.text}>{musica.artista}</Text>
               <Text style={styles.text}>{musica.duracao}</Text>
                <Text style={styles.text}>{musica.genero}</Text>
                <Text style={styles.text}>{musica.nacionalidade}</Text>
                <Text style={styles.text}>{musica.ano_lancamento}</Text>
                <TouchableOpacity style={styles.button}>
                    <Image style={styles.play} source={require('../images/playy.png')}/>
                </TouchableOpacity>
            </View>
           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292838',
    },
    containerLogo: {
        flex: 2,
        backgroundColor: '#292838',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12,
    },
    text: {
        color: '#a1a1a1',
    },
    button: {
        position: 'absolute',
        borderRadius: 180,
        paddingVertical: 8,
        width: 50,
        alignSelf: 'center',
        bottom: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold',
    },
    play:{
        width:50,
        height:50
    }
});


export default DetalhesMusica;
