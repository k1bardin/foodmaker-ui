import styles from "./styles";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../services/AuthContext";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function RegisterScreen(props) {
  const { navigation, route } = props;
  const [userTypes, setUserTypes] = useState();
  const { setUser } = useAuth();
  const [selectedTypeId, setSelectedTypeId] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    mobilePhone: "",
    password: "",
    typeId: null,
    roleId: 1,
  });

  // Получение типов пользователей
  useEffect(() => {
    const fetchUserTypes = async () => {
      try {
        const response = await fetch("http://192.168.88.249:8082/userTypes");
        const data = await response.json();
        setUserTypes(data);
      } catch (error) {
        console.error("Ошибка при получении типов пользователей:", error);
      }
    };
    fetchUserTypes();
  }, []);

  // Обработка изменения полей формы
  const handleInputChange = (field, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  // Обработка выбора типа пользователя
  const handleTypeSelect = (typeId) => {
    setSelectedTypeId(typeId);
    setFormData({ ...formData, typeId });
  };

  // Обработка регистрации
  const handleRegister = async () => {
    try {
      // Валидация полей
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.password ||
        !formData.typeId
      ) {
        alert("Пожалуйста, заполните все обязательные поля");
        return;
      }

      // Регистрация
      const registerResponse = await fetch(
        "http://192.168.88.249:8082/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const registerData = await registerResponse.json();

      // Авторизация
      const loginData = {
        credentials: formData.email || formData.mobilePhone,
        password: formData.password,
      };
      const loginResponse = await fetch("http://192.168.88.249:8082/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const userData = await loginResponse.json();
      setUser(userData);
      navigation.navigate("Рецепты");
    } catch (error) {
      console.error("Ошибка при регистрации:", error);
      alert("Ошибка при регистрации. Проверьте данные и повторите попытку");
    }
  };

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
  >
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.title}>Зарегистрируйтесь</Text>
        {/* Имя */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Имя</Text>
          <TextInput
            style={styles.input}
            placeholder="Введите ваше имя"
            value={formData.firstName}
            onChangeText={(value) => handleInputChange("firstName", value)}
          />
        </View>

        {/* Фамилия */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Фамилия</Text>
          <TextInput
            style={styles.input}
            value={formData.lastName}
            placeholder="Введите вашу фамилию"
            onChangeText={(value) => handleInputChange("lastName", value)}
          />
        </View>

        {/* Отчество */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Отчество</Text>
          <TextInput
            style={styles.input}
            value={formData.middleName}
            placeholder="Введите ваше отчество (необязательно)"
            onChangeText={(value) => handleInputChange("middleName", value)}
          />
        </View>

        {/* Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            keyboardType="email-address"
            placeholder="Введите адрес электронной почты"
            onChangeText={(value) => handleInputChange("email", value)}
          />
        </View>

        {/* Телефон */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Мобильный телефон</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            value={formData.mobilePhone}
            placeholder="Введите номер телефона"
            onChangeText={(value) => handleInputChange("mobilePhone", value)}
          />
        </View>

        {/* Пароль */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Пароль</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={formData.password}
            placeholder="Придумайте пароль"
            onChangeText={(value) => handleInputChange("password", value)}
          />
        </View>

        {/* Тип пользователя */}
        <View style={styles.userTypeContainer}>
          <Text style={styles.label}>Кто вы?</Text>
          <View style={styles.chipContainer}>
            {userTypes &&
              userTypes.map((type) => (
                <TouchableOpacity
                  key={type.typeId}
                  style={[
                    styles.chip,
                    selectedTypeId === type.typeId ? styles.chipSelected : null,
                  ]}
                  onPress={() => handleTypeSelect(type.typeId)}
                >
                  <Text style={styles.chipText}>{type.typeName}</Text>
                </TouchableOpacity>
              ))}
          </View>
        </View>

        {/* Кнопка регистрации */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Зарегистрироваться</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
