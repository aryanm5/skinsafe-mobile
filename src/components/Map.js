import React from 'react';
import { StyleSheet, View, Dimensions, TouchableOpacity, Text, StatusBar } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const coords = [
    [
        33.69165982915662, -117.82445888908545, 'Dermatologist',
    ],
    [
        33.725474264005406, -118.05157151400492, 'Huntington Beach Dermatology Medical Center', 'Medical clinic',
    ],
    [
        33.65159824810319, -117.74491334241453, 'Hoag Family Medicine Irvine - Los Olivos', 'Medical clinic',
    ],
    [
        33.66555737772212, -117.86522447906827, 'Adam M. Rotunda, M.D., P.C., Mohs', 'Dermatologist',
    ],
    [
        33.651901731521725, -117.84918299418112, 'UCI Health Dermatology Center', 'Dermatologist',
    ],
    [
        33.749870854679756, -117.83532898450581, 'Suchismita Paul, MD', 'Dermatologist',
    ],
    [
        33.618512141239265, -117.91116145851785, 'Skin Cancer Free', 'Skin care clinic'
    ],
    [
        33.61561243378219, -117.86935435407065, 'OC Skin Institute', 'Dermatologist',
    ],
    [
        33.614952902274005, -117.87243579337358, 'Coastline Dermatology Laser & Medical Center', 'Skin care clinic',
    ],
    [
        33.613283819567265, -117.87449140191234, 'Mole Removal Orange County', 'Skin care clinic',
    ],
    [
        33.612453495625736, -117.87206586739214, 'Skin Cancer RX', 'Medical clinic',
    ],
    [
        33.611963053030784, -117.87619137606298, 'Skin Cancer and Reconstructive Surgery Center', 'Dermatologist',
    ],
    [
        33.62738769408275, -117.92668189686644, 'California Dermatology Physicians', 'Dermatologist',
    ],
    [
        33.66647341529178, -117.76382314106091, 'Medical Oncology Care Associates', 'Doctor',
    ],
    [
        33.69147204807829, -117.77137624130499, 'West Dermatology', 'Dermatologist',
    ],
];

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: '100%'
    },
    back: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    backText: {
        color: '#FFF',
        fontSize: 18,
    },
    close: {
        position: 'absolute',
        alignSelf: 'center',
        bottom: 30,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        backgroundColor: '#FF0000',
    },
    closeText: {
        fontSize: 15,
        color: '#FFF'
    }
});

const Map = props => {
    return (
        <View style={[styles.container, { width: Dimensions.get('window').width, height: Dimensions.get('window').height }]}>
            <StatusBar barStyle='light-content' />
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 33.67193140660729,
                    longitude: -117.78643727248176,
                    latitudeDelta: 0.3922,
                    longitudeDelta: 0.3421,
                }}
            >
                {
                    coords.map(c => <Marker key={`${c[0]} ${c[1]}`} coordinate={{ latitude: c[0], longitude: c[1] }} title={c[2]} description={c[3]} />)
                }
            </MapView>
            <TouchableOpacity onPress={props.goBack} style={styles.back}>
                <Text style={styles.backText}>
                    &larr; Back
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.goBack} style={styles.close}>
                <Text style={styles.closeText}>
                    Close Map
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Map;