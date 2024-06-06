import React, { useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from "axios";
import Footer from "./Footer";
import { useNavigation, useRoute } from "@react-navigation/native";

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

const Editar: React.FC = () => {
    const [id, setId] = useState<number>(0);
    const [titulo, setTitulo] = useState<string>('');
    const [duracao, setDuracao] = useState<number>(0);
    const [artista, setArtista] = useState<string>('');
    const [genero, setGenero] = useState<string>('');
    const [nacionalidade, setNacionalidade] = useState<string>('');
    const [ano_lancamento, setAno_lancamento] = useState<string>('');
    const [album, setAlbum] = useState<string>('');
    const colorInput = '#acacb7'
    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        const { item } = route.params;
        if (item) {
            setId(item.id);
            setTitulo(item.titulo);
            setDuracao(item.duracao);
            setArtista(item.artista);
            setGenero(item.genero);
            setNacionalidade(item.nacionalidade);
            setAno_lancamento(item.ano_lancamento);
            setAlbum(item.album);
        }
    }, [route.params]);

    const atualizar = () => {
        const musica: Musica = {
            id,
            titulo,
            duracao,
            artista,
            genero,
            nacionalidade,
            ano_lancamento,
            album,
        };

        axios.put("http://10.137.11.223:8000/api/update/musica", musica, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.status === 200) {
                console.log(response.data);
                console.log('Atualizado')
                navigation.goBack();
            }
        }).catch(error => {
            console.error(error);
            // Tratamento de erro
        });
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='grey' barStyle="light-content" />

            <View style={styles.containerForm}>

                <ScrollView style={styles.card}>




                    <TextInput
                        placeholder="Titulo"
                        placeholderTextColor={colorInput}
                        style={styles.input}
                        value={titulo}
                        onChangeText={setTitulo}
                    />
                    <TextInput
                        placeholder="Duração"
                        placeholderTextColor={colorInput}
                        style={styles.input}
                        value={duracao.toString()}
                        onChangeText={(text) => setDuracao(parseInt(text))}
                    />
                    <TextInput
                        placeholder="Artista"
                        placeholderTextColor={colorInput}
                        style={styles.input}
                        value={artista}
                        onChangeText={setArtista}
                    />
                    <TextInput
                        placeholder="Genero"
                        placeholderTextColor={colorInput}
                        style={styles.input}
                        value={genero}
                        onChangeText={setGenero}
                    />
                    <TextInput
                        placeholder="Nacionalidade"
                        placeholderTextColor={colorInput}
                        style={styles.input}
                        value={nacionalidade}
                        onChangeText={setNacionalidade}
                    />

                    <View style={styles.row}>
                        <TextInput
                            placeholder="Album"
                            placeholderTextColor={colorInput}
                            style={styles.inputAlbum}
                            value={album}
                            onChangeText={setAlbum}
                        />
                        <TextInput
                            placeholder="Ano de Lançamento"
                            placeholderTextColor={colorInput}
                            style={styles.inputDate}

                            value={ano_lancamento}
                            onChangeText={setAno_lancamento}
                        />


                    </View >

                    <TouchableOpacity style={styles.buttonll}
                        onPress={atualizar}><Text style={styles.buttonllText}>Atualizar</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
                        <Text style={styles.buttonText}>Voltar</Text>
                    </TouchableOpacity>





                </ScrollView>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#292838'
    },
    input: {
        backgroundColor: '#4a4956',
        height: 50,
        marginBottom: 12,
        fontSize: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        paddingLeft: 25,
        color: '#fff'



    },
    inputDate: {
        backgroundColor: '#4a4956',
        height: 50,
        marginBottom: 12,
        fontSize: 15,
        paddingHorizontal: 10,
        borderRadius: 10,
        paddingLeft: 25,
        width: "58%",
        marginLeft: 'auto',
        color: '#fff'




    }, inputAlbum: {
        backgroundColor: '#4a4956',
        height: 50,
        marginBottom: 12,
        fontSize: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        paddingLeft: 'auto',
        width: '40%',
        color: '#fff'





    },
    button: {
        backgroundColor: '#3a415a',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
        borderColor: 'white'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    containerForm: {

        backgroundColor: '#292838',

        flex: 1,

        paddingStart: '2%',
        paddingEnd: '2%',
        //justifyContent: 'center'
    }, row: {
        flexDirection: 'row'
    }, card: {

        padding: 20,
        marginTop: 140,
        borderRadius: 15,
        marginBottom: 40
    },
    inputPassword: {
        borderWidth: 2,
        borderColor: 'grey', // Cor da borda
        backgroundColor: '#002f6c', // Cor de fundo
        height: 50,
        marginBottom: 12,
        fontSize: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        paddingLeft: 25,
        marginTop: 10,
        color: '#fff'
        // Adiciona um preenchimento horizontal,

    }, buttonll: {
        backgroundColor: '#fff',
        height: 50,
        borderRadius: 6,
        justifyContent: 'center', // Centraliza os itens na horizontal
        alignItems: 'center',
        marginTop: 10,
        marginBottom:20
    },
    buttonllText: {
        color: '#002f6c',
        fontSize: 20,
       
    },
});

export default Editar;
