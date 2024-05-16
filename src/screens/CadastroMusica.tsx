import React, { useState } from 'react';
import { Animated, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';

function CadastroMusica(): React.JSX.Element {

    const [musicas, setMusicas] = useState<Musica[]>([]);
    const [titulo, setTitulo] = useState<string>('');
    const [duracao, setDuracao] = useState<string>('');
    const [artista, setArtista] = useState<string>('');
    const [genero, setGenero] = useState<string>('');
    const [nacionalidade, setNacionalidade] = useState<string>('');
    const [ano_lancamento, setAno_lancamento] = useState<string>('');
    const [album, setAlbum] = useState<string>('');

    

    /* const cadastrarCliente = async () => {
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
                     console.log("cadastrado")
             }
             else {
                 console.log("Cliente não cadastrado");
             }
         } catch (error) {
             console.log(error);
         }
     }*/


    const [isButton1Pressed, setIsButton1Pressed] = useState(false);

    const handleButton1Press = () => {
        setIsButton1Pressed(true);
    };

    const handleButton2Press = () => {
        setIsButton1Pressed(false);
    };
    return (



        <View style={styles.container}>
            <View style={styles.containerHeader}>

                <Text style={styles.message}>Cadastro de Musica</Text>
            </View>

            <View style={styles.containerForm}>

                <View style={styles.card}>

                    <View style={styles.buttonEntrar}>
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

                    <Text style={styles.title}>Acesse sua conta</Text>
                    <TextInput
                        placeholder="Titulo"
                        placeholderTextColor={'#fff'}
                        style={styles.input}
                        value={titulo}
                        onChangeText={setTitulo}
                    />
                    <TextInput
                        placeholder="Sua senha"
                        placeholderTextColor={'#fff'}
                        style={styles.inputPassword}
                        value={duracao}
                        onChangeText={setDuracao}
                    />
                    <TextInput
                        placeholder="Artista"
                        placeholderTextColor={'#fff'}
                        style={styles.input}
                        value={artista}
                        onChangeText={setArtista}
                    />
                    <TextInput
                        placeholder="Genero"
                        placeholderTextColor={'#fff'}
                        style={styles.inputPassword}
                        value={genero}
                        onChangeText={setGenero}
                    />
                    <TextInput
                        placeholder="Nacionalidade"
                        placeholderTextColor={'#fff'}
                        style={styles.input}
                        value={nacionalidade}
                        onChangeText={setNacionalidade}
                    />
                    <TextInput
                        placeholder="Ano de Lançamento"
                        placeholderTextColor={'#fff'}
                        style={styles.inputPassword}
                        value={ano_lancamento}
                        onChangeText={setAno_lancamento}
                        
                    /> <TextInput
                        placeholder="Album"
                        placeholderTextColor={'#fff'}
                        style={styles.input}
                        value={album}
                        onChangeText={setAlbum}
                    />


                    <TouchableOpacity style={styles.buttonll}><Text style={styles.buttonllText}>Entrar</Text></TouchableOpacity>






                </View>
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
        color: '#171717',
    },
    buttonPressed: {
        backgroundColor: '#171717',
    },
    containerForm: {
        backgroundColor: '#171717',

        flex: 1,    
        paddingStart: '5%',
        paddingEnd: '5%',
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
        borderWidth: 2,
        borderColor: 'grey', // Cor da borda
        backgroundColor: '#171717', // Cor de fundo
        height: 50,
        marginBottom: 12,
        fontSize: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
        paddingLeft: 25,

        // Adiciona um preenchimento horizontal,

    }, card: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 20,
        marginTop: 40,
        borderRadius: 15
    },
    inputPassword: {
        borderWidth: 2,
        borderColor: 'grey', // Cor da borda
        backgroundColor: '#171717', // Cor de fundo
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
        color: '#171717',
        fontSize: 20
    }
});





export default CadastroMusica;