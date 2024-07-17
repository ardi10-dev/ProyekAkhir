import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login');
        }, 2000)
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: "#E7F4FE" }}>
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Animatable.Image
                    source={require('../assets/ihc.png')}
                    duration={2000}
                    animation="fadeInUpBig"
                />

            </View>
            <View style={{ alignItems: "center", marginBottom: 30 }}>


                <Animatable.Text
                    animation="fadeInDownBig"
                    duration={2000}
                    style={{ color: "rgb(48, 48, 48)", fontSize: 20 }}
                >
                    Absensi Human Capital Information System
                </Animatable.Text>
            </View>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({});