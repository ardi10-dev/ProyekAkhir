import { useState } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';

import Input from './Input';

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {


    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredConfirmUsername, setEnteredConfirmUsername] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

    const {
        username: usernameIsInvalid,
        confirmusername: usernamesDontMatch,
        password: passwordIsInvalid,
        confirmPassword: passwordsDontMatch,
    } = credentialsInvalid;

    function updateInputValueHandler(inputType, enteredValue) {
        switch (inputType) {
            case 'username':
                setEnteredUsername(enteredValue);
                break;
            case 'confirmusername':
                setEnteredConfirmUsername(enteredValue);
                break;
            case 'password':
                setEnteredPassword(enteredValue);
                break;
            case 'confirmPassword':
                setEnteredConfirmPassword(enteredValue);
                break;
        }
    }

    function submitHandler() {
        onSubmit({
            username: enteredUsername,
            confirmusername: enteredConfirmUsername,
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword,
        });
    }

    return (
        <View>
            <Input
                label="Masukkan Username"
                onUpdateValue={updateInputValueHandler.bind(this, 'username')}
                value={enteredUsername}
                isInvalid={usernameIsInvalid}
            />
            {!isLogin && (
                <Input
                    label="Confirm Username"
                    onUpdateValue={updateInputValueHandler.bind(this, 'confirmusername')}
                    value={enteredConfirmUsername}
                    keyboardType="email-address"
                    isInvalid={usernamesDontMatch}
                />
            )}
            <Input
                label="Password"
                onUpdateValue={updateInputValueHandler.bind(this, 'password')}
                secure
                value={enteredPassword}
                isInvalid={passwordIsInvalid}
            />
            {!isLogin && (
                <Input
                    label="Confirm Password"
                    onUpdateValue={updateInputValueHandler.bind(
                        this,
                        'confirmPassword'
                    )}
                    secure
                    value={enteredConfirmPassword}
                    isInvalid={passwordsDontMatch}
                />
            )}
            <View style={[{ marginTop: 100, alignItems:'center'}]}>
                <Pressable
                    style={({ pressed }) => [styles.buttonContainer, pressed && styles.pressedButton,]}
                    onPress={submitHandler}
                >
                    <Text style={styles.textButton}>Login</Text>
                </Pressable>
            </View>
        </View>
    );
}
export default AuthForm;
const styles = StyleSheet.create({
    buttons: {
        marginTop: 12,
    },
    buttonContainer: {
        padding: 12,
        backgroundColor: '#008DDA',
        borderRadius: 10,
        alignItems: 'center',
        width:'70%',
        alignItems:'center'
    },
    textButton: {
        fontWeight: 'bold',
        color: 'white'
    },
    pressedButton: {
        opacity: 0.25
    },
});