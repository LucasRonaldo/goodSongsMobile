import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Pressable, Alert, FlatList, Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
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

function VisualizarMusica(): React.JSX.Element {
    const [musicas, setMusicas] = useState<Musica[]>([]);
    const navigation = useNavigation();
    

    const buscar = async (titulo: string) => {
        try {
            const response = await axios.post('http://10.137.11.223:8000/api/pesquisar/musica/titulo', { titulo });
            console.log('buscando os dados');
            if (response.status === 200) {
                console.log(response.data.data)
                setMusicas(response.data.data);
            } else {
                console.log('Erro na busca:', response.data.data);
            }
        } catch (error) {
            console.log('Erro na requisição:', error);
        }
    };

    const Delete = async (id: number) => {
        axios.delete(`http://10.137.11.223:8000/api/delete/musica/${id}`).then(function (response) {
            if (response.status === 200) {
                Alert.alert('Musica Excluida com sucesso');
            }
        }).catch(function (error) {
            console.log(error);
        });
    };

    const listarMusicas = async () => {
        try {
            const response = await axios.get('http://10.137.11.223:8000/api/visualizar/musica');
            if (response.status === 200) {
                setMusicas(response.data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        listarMusicas();
    }, []);

    const renderItem = ({ item }: { item: Musica }) => (
        <View style={styles.form}>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DetalhesMusica', { musica: item })}>
                <Image style={styles.imagem} source={require('../images/musica.png')} />
                <View style={styles.column}>
                    <Text style={styles.titulo}>{item.titulo}</Text>
                    <Text style={styles.artista}>{item.artista}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Update', { item })} style={styles.alignConfig}>
                    <Image style={styles.configEdit} source={require('../images/edit.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Delete(item.id)} style={styles.alignEdit}>
                    <Image style={styles.configDelete} source={require('../images/deletee.png')} />
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.row}>
                    <Text style={styles.headerText}>Playlist</Text>
                    <TextInput
                        placeholder="Search Music"
                        onChangeText={(text) => text && buscar(text)}
                        placeholderTextColor={'grey'}
                        style={styles.inputSearch}
                    />
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
            <Footer />
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
        height: 100,
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
    configDelete: {

        width: 30,
        height: 30,

    }, configEdit: {

        width: 30,
        height: 30,

    },
    alignConfig: {
        position: 'absolute',
        right: 10,
        top: 25
    },
    alignEdit: {
        position: 'absolute',
        right: 50,
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
        paddingLeft: 20,
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
        left: 10


    }, noItemsContainer: {
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

export default VisualizarMusica;