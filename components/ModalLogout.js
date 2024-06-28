import React, { useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';

function ModalLogout({ visible, closeModal, logoutHandler }) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={closeModal}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Apakah Anda Yakin Ingin Keluar?</Text>
                    <View style={styles.modalButtons}>
                        <Pressable style={[styles.modalButton, styles.cancelButton]} onPress={closeModal}>
                            <Text style={styles.buttonText}>Batal</Text>
                        </Pressable>
                        <Pressable style={[styles.modalButton, styles.logoutButton]} onPress={logoutHandler}>
                            <Text style={[styles.buttonText, styles.logoutText]}>Ya, Logout</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background transparan
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
        minWidth: 300,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    modalButtons: {
        flexDirection: 'row',
        marginTop: 10,    
    },
    modalButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: 10,
        elevation: 2,
        minWidth: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    cancelButton: {
        backgroundColor: '#4C70C4',
    },
    logoutButton: {
        backgroundColor: '#FF6347',
    },
    logoutText: {
        color: 'white',
    },
});

export default ModalLogout;
