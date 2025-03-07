import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  Button,
  StyleSheet,
} from "react-native";
import styles from "./styles";
import plusIcon from "../../../assets/icons/plus.png";

const customButtonStyles = StyleSheet.create({
  customButton: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  customButtonText: {
    color: "#212121",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default function RecipesListScreen(props) {
  const { navigation, route } = props;

  const item = route?.params?.category;
  const [recipesArray, setRecipesArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerRight: () => <View />,
    });
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `http://192.168.88.249:8080/recipes/findByCategory/${item.categoryId}`
        );
        const data = await response.json();
        setRecipesArray(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [item.categoryId]);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { recipeId: item.recipeId });
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(196, 196, 196, 0.9)"
      onPress={() => onPressRecipe(item)}
    >
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.imageLink }} />
        <Text style={styles.title}>{item.recipeTitle}</Text>
      </View>
    </TouchableHighlight>
  );

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {item?.categoryName === "Мои рецепты" && (
        <TouchableHighlight
          style={styles.button}
          underlayColor="#F2F2F2"
          onPress={() => navigation.navigate("AddRecipe")}
        >
          <View style={styles.buttonContainer}>
            <Image
              source={plusIcon}
              style={{ marginTop: 16, width: 24, height: 24, opacity: 0.8 }}
            />
            <Text style={styles.buttonText}>Добавить рецепт</Text>
          </View>
        </TouchableHighlight>
      )}
      <FlatList
        style={{ flex: 1 }}
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={recipesArray}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.recipeId}`}
      />
    </View>
  );
}
