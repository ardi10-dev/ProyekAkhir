import { View, Text, TextInput, StyleSheet } from 'react-native';

function Inputan({
    
}) {
    return (
        <View>
            <TextInput
                style={styles.input}
                returnKeyType="next"
            />
        </View>
    );
}

export default Inputan;

const styles = StyleSheet.create({
    inputContainer: {
        marginVertical: 8,
    },
    text: {
        marginTop: 10,
        fontSize: 18,
    },
    input: {
        height: 40,
        padding: 12,
        borderWidth: 1,
        borderColor: '#4C70C4',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        fontSize: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.8,
        shadowRadius: 0.8,
    },

});
