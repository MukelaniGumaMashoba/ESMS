import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    ImageBackground,
    Image,
    SafeAreaView
} from 'react-native';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/FirebaseConfig';

export default function login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        if (email === '' || password === '') {
            setError('Please fill in all fields');
            return;
        }
        else {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredentials) => {
                    const user = userCredentials.user;
                    console.log('User login up:', user.email);
                    Alert.alert('Success', 'Account created successfully!');
                })
                .catch((error) => {
                    console.error('Error signing up:', error);
                    Alert.alert('Error', error.message);
                });
        }
        // Here you would typically handle the login logic, e.g., calling an API or Firebase auth
        Alert.alert('Login', `Email: ${email}, Password: ${password}`);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
            <View style={styles.container}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Login</Text>
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <View>
                    <TextInput
                        placeholder="Password"
                        style={styles.input}
                        secureTextEntry={showPassword ? false : true}
                        autoCapitalize="none"
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 10, top: 15 }}>
                        <Text>{showPassword ? 'Hide' : 'Show'}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Login button pressed')}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
    button: {
        width: '80%',
        height: 50,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    errorText: {
        color: 'red',
        marginBottom: 20,
    },
    forgotPassword: {
        marginTop: 10,
        color: '#007BFF',
    },
    registerText: {
        marginTop: 20,
        color: '#007BFF',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        position: 'absolute',
        top: 50,
        alignItems: 'center',
    },
    logoText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 16,
        marginBottom: 5,
        color: '#fff',
    },
    inputField: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    buttonContainer: {
        width: '80%',
        marginBottom: 20,
    },
})

