import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import PixelColor from 'react-native-pixel-color';


import * as tf from '@tensorflow/tfjs';
import * as tfrn from '@tensorflow/tfjs-react-native';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

async function pixelGetter(path, callback) {
    let numReady = 0;
    let outputObj = [];
    let output = [];
    for (let x = 0; x < 100; ++x) {
        outputObj[x] = [];
        console.log(x);
        for (let y = 0; y < 100; ++y) {
            if (y === 0) { outputObj[x][y] = []; }
            PixelColor.getHex(path, { x, y: y }).then((color) => {
                const rgb = hexToRgb(color);
                outputObj[x][y] = [rgb.r, rgb.g, rgb.b];
                numReady++;
                if (numReady === 10000) {
                    console.log('numReady is 10000!');
                    /*outputObj.forEach(yrow => {
                        yrow.forEach(pixel => {
                            output.push(...pixel);
                        });
                    });*/

                    callback(outputObj);
                }
            }).catch((err) => {
                console.log('PIXEL GET ERROR: ' + err);
            });
        }
        await sleep(100);
    }
}

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

    const runPrediction = async (path) => {
        console.log('about tto predict');
        const CATEGORIES = ['Melanoma', 'NotMelanoma'];

        try {
            const modelJson = require('./assets/model.json');
            const modelWeights = require('./assets/weights.bin');

            const model = await tf.loadLayersModel(tfrn.bundleResourceIO(modelJson, modelWeights));

            console.log('model loaded');

            pixelGetter(path, array => {
                console.log('RAW ARRAY: ' + JSON.stringify(array));
                const tensor = tf.tensor([array]);
                console.log('TENSOR BEFORE RESIZE:');
                tensor.print();
                //const resized = tensor.reshape([-1, 100, 100, 3]);
                //console.log('TENSOR AFTER RESIZE:');
                //resized.print();

                model.predict(tensor).array()
                    .then(output => {
                        const result = CATEGORIES[output];
                        console.log('PREDICTION: ' + result);
                        alert('The image is ' + result + '!');
                    })
                    .catch(err => console.error('PREDICT ERROR: ' + err));
            });
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
            forceJpg: true,
            mediaType: 'photo',
            smartAlbums: ['UserLibrary', 'PhotoStream', 'Panoramas', 'Bursts'],
            compressImageMaxWidth: 100,
            compressImageMaxHeight: 100,
            loadingLabelText: 'Processing...',
        }).then(image => {
            console.log('starting prediction...');
            runPrediction(image.path);
        });
    };
    const openCamera = () => {
        ImagePicker.openCamera({
            width: 100,
            height: 100,
            cropping: true,
            writeTempFile: false,
            forceJpg: true,
            mediaType: 'photo',
            smartAlbums: ['UserLibrary', 'PhotoStream', 'Panoramas', 'Bursts'],
            compressImageMaxWidth: 100,
            compressImageMaxHeight: 100,
            loadingLabelText: 'Processing...',
        }).then(image => {
            console.log('starting prediction...');
            runPrediction(image.path);
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
