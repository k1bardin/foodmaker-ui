import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import plusIcon from "../../../assets/icons/plus.png";
import heartDisabled from "../../../assets/icons/heartDisabled.png";
import heartEnabled from "../../../assets/icons/heartEnabled.png";
import { useAuth } from "../../services/AuthContext";
import { useIsFocused } from "@react-navigation/native";

export default function RecipesListScreen(props) {
  const isFocused = useIsFocused();
  const { user } = useAuth();
  const { navigation, route } = props;

  const item = route?.params?.category;
  const [recipesArray, setRecipesArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);
  const [favourites, setFavourites] = useState({});
  const reloadScreen = () => {
    setReloadKey(reloadKey + 1);
  };


  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerRight: () => <View />,
    });
  }, []);

  useEffect(() => {
    reloadScreen();
  }, [isFocused]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let url;

        // Проверяем название категории
        if (user && item?.categoryName === "Мои рецепты") {
          // Для "Мои рецепты" используем endpoint с userId
          url = `http://192.168.88.249:8080/recipes/${user.userId}`;
        } else {
          // Для остальных категорий используем findByCategory
          url = `http://192.168.88.249:8080/recipes/findByCategory/${item.categoryId}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setRecipesArray(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [item, user, reloadKey]);

  useEffect(() => {
    if (user && recipesArray.length > 0) {
      const fetchFavourites = async () => {
        try {
          const response = await fetch(
            `http://192.168.88.249:8080/favouriteRecipes/${user.userId}`
          );
          const data = await response.json();

          const favouritesObj = data.reduce((acc, favourite) => {
            acc[favourite.recipeId] = true;
            return acc;
          }, {});

          setFavourites(favouritesObj);
        } catch (error) {
          console.error("Error fetching favourites:", error);
        }
      };

      fetchFavourites();
    }
  }, [user, recipesArray, reloadKey]);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { recipeId: item.recipeId });
  };

  const toggleFavourite = async (recipeId) => {
    if (!user) return;
    const isFavourite = favourites[recipeId];
    const method = isFavourite ? "DELETE" : "POST";

    try {
      const response = await fetch(
        `http://192.168.88.249:8080/user/favouriteRecipe`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipeId,
            userId: user.userId,
          }),
        }
      );

      if (response.ok) {
        setFavourites((prevFavourites) => ({
          ...prevFavourites,
          [recipeId]: !isFavourite,
        }));
      }
    } catch (error) {
      console.error("Error toggling favourite:", error);
    }
  };

  const renderRecipes = ({ item }) => {
    return (
      <TouchableHighlight
        underlayColor="rgba(196, 196, 196, 0.9)"
        onPress={() => onPressRecipe(item)}
      >
        <View style={styles.container}>
          <Image style={styles.photo} source={{ uri: item.imageLinkPreview }} />
          <Text style={styles.title}>{item.recipeTitle}</Text>

          {user && (
            <TouchableOpacity
              style={styles.heartIcon}
              onPress={() => toggleFavourite(item.recipeId)}
            >
              <Image
                source={
                  favourites[item.recipeId] ? heartEnabled : heartDisabled
                }
                style={styles.heartImage}
              />
            </TouchableOpacity>
          )}
        </View>
      </TouchableHighlight>
    );
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View key={reloadKey} style={{ flex: 1, backgroundColor: "white" }}>
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
      {recipesArray.length > 0 ? (
        <FlatList
          style={{ flex: 1 }}
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={recipesArray}
          renderItem={renderRecipes}
          keyExtractor={(item) => `${item.recipeId}`}
        />
      ) : (
        <Text
          style={{
            textAlign: "center",
            marginTop: 220,
            paddingVertical: 30,
            fontSize: 18,
            fontWeight: 600,
            opacity: 0.5,
          }}
        >
          Здесь пока отсутствуют рецепты
        </Text>
      )}
    </View>
  );
}
