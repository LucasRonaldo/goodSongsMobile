import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from "axios";
import Footer from "./Footer";
import { useNavigation, useRoute } from "@react-navigation/native";

interface Musica {
    id: number;
    titulo: string;
    duracao: string;
    artista: string;
    genero: string;
    nacionalidade: string;
    ano_lancamento: string;
    album: string;
}

const Editar: React.FC = () => {
    const [musicas, setMusicas] = useState<Musica[]>([]);
    const [id, setId] = useState<string>('');
    const [titulo, setTitulo] = useState<string>('');
    const [duracao, setDuracao] = useState<string>('');
    const [artista, setArtista] = useState<string>('');
    const [genero, setGenero] = useState<string>('');
    const [nacionalidade, setNacionalidade] = useState<string>('');
    const [ano_lancamento, setAno_lancamento] = useState<string>('');
    const [album, setAlbum] = useState<string>('');

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
    }, []);

    const atualizar = () => {
        const musica = {
            id: id,
            titulo: titulo,
            duracao: duracao,
            artista: artista,
            genero: genero,
            nacionalidade: nacionalidade,
            ano_lancamento: ano_lancamento,
            album: album,
        };
        axios.put("http://10.137.11.232:8000/api/update/musica", musica, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(response => {

            if(response.status === 200){
                console.log(response.data);
                navigation.goBack();
            }
            
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='grey' barStyle="light-content" />
            <View>
                <TextInput value={titulo} onChangeText={setTitulo} style={styles.input} />
                <TextInput value={duracao} onChangeText={setDuracao} style={styles.input} />
                <TextInput value={artista} onChangeText={setArtista} style={styles.input} />
                <TextInput value={genero} onChangeText={setGenero} style={styles.input} />
                <TextInput value={nacionalidade} onChangeText={setNacionalidade} style={styles.input} />
                <TextInput value={ano_lancamento} onChangeText={setAno_lancamento} style={styles.input} />
                <TextInput value={album} onChangeText={setAlbum} style={styles.input} />
                <TouchableOpacity onPress={atualizar} style={styles.button}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.button}>
                    <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
                <Footer />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        margin: 10,
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 5,
        paddingHorizontal: 10,
        borderRadius: 10
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
    }
});

export default Editar;