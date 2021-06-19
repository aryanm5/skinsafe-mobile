import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, } from 'react-native';

const styles = StyleSheet.create({
    resultText: {
        fontSize: 18,
    },
    bold: {
        fontWeight: 'bold',
    },
});

const Result = props => {
    const result = props.result;

    return (
        <Text style={styles.resultText}>
            The image has been classifed as
            <Text style={styles.bold}>
                {
                    result === 0
                        ? ' Not Melanoma!'
                        : ' Melanoma.'
                }
            </Text>
        </Text>
    );
};

export default Result;