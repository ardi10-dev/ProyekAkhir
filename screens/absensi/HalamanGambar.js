import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, Pressable, Alert } from "react-native";
import React, { useState, useEffect } from 'react';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as ImageManipulator from 'expo-image-manipulator';

function HalamanGambar({ onImageTaken }) {
    const [pickedImage, setPickedImage] = useState();
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    const [imageError, setImageError] = useState(false);

    async function verifyPermissions() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }

        // if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
        //     Alert.alert(
        //         'Insufficient permissions!',
        //         'Anda perlu memberikan izin kamera untuk menggunakan aplikasi ini.'
        //     );
        //     return false;
        // }
        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [1,1],
            quality: 0.5,
        });

        if (!image.canceled) {
            console.log('Original Image URI:', image.assets[0].uri);

            try {
                const manipulatedImage = await ImageManipulator.manipulateAsync(
                    image.assets[0].uri,
                    [{ resize: { width: 800, height: 600 } }],
                    { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
                );

                console.log('Manipulated Image URI:', manipulatedImage.uri);

                const newImageUri = `${FileSystem.cacheDirectory}photo.jpg`;
                await FileSystem.moveAsync({
                    from: manipulatedImage.uri,
                    to: newImageUri,
                });

                // console.log('New Image URI:', newImageUri);
                setPickedImage(newImageUri);
                onImageTaken(newImageUri);
            } catch (error) {
                console.log('Error manipulating image:', error);
            }

            // const resizedImage = await ImageResizer.createResizedImage(
            //     image.assets[0].uri,
            //     800, // width
            //     600, // height
            //     'JPEG',
            //     80 // quality
            // );
            // console.log('Image URI:', resizedImage.assets[0].uri);
            // setPickedImage(resizedImage.assets[0].uri);
            // onImageTaken(resizedImage.assets[0].uri);
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
        height: 300,
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
