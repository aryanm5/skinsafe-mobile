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
import ImagePicker from 'react-native-image-crop-picker';


import testString from './assets/testString';

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

const App = () => {
    // State to indicate if TensorFlow.js finished loading
    const [tfReady, setTfReady] = useState(false);

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

            const model = await tf.loadLayersModel(require('./assets/model.json'));

            console.log('model loaded');

            const prediction = model.predict(testString).print();

            console.log('PREDICTION: ' + prediction);
        } catch (err) {
            console.error('ERROR: ' + err);
        }
    };

    const openPhotos = () => {
        ImagePicker.openPicker({
            width: 100,
            height: 100,
            cropping: true,
            writeTempFile: false,
            includeBase64: true,
            mediaType: 'photo',
            smartAlbums: ['UserLibrary', 'PhotoStream', 'Panoramas', 'Bursts'],
            compressImageMaxWidth: 100,
            compressImageMaxHeight: 100,
            loadingLabelText: 'Processing...',
        }).then(image => {
            console.log(image);
        });
    };
    const openCamera = () => {
        ImagePicker.openCamera({
            width: 100,
            height: 100,
            cropping: true,
            writeTempFile: false,
            includeBase64: true,
            mediaType: 'photo',
            smartAlbums: ['UserLibrary', 'PhotoStream', 'Panoramas', 'Bursts'],
            compressImageMaxWidth: 100,
            compressImageMaxHeight: 100,
            loadingLabelText: 'Processing...',
        }).then(image => {
            console.log(image);
        });
    };

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView>
                <Text>hi i'm melganoma</Text>
                <TouchableOpacity onPress={runPrediction} style={{ marginTop: 10, padding: 5, backgroundColor: 'yellow' }}>
                    <Text>
                        Click me to predict...
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={openPhotos} style={{ marginTop: 10, padding: 5, backgroundColor: 'yellow' }}>
                    <Text>
                        open photos
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={openCamera} style={{ marginTop: 10, padding: 5, backgroundColor: 'yellow' }}>
                    <Text>
                        open camera
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
});

export default App;
