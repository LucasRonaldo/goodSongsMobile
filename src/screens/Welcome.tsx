import React from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

function Welcome(): JSX.Element {
    const navigation = useNavigation();

    const rotation = React.useRef(new Animated.Value(0)).current;
    const scale = React.useRef(new Animated.Value(1)).current;

    const handleButtonPress = () => {
    Animated.timing(rotation, {
        toValue: 1,
        duration: 1000, // Tempo para uma volta completa (1 segundo)
        useNativeDriver: true,
    }).start(() => {
        Animated.timing(scale, {
            toValue: 2, // Aumenta para o dobro do tamanho
            duration: 500, // Tempo para a animação de aumento de tamanho
            useNativeDriver: true,
        }).start(() => {
            // Ao terminar a primeira animação, iniciar a segunda animação para voltar ao tamanho original
            Animated.timing(scale, {
                toValue: 1, // Voltar ao tamanho original
                duration: 500, // Tempo para a animação de retorno ao tamanho original
                useNativeDriver: true,
            }).start(() => {
                // Navegar para a próxima tela após a segunda animação ser concluída
                navigation.navigate('Visualizar');
            });
        });
    });
};


    const interpolatedRotateAnimation = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.containerLogo, { transform: [{ rotate: interpolatedRotateAnimation }, { scale: scale }] }]}>
                <Image
                    source={require('../images/play.png')}
                    style={{ width: '100%' }}
                    resizeMode="contain"
                />
            </Animated.View>
            <Animatable.View animation="fadeInUp" delay={600} style={styles.containerForm}>
                <Text style={styles.title}>Melhor aplicativo para monitorar suas musicas!</Text>
                <Text style={styles.text}>Faça o login para começar</Text>
                <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

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
        backgroundColor: '#292838',
        borderRadius: 50,
        paddingVertical: 8,
        width: '60%',
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
});

export default Welcome;