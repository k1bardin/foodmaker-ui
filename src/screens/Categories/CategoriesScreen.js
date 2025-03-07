import React, { useLayoutEffect, useState, useEffect  } from "react";
import { FlatList, Text, View, Image, TouchableHighlight, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import styles from "./styles";
import { useAuth } from "../../services/AuthContext";
import Config from "../../Config";


export default function CategoriesScreen(props) {
 // const { navigation } = props;
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://192.168.88.249:8080/categories");
        if (!response.ok) {
          throw new Error('Не удалось получить данные категорий');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);

      }
    };

    fetchCategories();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        flex: 1,
      },
      headerRight: () => <View />,
    });
  }, []);

  const onPressCategory = (category) => {
    if (category.categoryName === "Мои рецепты" && !user) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('RecipesList', {
        category
      });
    }
  };

  const renderCategory = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(220, 220, 220, 0.9)" onPress={() => onPressCategory(item)}>
      <View style={styles.categoriesItemContainer}>
        <Image style={styles.categoriesPhoto} source={{ uri: item.imageLink }} />
      </View>
    </TouchableHighlight>
  );
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
            <FlatList vertical showsVerticalScrollIndicator={false} numColumns={2}
            key={`categories-list-${2}`}
        data={categories} 
        renderItem={renderCategory} 
        keyExtractor={(item) => `${item.categoryId}`}
        
      />
    </View>
  );
}
