import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useAuth } from "../../services/AuthContext";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function AccountScreen(props) {
  const { user } = useAuth();
  const { setUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `http://192.168.88.249:8082/user/${user.userId}`
        );
        if (!response.ok) {
          throw new Error("Ошибка получения данных");
        }
        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleMyRecipes = () => {
    navigation.navigate("Рецепты", {
      screen: "RecipesList",
      params: {
        category: { categoryName: "Мои рецепты" },
      },
    });
  };

  const handleLogout = () => {
    setUser(null);
    navigation.navigate("Login");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Профиль</Text>
      <View style={styles.profileItem}>
        <Text style={styles.label}>ФИО</Text>
        <Text style={styles.value}>
          {`${profileData.lastName} ${profileData.firstName} ${profileData.middleName}`}
        </Text>
      </View>

      <View style={styles.profileItem}>
        <Text style={styles.label}>Телефон</Text>
        <Text style={styles.value}>{profileData.mobilePhone}</Text>
      </View>

      <View style={styles.profileItem}>
        <Text style={styles.label}>Электронная почта</Text>
        <Text style={styles.value}>{profileData.email}</Text>
      </View>

      <View style={styles.profileItem}>
        <Text style={styles.label}>Тип пользователя</Text>
        <Text style={styles.value}>{profileData.typeName}</Text>
      </View>
      <TouchableOpacity style={styles.recipesButton} onPress={handleMyRecipes}>
        <Text style={styles.recipesText}>Мои рецепты</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Выйти из профиля</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
