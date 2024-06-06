import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';





function Cadastro(): React.JSX.Element {
    const [musicas, setMusicas] = useState<Musica[]>([]);
    const [titulo, setTitulo] = useState<string>('');
    const [duracao, setDuracao] = useState<string>('');
    const [artista, setArtista] = useState<string>('');
    const [genero, setGenero] = useState<string>('');
    const [nacionalidade, setNacionalidade] = useState<string>('');
    const [ano_lancamento, setAno_lancamento] = useState<string>('');
    const [album, setAlbum] = useState<string>('');
    const colorInput = '#acacb7'

   
    


    const cadastrarMusica = async () => {
        try {
            const formData = new FormData();
            formData.append('titulo', titulo);
            formData.append('duracao', duracao);
            formData.append('artista', artista);
            formData.append('genero', genero);
            formData.append('nacionalidade', nacionalidade);
            formData.append('ano_lancamento', ano_lancamento);
            formData.append('album', album);

            console.log(formData);
            const response = await axios.post('http://10.137.11.223:8000/api/cadastro/musica', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.status == 200) {
                return (

                    Alert.alert('Cadastrado')

                );

            }
            else {
                console.log("Musica não foi cadastrada");
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <View style={styles.container}>


            <View style={styles.containerForm}>

                <ScrollView style={styles.card}>

                    {/* <View style={styles.buttonEntrar}>
                        <TouchableOpacity
                            style={[styles.button, isButton1Pressed ? styles.buttonPressed : null]}
                            onPress={handleButton1Press}
                        >
                            <Text style={styles.buttonText}>Cadastro</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, !isButton1Pressed ? styles.buttonPressed : null]}
                            onPress={handleButton2Press}
                        >
                            <Text style={styles.buttonText}>Listagem</Text>
                        </TouchableOpacity>
                    </View>

    */ }


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
                        value={duracao}
                        onChangeText={setDuracao}
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
                        onPress={cadastrarMusica}><Text style={styles.buttonllText}>Cadastrar</Text></TouchableOpacity>






                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    containerHeader: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    message: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#002f6c',
    },
    buttonPressed: {
        backgroundColor: '#002f6c',
    },
    containerForm: {

        backgroundColor: '#292838',

        flex: 1,

        paddingStart: '2%',
        paddingEnd: '2%',
        //justifyContent: 'center'
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    logo: {
        width: 150,
        height: 150,
    },
    title: {
        fontSize: 20,
        marginTop: 30, margin: 30,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    input: {
        backgroundColor: '#4a4956', // Cor de fundo
        height: 50,
        marginBottom: 12,
        fontSize: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        paddingLeft: 25,

        // Adiciona um preenchimento horizontal,

    },
    inputDate: {
        backgroundColor: '#4a4956', // Cor de fundo
        height: 50,
        marginBottom: 12,
        fontSize: 15,
        paddingHorizontal: 10,
        borderRadius: 10,
        paddingLeft: 25,
        width: "58%",
        marginLeft:'auto'
       

        // Adiciona um preenchimento horizontal,

    }, inputAlbum: {
        backgroundColor: '#4a4956', // Cor de fundo
        height: 50,
        marginBottom: 12,
        fontSize: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        paddingLeft: 'auto',
        width: '40%',
        
        
        

        // Adiciona um preenchimento horizontal,

    },
    row: {
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
        marginTop: 10
        // Adiciona um preenchimento horizontal,

    },
    button: {
        flex: 1, // Distribui igualmente o espaço disponível entre os botões
        backgroundColor: 'grey',
        borderRadius: 6,
        paddingVertical: 11,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 3, // Adiciona margem à esquerda do segundo botão
        marginRight: 3, // Adiciona margem à direita do primeiro botão
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonRegister: {
        marginTop: 14,
        alignSelf: 'center',
    }, buttonHovered: {
        backgroundColor: 'red', // Cor quando o mouse passa sobre o botão
    },
    registerText: {
        color: '#a1a1a1'
    },
    buttonEntrar: {
        backgroundColor: 'grey',
        height: 50,
        borderRadius: 6,
        flexDirection: 'row',
        padding: 1,
        justifyContent: 'center', // Centraliza os itens na horizontal
        alignItems: 'center'
    }
    ,
    buttonll: {
        backgroundColor: '#fff',
        height: 50,
        borderRadius: 6,
        justifyContent: 'center', // Centraliza os itens na horizontal
        alignItems: 'center',
        marginTop: 10
    },
    buttonllText: {
        color: '#002f6c',
        fontSize: 20
    },
});

export default Cadastro;