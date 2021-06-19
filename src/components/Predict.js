import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    InteractionManager,
    Image
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import PixelColor from 'react-native-pixel-color';
import * as tf from '@tensorflow/tfjs';
import * as tfrn from '@tensorflow/tfjs-react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    button: {
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: '#FF0000',
        marginHorizontal: 20,
        minWidth: 100,
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
    },
    title: {
        fontSize: 36,
        color: '#FF0000',
        fontFamily: 'Futura',
        marginTop: -60,
    },
    description: {
        fontSize: 16,
        color: '#FF0000',
        textAlign: 'center',
        marginTop: 5,
        maxWidth: '90%'
    },
    image: {
        width: 250,
        height: 250,
        borderWidth: StyleSheet.hairlineWidth,
        marginVertical: 30,
    }
});

const Predict = () => {
    const [base64, setBase64] = useState(null);

    const runPrediction = path => {
        InteractionManager.runAfterInteractions(async () => {
            console.log('about tto predict');
            const CATEGORIES = ['Melanoma', 'NotMelanoma'];

            try {
                const modelJson = require('../assets/model.json');
                const modelWeights = require('../assets/weights.bin');

                const model = await tf.loadLayersModel(tfrn.bundleResourceIO(modelJson, modelWeights));

                console.log('model loaded');

                pixelGetter(path, array => {
                    const tensor = tf.tensor([array]);

                    const resultTensor = model.predict(tensor);
                    resultTensor.array()
                        .then(output => {
                            const result = CATEGORIES[output];
                            console.log('RAW OUTPUT: ' + JSON.stringify(output));
                            console.log('PREDICTION: ' + result);
                            alert('The image is ' + result + '!');
                        })
                        .catch(err => console.error('PREDICT ERROR: ' + err));
                });
            } catch (err) {
                console.error('ERROR: ' + err);
            }
        });
    };

    const openPhotos = () => {
        ImagePicker.openPicker({
            width: 125,
            height: 125,
            cropping: true,
            writeTempFile: false,
            includeBase64: true,
            forceJpg: true,
            mediaType: 'photo',
            smartAlbums: ['UserLibrary', 'PhotoStream', 'Panoramas', 'Bursts'],
            compressImageMaxWidth: 125,
            compressImageMaxHeight: 125,
            loadingLabelText: 'Processing...',
        }).then(image => {
            setBase64(image.data);
            console.log(image.data);
            //setTimeout(() => runPrediction(image.path), 100);
        });
    };
    const openCamera = () => {
        ImagePicker.openCamera({
            width: 125,
            height: 125,
            cropping: true,
            writeTempFile: false,
            includeBase64: true,
            forceJpg: true,
            mediaType: 'photo',
            smartAlbums: ['UserLibrary', 'PhotoStream', 'Panoramas', 'Bursts'],
            compressImageMaxWidth: 125,
            compressImageMaxHeight: 125,
            loadingLabelText: 'Processing...',
        }).then(image => {
            setBase64(image.data);
            console.log(image.data);
            setTimeout(() => runPrediction(image.path), 100);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>SkinSafe</Text>
            <Text style={styles.description}>
                Select an image from your Photos or Camera. Crop the image and place the mole in the center for best results.
            </Text>

            {
                <Image source={base64 === null ? '' : { uri: 'data:image/jpeg;base64,' + base64 }} style={styles.image} />
            }
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={openPhotos} style={styles.button}>
                    <Text style={styles.buttonText}>
                        photos
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={openCamera} style={styles.button}>
                    <Text style={styles.buttonText}>
                        camera
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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
    let output = [];
    for (let x = 0; x < 125; ++x) {
        output[x] = [];
        console.log(x);
        for (let y = 0; y < 125; ++y) {
            if (y === 0) { output[x][y] = []; }
            PixelColor.getHex(path, { x, y: y === 0 ? 1 : y }).then((color) => {
                const rgb = hexToRgb(color);
                output[x][y] = [rgb.r, rgb.g, rgb.b];
                numReady++;
                if (numReady === 15625) {
                    console.log('numReady is 15625!');
                    callback(output);
                }
            }).catch((err) => {
                console.log('PIXEL GET ERROR: ' + err);
            });
        }
        await sleep(100);
    }
}

export default Predict;
