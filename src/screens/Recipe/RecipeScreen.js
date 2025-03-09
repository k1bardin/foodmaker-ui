import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import styles from "./styles";
import { useAuth } from "../../services/AuthContext";

export default function RecipeScreen(props) {
  const { user } = useAuth();
  const { navigation, route } = props;
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState(null);
  const [userRecipe, setUserRecipe] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        console.log("recipeId:", recipeId);
        const response = await fetch(
          `http://192.168.88.249:8080/recipe/${recipeId}`
        );
        const data = await response.json();
        console.log("Получен рецепт:", data);
        setRecipe(data);

        // Получаем информацию о рецепте пользователя
        const userRecipeResponse = await fetch(
          `http://192.168.88.249:8080/user/recipe/${recipeId}`
        );
        const userRecipeData = await userRecipeResponse.json();
        setUserRecipe(userRecipeData);

        // Получаем информацию о пользователе
        if (userRecipeData && userRecipeData.length > 0) {
          const userInfoResponse = await fetch(
            `http://192.168.88.249:8082/user/${userRecipeData[0].userId}`
          );
          const userInfoData = await userInfoResponse.json();
          setUserInfo(userInfoData);
          console.log("Получен юзер:", userInfoData);
        }
      } catch (error) {
        console.error("Ошибка при получении рецепта:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.errorContainer}>
        <Text>Рецепт не найден</Text>
      </View>
    );
  }

  const hasTypeMealName = recipe?.attributes?.[0]?.typeMealName;
  const hasHolidayName = recipe?.attributes?.[0]?.holidayName;
  const hasTime = recipe?.time;
  const hasAuthor = userInfo ? userInfo.roleId !== 1 : false;
  console.log("Автор?:", hasAuthor);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: recipe.imageLink }} style={styles.image} />
      </View>
      <View style={styles.attributes}>
        {hasTypeMealName && (
          <Text style={styles.subtitle}>
            {recipe.attributes[0].typeMealName}
          </Text>
        )}
        {hasHolidayName && (
          <Text style={styles.subtitle}>
            {recipe.attributes[0].holidayName}
          </Text>
        )}
        {hasTime && <Text style={styles.subtitle}>{recipe.time}</Text>}
      </View>

      <Text style={styles.title}>{recipe.recipeTitle}</Text>
      <View style={styles.userInfo}>
        {hasAuthor && (
          <Text style={styles.subtitleUser}>
            <Text style={{ fontWeight: "400" }}>Автор: </Text>
            <Text>
              {userInfo.firstName}, {userInfo.typeName}
            </Text>
          </Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ингредиенты</Text>
        <View style={styles.ingredientsList}>
          {recipe.ingredients.map((ingredient) => (
            <View key={ingredient.ingredientId} style={styles.ingredientItem}>
              <Text style={styles.ingredientTitle}>
                {ingredient.ingredientTitle}
              </Text>
              <Text style={styles.ingredientQuantity}>
                {ingredient.quantity}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Приготовление</Text>
        <ScrollView style={styles.stepsList}>
          {recipe.steps.map((step) => (
            <View key={step.stepNumber} style={styles.step}>
              <Text style={styles.stepNumber}>{step.stepNumber}. </Text>
              <Text style={styles.stepDescription}>{step.stepDescription}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
