import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, SafeAreaView } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        //height: '100%',
        paddingTop: 10,
        paddingBottom: 10,
    },
    title: {
        fontSize: 36,
        color: '#FF0000',
        fontFamily: 'Futura',
        marginTop: 20,
        marginBottom: -10,
    },
    description: {
        fontSize: 18,
        color: '#FF0000',
        textAlign: 'center',
        marginTop: 15,
        paddingHorizontal: 10,
    },
    backButton: {
        position: 'absolute',
        left: 20,
    },
    backButtonText: {
        fontSize: 16,
    },
    bold: {
        fontWeight: 'bold',
    },
});

const Info = props => {
    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity onPress={props.goBack} style={styles.backButton}>
                    <Text style={styles.backButtonText}>
                        &larr; Back
                    </Text>
                </TouchableOpacity>
                <Text style={styles.title}>
                    What is melanoma?
                </Text>
                <Text style={styles.description}>
                    Melanoma is a common type of skin cancer. Skin cancer can occur anywhere on the body, but it is most common in skin that is often exposed to sunlight, such as the face, neck, hands, and arms.
                </Text>
                <Text style={styles.description}>
                    Melanoma is the fifth most common form of cancer, according to the CDC, with an estimated 106,110 new cases of melanoma in the U.S. in 2021 alone.
                </Text>
                <Text style={styles.description}>
                    Approximately <Text style={styles.bold}>2.3 percent</Text> of men and women will be diagnosed with melanoma of the skin at some point during their lifetime, based on 2016–2018 data.
                </Text>
                <Text style={styles.title}>
                    How do we help?
                </Text>
                <Text style={styles.description}>
                    Melanoma can often start as a "mole" on the skin, gradually getting bigger or discolored as it grows. Many victims don't consult a doctor because they aren't aware of the danger, or due to a <Text style={styles.bold}>lack of access to healthcare</Text>. The melanoma will continue to grow unabated, getting harder to cure each passing day.
                </Text>
                <Text style={styles.description}>
                    SkinSafe completely eradicates this grim prospect by providing <Text style={styles.bold}>deep learning analysis</Text> on moles, straight from people's phones. Through 10,000+ training images, our AI can detect the presence of melanoma without the need of a doctor.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Info;