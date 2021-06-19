import React, { useState, useEffect } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View, } from 'react-native';
import Landing from './components/Landing';
import Predict from './components/Predict';
import * as tf from '@tensorflow/tfjs';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
});

const App = () => {
    const [tfReady, setTfReady] = useState(false);
    const [view, setView] = useState('landing');

    const makeTfReady = async () => {
        await tf.ready();
        setTfReady(true);
    };

    useEffect(() => {
        makeTfReady();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' />
            {
                view === 'landing'
                    ? <Landing tfReady={tfReady} setView={setView} />
                    : <Predict setView={setView} />
            }
        </SafeAreaView>
    )
};

export default App;