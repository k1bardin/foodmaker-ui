import React, { useState } from 'react';
import styles from "./styles";
import { useAuth } from '../../services/AuthContext';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity,
    ActivityIndicator,
    ScrollView
} from 'react-native';

export default function LoginScreen(props) {
    const { navigation, route } = props;
    const [credentials, setCredentials] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setUser } = useAuth();

    const handleRegisterPress = () => {
        navigation.navigate('Register');
        };

    const handleLogin = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('http://192.168.88.249:8082/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    credentials,
                    password
                })
            });

            if (!response.ok) {
                throw new Error('Ошибка авторизации');
            }

            const userData = await response.json();
            setUser(userData);

            console.log('Авторизация успешна');
            navigation.navigate('Home');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
        <ScrollView style={styles.formContainer}>
        <Text style={styles.title}>Войти в аккаунт</Text>
       
        {error && (
        <Text style={styles.error}>{error}</Text>
        )}
       
        <TextInput
        style={styles.input}
        placeholder="Телефон или email"
        value={credentials}
        onChangeText={setCredentials}
        keyboardType="email-address"
        />
       
        <TextInput
        style={styles.input}
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        />
       
        <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
        >
        {loading ? (
        <ActivityIndicator size="small" color="#fff" />
        ) : (
        <Text style={styles.buttonText}>Войти</Text>
        )}
        </TouchableOpacity>

        <TouchableOpacity
        style={styles.buttonRegister}
        disabled={loading}
        onPress={handleRegisterPress}
        >
        {loading ? (
        <ActivityIndicator size="small" color="#fff" />
        ) : (
        <Text style={styles.buttonRegisterText}>Зарегистрироваться</Text>
        )}
        </TouchableOpacity>
       

        </ScrollView>
        </View>
        );
       };