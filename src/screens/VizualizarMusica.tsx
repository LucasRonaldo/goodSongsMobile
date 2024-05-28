import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react"

import { FlatList, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Footer from "./Footer";


interface Musica {

    id: number;
    titulo: string;
    duracao: number;
    artista: string;
    genero: string;
    nacionalidade: string;
    ano_lancamento: string;
    album: string;
}

const renderItem = ({ item }: { item: Musica }) => (






    <View style={styles.form}>
        <View style={styles.card}>
            <Image style={styles.imagem} source={require('../images/musica.png')} />
            <View style={styles.column}><Text style={styles.titulo}>{item.titulo}</Text>

                <Text style={styles.artista}>{item.artista}</Text></View>
            <TouchableOpacity style={styles.alignConfig}><Image style={styles.configIcon} source={require('../images/config.png')} /></TouchableOpacity>

        </View>

    </View>
);

function VizualizarMusica(): React.JSX.Element {
    const [musicas, setMusicas] = useState<any[]>([]);

    //const navigation = useNavigation();
    //const route = useRoute();

    useEffect(() => {
        listarMusicas();
    }, []);

    const listarMusicas = async () => {
        try {
            const response = await axios.get('http://10.137.11.223:8000/api/vizualizar/musica');
            setMusicas(response.data.data);
            console.log(musicas)
            console.log(response.data)


        } catch (error) {

            console.log(error);
        }
    }

    return (


        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.row}>
                    <Text style={styles.headerText}>
                        Playlist
                    </Text>

                    <TextInput placeholder="Search Music" placeholderTextColor={'grey'} style={styles.inputSearch}></TextInput>
                </View>

            </View>
            {musicas.length === 0? (
        <View style={styles.noItemsContainer}>
          <Text style={styles.noItemsText}>Não há nenhum registro</Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={musicas}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}

            <Footer/>

            {/*
            <View style={styles.form}>
                <View style={styles.card}>
                    <View style={styles.imagem}></View>
                    <View style={styles.column}><Text style={styles.titulo}>sevzse</Text>

                        <Text style={styles.artista}>zsdv\se</Text></View>
                    <TouchableOpacity style={styles.alignConfig}><Image style={styles.configIcon} source={require('../images/config.png')} /></TouchableOpacity>

                </View>

            </View>*/}
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292838'
    },
    header: {
        backgroundColor: '#292838',
        paddingVertical: 10,
        alignItems: 'flex-start',

        height: 150
    },
    headerText: {
        fontSize: 50,
        fontWeight: '600',
        color: 'white',
        fontFamily: 'Nunito',
        left: 10,
    },
    titulo: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',

    },
    artista: {
        fontSize: 14,
        color: 'white',


    },
    form: {

        marginBottom: 0
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    imageButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10
    },
    imageButtonText: {
        color: 'white',
        fontWeight: 'bold',

    },
    imagemSelecionada: {
        width: 200,
        height: 200,
        resizeMode: 'cover',
        borderRadius: 5,
        marginBottom: 10,
    },
    alinhamentoImagemSelecionada: {
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    menuList: {
        flexGrow: 1
    },
    card: {
        flexDirection: 'row',
        width: 'auto',
        height: 80,
        backgroundColor: '#4a4956',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#5A56B9'
    },
    imagem: {
        width: 60,
        height: 60,
        borderRadius: 5,
        backgroundColor: '#292838',
        marginRight: 5
    },
    column: {
        flexDirection: 'column'
    },
    configIcon: {

        width: 30,
        height: 30,

    },
    alignConfig: {
        position: 'absolute',
        right: 10,
        top: 25
    },
    inputSearch: {
        width: 200,
        height: 50,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 20,
        backgroundColor: 'black',
        color: 'grey',
        paddingLeft: 60,
        fontSize: 20,
        marginLeft: 20,
        marginTop: 20
    },
    row: {
        flexDirection: 'row'
    },
    inputSearchImage: {
        width: 35,
        height: 35,
        left:10
        
        
    },noItemsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      noItemsText: {
        fontSize: 18,
        color: '#999',
      },

})

export default VizualizarMusica;