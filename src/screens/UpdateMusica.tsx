

import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import axios from 'axios';

function UpdateMusica(): React.JSX.Element {

    const [titulo, setTitulo] = useState<string>('');
    const [duracao, setDuracao] = useState<string>('');
    const [artista, setArtista] = useState<string>('');
    const [genero, setGenero] = useState<string>('');
    const [nacionalidade, setNacionalidade] = useState<string>('');
    const [ano_lancamento, setAno_lancamento] = useState<string>('');
    const [album, setAlbum] = useState<string>('');

    useEffect(() => {
        // Aqui você pode implementar a lógica para carregar os dados da música que será atualizada
        // Você pode obter esses dados da navegação ou por meio de uma chamada de API
        // Suponha que você tenha um parâmetro de ID de música passado pela navegação
        // Você pode usar esse ID para buscar os dados da música e preencher os campos do formulário
        // Exemplo:
        const fetchMusica = async () => {
            try {
                const response = await axios.get('http://10.137.11.223:8000/api/vizualizar/musica');
                const musica = response.data;
                setTitulo(musica.titulo);
                setDuracao(musica.duracao);
                setArtista(musica.artista);
                setGenero(musica.genero);
                setNacionalidade(musica.nacionalidade);
                setAno_lancamento(musica.ano_lancamento);
                setAlbum(musica.album);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMusica();
    }, []);

    const handleUpdate = async () => {
        try {
            // Aqui você pode implementar a lógica para enviar os dados atualizados da música para a API
            // Exemplo:
            const formData = new FormData();
            formData.append('titulo', titulo);
            formData.append('duracao', duracao);
            formData.append('artista', artista);
            formData.append('genero', genero);
            formData.append('nacionalidade', nacionalidade);
            formData.append('ano_lancamento', ano_lancamento);
            formData.append('album', album);

            const response = await axios.put('http://10.137.11.223:8000/api/update/musica', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
            
        } catch (error) {
            console.log(error);
          
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete('http://10.137.11.223:8000/api/delete/musica');
            console.log(response.data);
            
        } catch (error) {
            console.log(error);
           
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Atualizar Música</Text>
            <TextInput
                placeholder="Título"
                style={styles.input}
                value={titulo}
                onChangeText={setTitulo}
            />
            <TextInput
                placeholder="Duração"
                style={styles.input}
                value={duracao}
                onChangeText={setDuracao}
            />
            <TextInput
                placeholder="Artista"
                style={styles.input}
                value={artista}
                onChangeText={setArtista}
            />
            <TextInput
                placeholder="Gênero"
                style={styles.input}
                value={genero}
                onChangeText={setGenero}
            />
            <TextInput
                placeholder="Nacionalidade"
                style={styles.input}
                value={nacionalidade}
                onChangeText={setNacionalidade}
            />
            <TextInput
                placeholder="Ano de Lançamento"
                style={styles.input}
                value={ano_lancamento}
                onChangeText={setAno_lancamento}
            />
            <TextInput
                placeholder="Álbum"
                style={styles.input}
                value={album}
                onChangeText={setAlbum}
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                <Text style={styles.buttonText}>Atualizar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleDelete}>
                <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '80%',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default UpdateMusica;
