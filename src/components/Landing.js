import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import Info from './Info';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 36,
        color: '#FF0000',
        fontFamily: 'Futura',
        marginTop: -30,
    },
    description: {
        fontSize: 18,
        color: '#FF0000',
        textAlign: 'center',
        marginTop: 5,
    },
    button: {
        backgroundColor: '#FF0000',
        borderRadius: 10,
        minWidth: '80%',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginTop: 80,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
    },
    image: {
        width: 300,
        height: 300,
        marginTop: 40,
    },
    info: {
        position: 'absolute',
        top: 45,
        right: -10,
    },
    infoText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

const Landing = props => {
    const [info, setInfo] = useState(false);

    return (
        info
            ? <Info goBack={() => setInfo(false)} />
            : <SafeAreaView style={styles.container}>
                <Text style={styles.title}>
                    SkinSafe
                </Text>
                <Text style={styles.description}>
                    Eradicating melanoma, one mole at a time.
                </Text>
                <Image source={require('../assets/logo.png')} style={styles.image} />
                <TouchableOpacity disabled={!props.tfReady} onPress={() => props.setView('predict')} style={styles.button}>
                    <Text style={styles.buttonText}>
                        Continue
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setInfo(true)} style={styles.info}>
                    <Text style={styles.infoText}>
                        &#9432;
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
    );
};

export default Landing;