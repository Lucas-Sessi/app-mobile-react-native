import axios from 'axios';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Loading from '../components/loading';

export default function login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const submit = async () => {
        let valid = true;

        

        const validations = {
            usernameRequired: {
                condition: !username,
                message: 'Usuário é obrigatório',
                campo: 'email',
            },
            passwordRequired: {
                condition: !password,
                message: 'Senha é obrigatória',
                campo: 'password',
            }
        }

        for (const validation of Object.values(validations)) {
            if (validation.condition) {
                valid = false;
                if (validation.campo === 'email') {
                    setUsernameError(validation.message);
                } else {
                    setPasswordError(validation.message);
                }
            }
        }

        if (valid) {
            setLoading(true);
            try {
                const body = {
                    username,
                    password,
                }

                const response = await axios.post('http://192.168.10.2:5000/login', body, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                },
            )

                Toast.show({
                    type: 'success',
                    position: 'bottom',
                    text1: 'Login realizado com sucesso',
                    text2: response.data,
                })

                await SecureStore.setItemAsync('token', response.data.data.access_token);

                return router.push('home');
            } catch (error: any) {
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: error.response.data.message,
                    text2: 'Erro ao realizar login',
                })
            } finally {
                setLoading(false);
            }
        }
    }

    if (loading) {
        return <Loading />;
    }
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Finances</Text>
            <Text style={styles.text}>Faça o login para acessar a aplicação.</Text>

            <TextInput
                style={styles.input}
                placeholder='username'
                keyboardType='default'
                value={username}
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={setUsername}
            />

            <TextInput
                style={styles.input}
                placeholder='Password'
                secureTextEntry
                autoCapitalize='none'
                autoCorrect={false}
                value={password}
                onChangeText={setPassword}
            />

                <Pressable onPress={submit} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>

            {}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00005f",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: '#fff',
        fontSize: 38,
        marginBottom: '5%',
        textAlign: 'center',
        width: '75%',
    },
    text: {
        color: '#fff',
        fontSize: 18,
        width: '73%',
        textAlign: 'center',
        marginBottom: '5%',
    },
    input: {
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 5,
        width: '90%',
        fontSize: 16,
        marginTop: '5%',
    },
    button: {
        marginTop: '9%',
        width: '50%',
        borderRadius: 10,
        backgroundColor: '#4287f5',
        height: 39,
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
    error: {
        color: 'red',
    },
});