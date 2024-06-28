import axios from 'axios';
import { Platform } from 'react-native';
import { fetch } from 'react-native-ssl-pinning';

const API_URL = 'https://36.92.141.5/pegawaian/api/Login/login';

export const login = async (email, password) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            sslPinning: {
                certs: ['your_cert_name'], // ganti dengan nama sertifikat Anda
            },
        });
        const result = await response.json();
        console.log('Response:', result);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
