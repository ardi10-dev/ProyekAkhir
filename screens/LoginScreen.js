import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthContent from "../components/Auth/AuthContent";


function LoginScreen() {
    return (
        <SafeAreaView style={[styles.rootContainer, { backgroundColor: '#E7F4FE', flex: 1 }]}>
            <View style={styles.imageContainer} >
                <Image
                    source={require('../assets/IHC.png')}
                />
            </View>
            <AuthContent isLogin/>
        </SafeAreaView>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    rootContainer: {
        padding: 12,
    },
    imageContainer: {
        alignItems:'center',
        marginBottom:50,
        paddingTop: '20%'
    },
    image: {
        width: 200,
        height: 200,
    },

});
