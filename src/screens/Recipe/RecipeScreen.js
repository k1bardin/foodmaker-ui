import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  ActivityIndicator,
} from 'react-native';
import styles from "./styles";

export default function RecipeScreen (props) {
  const { navigation, route } = props;
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        console.log('recipeId:', recipeId);
        const response = await fetch(`http://192.168.88.249:8080/recipe/${recipeId}`);
        const data = await response.json();
        console.log('Получен рецепт:', data);
        setRecipe(data);
      } catch (error) {
        console.error('Ошибка при получении рецепта:', error);
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: recipe.imageLink }}
          style={styles.image}
        />
        <Text style={styles.title}>{recipe.recipeTitle}</Text>
        <Text style={styles.subtitle}>
          {recipe.typeMeal} • {recipe.time}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ингредиенты:</Text>
        <View style={styles.ingredientsList}>
          {recipe.ingredients.map(ingredient => (
            <Text key={ingredient.ingredientId} style={styles.ingredient}>
              {ingredient.ingredientTitle} {ingredient.quantity} 
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Процесс приготовления:</Text>
        <ScrollView style={styles.stepsList}>
          {recipe.steps.map(step => (
            <View key={step.stepNumber} style={styles.step}>
              <Text style={styles.stepNumber}>{step.stepNumber}. </Text>
              <Text style={styles.stepDescription}>{step.stepDescription}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

