import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from "axios";
import Footer from "./Footer";
import { useNavigation, useRoute } from "@react-navigation/native";

interface Musica {
    id: number;
    titulo: string;
    duracao: number; // Alterado para number
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

        axios.put("http://10.137.11.232:8000/api/update/musica", musica, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.status === 200) {
                console.log(response.data);
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
            <View>
                <TextInput value={titulo} onChangeText={setTitulo} style={styles.input} placeholder="Título" />
                <TextInput value={duracao.toString()} onChangeText={(text) => setDuracao(parseInt(text))} style={styles.input} placeholder="Duração" keyboardType="numeric" />
                <TextInput value={artista} onChangeText={setArtista} style={styles.input} placeholder="Artista" />
                <TextInput value={genero} onChangeText={setGenero} style={styles.input} placeholder="Gênero" />
                <TextInput value={nacionalidade} onChangeText={setNacionalidade} style={styles.input} placeholder="Nacionalidade" />
                <TextInput value={ano_lancamento} onChangeText={setAno_lancamento} style={styles.input} placeholder="Ano de Lançamento" keyboardType="numeric" />
                <TextInput value={album} onChangeText={setAlbum} style={styles.input} placeholder="Álbum" />
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
