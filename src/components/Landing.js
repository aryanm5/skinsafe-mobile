import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';

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
    }
});

const Landing = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                SkinSafe
            </Text>
            <Text style={styles.description}>
                A melanoma detection app to help users be proactive about their skin health.
            </Text>
            <Image source={require('../assets/logo.png')} style={styles.image} />
            <TouchableOpacity disabled={!props.tfReady} onPress={() => props.setView('predict')} style={styles.button}>
                <Text style={styles.buttonText}>
                    Continue
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Landing;