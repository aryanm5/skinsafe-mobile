import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity
} from 'react-native';

import testString from './assets/testString';

//import * as tf from '@tensorflow/tfjs';
//import '@tensorflow/tfjs-react-native';

const App = () => {
    // State to indicate if TensorFlow.js finished loading
    /*const [tfReady, setTfReady] = useState(false);

    const makeTfReady = async () => {
        await tf.ready();
        setTfReady(true);
    };

    useEffect(() => {
        makeTfReady();
    }, []);

    const runPrediction = async () => {
        console.log('about tto predict');
        const CATEGORIES = ['Melanoma', 'NotMelanoma'];

        try {
            //const modelJson = Asset.fromModule();

            const model = await tf.loadLayersModel('https://skinsafe-melanoma.s3.us-west-1.amazonaws.com/melanoma_model.json');

            console.log('model loaded');

            const prediction = model.predict(testString).print();

            console.log('PREDICTION: ' + prediction);
        } catch (err) {
            console.error('ERROR: ' + err);
        }
    };*/

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <Text>hi i'm meloneramo</Text>
                <TouchableOpacity  style={{ marginTop: 10, padding: 5, backgroundColor: 'yellow' }}>
                    <Text>
                        Click me to predict... (ADD onPRESS!)
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
});

export default App;
