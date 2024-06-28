import { useState } from 'react';
import { Alert, StyleSheet, View , } from 'react-native';

import AuthForm from './AuthForm';

function AuthContent({ isLogin, onAuthenticate }) {

    const [credentialsInvalid, setCredentialsInvalid] = useState({
        username: false,
        password: false,
        confirmusername: false,
        confirmPassword: false,
    });
    function submitHandler(credentials) {
        let { username, confirmusername, password, confirmPassword } = credentials;

        username = username.trim();
        password = password.trim();

        const usernameIsValid = username;
        const passwordIsValid = password.length > 6;
        const usernamesAreEqual = username === confirmusername;
        const passwordsAreEqual = password === confirmPassword;

        if (
            !usernameIsValid ||
            !passwordIsValid ||
            (!isLogin && (!usernamesAreEqual || !passwordsAreEqual))
        ) {
            Alert.alert('Invalid input', 'Please check your entered credentials.');
            setCredentialsInvalid({
                username: !usernameIsValid,
                confirmusername: !usernameIsValid || !usernamesAreEqual,
                password: !passwordIsValid,
                confirmPassword: !passwordIsValid || !passwordsAreEqual,
            });
            return;
        }
        onAuthenticate({ username, password });
    }

    return (
        <View>
            <AuthForm
                isLogin={isLogin}
                onSubmit={submitHandler}
                credentialsInvalid={credentialsInvalid}
            />
        </View>
    );
}

export default AuthContent;

const styles = StyleSheet.create({
    rootContainer: {
        padding: 12,
    },
});
