import React, { useState } from 'react';
import styles from "./styles";
import { useAuth } from '../../services/AuthContext';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';

export default function LoginScreen(props) {
    const { navigation, route } = props;
    const [credentials, setCredentials] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { setUser } = useAuth();

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
            navigation.navigate('Категории');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
        <View style={styles.formContainer}>
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
       
        <View style={styles.footer}>
        <Text style={styles.footerText}>
        Ещё нет аккаунта? 
        <Text 
        style={[styles.footerText, styles.link]}
        onPress={() => console.log('Регистрация')}
        >
        Зарегистрироваться
        </Text>
        </Text>
        </View>
        </View>
        </View>
        );
       };