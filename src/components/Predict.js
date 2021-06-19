import React, { useState, } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, InteractionManager, Image, Dimensions, ActivityIndicator, } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import PixelColor from 'react-native-pixel-color';
import * as tf from '@tensorflow/tfjs';
import * as tfrn from '@tensorflow/tfjs-react-native';
import ProgressBar from 'react-native-progress/Bar';
import Result from './Result';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    buttonContainer: {
        marginTop: 0,
        width: '100%',
        justifyContent: 'space-evenly',
        height: 250,
        width: 250,
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#FF0000',
        minWidth: 150,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
    },
    title: {
        fontSize: 36,
        color: '#FF0000',
        fontFamily: 'Futura',
        marginTop: 15,
    },
    description: {
        fontSize: 17,
        color: '#FF0000',
        textAlign: 'center',
        marginTop: 5,
        maxWidth: '90%',
        marginBottom: 20,
    },
    image: {
        width: 250,
        height: 250,
        borderWidth: StyleSheet.hairlineWidth,
        marginTop: 0,
        marginBottom: 50,
    },
    stage: {
        marginTop: 30,
        fontSize: 16,
    },
    progress: {
        marginTop: 10,
    },
    logoContainer: {
        marginTop: 40,
        position: 'relative',
        minWidth: 200,
        minHeight: 200,
        justifyContent: 'center'
    },
    logo: {
        width: 200,
        height: 200,
        position: 'absolute',
        top: 0,
    },
    glass: {
        width: 150,
        height: 150,
        alignSelf: 'center',
    },
    backButton: {
        alignSelf: 'flex-start',
        marginLeft: 5,
    },
    backButtonText: {
        fontSize: 16,
    },
});

const Predict = props => {
    const [base64, setBase64] = useState(null);
    const [progress, setProgress] = useState(null);
    const [stage, setStage] = useState(null);
    const [result, setResult] = useState(null);

    const pixelGetter = async (path, callback) => {
        let numReady = 0;
        let output = [];
        for (let x = 0; x < 125; ++x) {
            setProgress(x / 124);
            output[x] = [];
            for (let y = 0; y < 125; ++y) {
                if (y === 0) { output[x][y] = []; }
                PixelColor.getHex(path, { x, y: y === 0 ? 1 : y }).then((color) => {
                    const rgb = hexToRgb(color);
                    output[x][y] = [rgb.r, rgb.g, rgb.b];
                    numReady++;
                    if (numReady === 15625) {
                        callback(output);
                    }
                }).catch((err) => {
                    console.error('PIXEL GET ERROR: ' + err);
                });
            }
            await sleep(100);
        }
    };

    const runPrediction = path => {
        setStage('Starting Engines...');
        InteractionManager.runAfterInteractions(async () => {
            try {
                const modelJson = require('../assets/model.json');
                const modelWeights = require('../assets/weights.bin');

                const model = await tf.loadLayersModel(tfrn.bundleResourceIO(modelJson, modelWeights));

                setStage('Analyzing Image...');
                setProgress(null);

                pixelGetter(path, async array => {
                    setStage('Verifying Results...');
                    setProgress(null);
                    await sleep(100);
                    const tensor = tf.tensor([array]);

                    const resultTensor = model.predict(tensor);
                    resultTensor.array()
                        .then(output => {
                            const result = output[0].indexOf(1);
                            setStage(null);
                            setResult(result);
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
            setTimeout(() => runPrediction(image.path), 100);
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
            setTimeout(() => runPrediction(image.path), 100);
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={() => props.setView('landing')} style={styles.backButton}>
                <Text style={styles.backButtonText}>
                    &larr; Back
                </Text>
            </TouchableOpacity>
            <Text style={styles.title}>SkinSafe</Text>
            <Text style={styles.description}>
                Select an image from your Photos or Camera. Crop the image and place the mole in the center for best results.
            </Text>
            {
                base64 === null
                    ? <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={openPhotos} style={styles.button}>
                            <Text style={styles.buttonText}>
                                Photos
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={openCamera} style={styles.button}>
                            <Text style={styles.buttonText}>
                                Camera
                            </Text>
                        </TouchableOpacity>
                    </View>
                    : <Image source={base64 === null ? '' : { uri: `data:image/jpeg;base64,${base64}` }} style={styles.image} />
            }
            {
                stage !== null &&
                <>
                    <Text style={styles.stage}>
                        {stage}
                    </Text>
                    {
                        progress === null
                            ? <ActivityIndicator size='large' color='#FF0000' style={styles.progress} />
                            : <ProgressBar progress={progress} color='#FF0000' useNativeDriver width={Dimensions.get('window').width * 0.8} style={styles.progress} />
                    }
                    <View style={styles.logoContainer}>
                        <Image source={require('../assets/logo.png')} style={styles.logo} />
                        <Image source={require('../assets/glass.gif')} setView={props.setView} style={styles.glass} />
                    </View>
                </>
            }
            {
                result !== null &&
                <Result result={result} setView={props.setView} />
            }
        </ScrollView>
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

export default Predict;
