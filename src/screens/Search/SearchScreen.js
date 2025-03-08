import React, { useState, useEffect, useLayoutEffect } from "react";
import styles from "./styles";
import heartDisabled from "../../../assets/icons/heartDisabled.png";
import heartEnabled from "../../../assets/icons/heartEnabled.png";
import { useAuth } from "../../services/AuthContext";
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  FlatList,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function SearchScreen(props) {
  const { user } = useAuth();
  const { navigation, route } = props;
  const item = route?.params?.category;
  const [favourites, setFavourites] = useState({});
  const [recipesArray, setRecipesArray] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title,
      headerRight: () => <View />,
    });
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`http://192.168.88.249:8080/recipes`);
        const data = await response.json();
        setRecipesArray(data);
        setFilteredRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

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

  const renderRecipes = ({ item }) => (
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
              source={favourites[item.recipeId] ? heartEnabled : heartDisabled}
              style={styles.heartImage}
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableHighlight>
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = recipesArray.filter((recipe) =>
      recipe.recipeTitle.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Поиск рецептов"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        style={{ flex: 1 }}
        vertical
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={filteredRecipes}
        renderItem={renderRecipes}
        keyExtractor={(item) => `${item.recipeId}`}
      />
    </View>
  );
}
