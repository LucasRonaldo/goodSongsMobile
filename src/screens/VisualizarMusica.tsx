import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Modalize } from 'react-native-modalize';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

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
    const [selectedMusica, setSelectedMusica] = useState<Musica | null>(null);
    const [error, setError] = useState<string | null>(null); // Estado para exibir mensagens de erro
    const navigation = useNavigation();

    const modalizeRef = useRef<Modalize>(null);

    const onOpen = (event: any) => {
        event.persist(); // Persistindo o evento sintético
        modalizeRef.current?.open();
    };

    const selectMusica = (musica: Musica) => {
        setSelectedMusica(musica);
        if (modalizeRef.current) {
            setSelectedMusica(musica);
            setTimeout(() => {
                modalizeRef.current?.open();
            }, 0);
        }
    };

    const buscar = async (titulo: string) => {
        try {
            const response = await axios.post('http://10.137.11.223:8000/api/pesquisar/musica/titulo', { titulo });
            if (response.status === 200) {
                setMusicas(response.data.data);
            } else {
                setError('Erro na busca');
            }
        } catch (error) {
            setError('Erro na requisição');
        }
    };

    const Delete = async (id: number) => {
        try {
            const response = await axios.delete(`http://10.137.11.223:8000/api/delete/musica/${id}`);
            if (response.status === 200) {
                setMusicas(prevMusicas => prevMusicas.filter(musica => musica.id !== id));
                showToast('Música excluída com sucesso');
            } else {
                setError('Erro ao excluir música');
            }
        } catch (error) {
            setError('Erro ao excluir música');
        }
    };

    const listarMusicas = async () => {
        try {
            const response = await axios.get('http://10.137.11.223:8000/api/visualizar/musica');
            if (response.status === 200) {
                setMusicas(response.data.data);
            }
        } catch (error) {
            setError('Erro ao carregar músicas');
        }
    };

    useEffect(() => {
        listarMusicas();
    }, []);

    const renderItem = ({ item }: { item: Musica }) => (
        <View style={styles.form}>
            <TouchableOpacity style={styles.card} onPress={() => selectMusica(item)}>
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

    const showToast = (message: string) => {
        setError(message);
        setTimeout(() => {
            setError(null);
        }, 3000); // Esconde a mensagem após 3 segundos
    };

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
            {error && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            )}
            {musicas.length === 0 ? (
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
            <Modalize ref={modalizeRef}>
    {selectedMusica && (
        <View style={styles.modalContent}>

            <Text>{selectedMusica.titulo}</Text>
            <Text>{selectedMusica.artista}</Text>
            <Text>{selectedMusica.duracao}</Text>
            <Text>{selectedMusica.genero}</Text>
            
            
            <View style={styles.controls}>
                <TouchableOpacity onPress={() => {/* Adicione a lógica para o botão de voltar */}}>
                    <Image style={styles.controlButton} source={require('../images/back.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {/* Adicione a lógica para o botão de pausar/reproduzir */}}>
                    <Image style={styles.controlButton} source={require('../images/play.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {/* Adicione a lógica para o botão de pausar/reproduzir */}}>
                    <Image style={styles.controlButton} source={require('../images/forward.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )}
</Modalize>
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
    }, modalContent: {
        backgroundColor: 'grey',
        padding: 20,
        borderRadius:40
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 5,
    },
    errorContainer: {
        backgroundColor: 'red',
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    errorText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalContent: {
        backgroundColor: 'grey',
        padding: 20,
        borderRadius: 40,
        alignItems: 'center',
    },
    modalImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    controlButton: {
        width: 50,
        height: 50,
        marginHorizontal: 10,
    },

})

export default VisualizarMusica;