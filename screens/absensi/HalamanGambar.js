import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Pressable, Alert  } from "react-native";
import React, { useState, useEffect } from 'react';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';



function HalamanGambar() {
    const [pickedImage, setPickedImage] = useState();
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    const [imageError, setImageError] = useState(false);

    async function verifyPermissions() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant location permissions to use this app.'
            );
            return false;
        }
        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });

        if (!image.canceled) {
            setPickedImage(image.assets[0].uri);
        } 
    }

    let imagePreview = <Text>No image taken yet.</Text>;

    if (pickedImage) {
        imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
    }


    return (
        <View>
            <View>
                <View style={styles.imagePreview}>
                   {imagePreview}
                </View>
                <Pressable
                    style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton,]}
                    onPress={takeImageHandler}>
                    <Text style={styles.textButton}>Ambil selfie</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default HalamanGambar;
const styles = StyleSheet.create({
    buttonContainer: {
        padding: 12,
        backgroundColor: '#074173',
        borderRadius: 10,
        alignItems: 'center',
    },
    textButton: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
    },
    pressedButton: {
        opacity: 0.5,
    },
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: 4,
    },
    image: {
        width: '100%',
        height: '100%'
    }

});
