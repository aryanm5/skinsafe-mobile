import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '95%',
        alignItems: 'center'
    },
    resultText: {
        fontSize: 18,
        textAlign: 'center'
    },
    bold: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    followup: {
        fontSize: 16,
        marginTop: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#FF0000',
        borderRadius: 10,
        minWidth: '80%',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginTop: 30,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
    },
});

const Result = props => {
    const result = props.result;

    return (
        <View style={styles.container}>
            <Text style={styles.resultText}>
                The image has been classifed as
            </Text>
            <Text style={styles.bold}>
                {
                    result === 0
                        ? ' Not Melanoma!'
                        : ' Melanoma.'
                }
            </Text>
            <Text style={styles.followup}>
                {
                    result === 0
                        ? 'Congratulations! Our AI has determined that your mole is beneign, which means it\'s normal and unharmful.'
                        : 'Unfortunately, our AI has determined that your mole is a form of melanoma, which is a skin cancer that usually occurs on parts of the skin that have been overexposed to the Sun.'
                }
            </Text>
            <Text style={styles.followup}>
                Keep in mind that the AI predicts your condition and won't always be right. If you notice unusual growth on your skin, consult a doctor right away.
            </Text>
            <TouchableOpacity onPress={props.setMap} style={styles.button}>
                <Text style={styles.buttonText}>
                    View Nearby Doctors
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Result;