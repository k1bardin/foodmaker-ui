import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';

// Импортируем экраны
import CategoriesScreen from "../Categories/CategoriesScreen";
import RecipesListScreen from "../RecipesList/RecipesListScreen";
import RecipeScreen from "../Recipe/RecipeScreen";
import AddRecipeScreen from "../AddRecipe/AddRecipeScreen";
import { Image } from 'react-native';
import LoginScreen from "../Login/LoginScreen";
import RegisterScreen from "../Register/RegisterScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Основной стек навигации
function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Categories" 
        component={CategoriesScreen} 
        options={{ 
          headerTitle: () => null, // скрываем основной заголовок
          headerTintColor: '#E8B536',
          headerBackTitle: 'Назад', // настраиваем текст кнопки назад
          headerBackTitleVisible: true
         }}
      />
      <Stack.Screen 
        name="RecipesList" 
        component={RecipesListScreen} 
        options={{ 
          headerTitle: () => null, // скрываем основной заголовок
          headerTintColor: '#E8B536',
          headerBackTitle: 'Назад', // настраиваем текст кнопки назад
          headerBackTitleVisible: true
         }}
      />
      <Stack.Screen 
        name="Recipe" 
        component={RecipeScreen} 
        options={{ 
          headerTitle: () => null, // скрываем основной заголовок
          headerTintColor: '#E8B536',
          headerBackTitle: 'Назад', // настраиваем текст кнопки назад
          headerBackTitleVisible: true
         }}
      />
      <Stack.Screen 
        name="AddRecipe" 
        component={AddRecipeScreen} 
        options={{ 
          headerTitle: () => null, // скрываем основной заголовок
          headerTintColor: '#E8B536',
          headerBackTitle: 'Назад', // настраиваем текст кнопки назад
          headerBackTitleVisible: true
         }}
      />
    </Stack.Navigator>
  );
}

// Стек пользовательской авторизации
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function TabContainer() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? require("../../../assets/icons/recipesFocused.png") : require("../../../assets/icons/recipes.png");
          } else if (route.name === 'Favorites') {
            iconName = focused ? require("../../../assets/icons/favouriteFocused.png") : require("../../../assets/icons/favourite.png");
          } else if (route.name === 'Profile') {
            iconName = focused ? require("../../../assets/icons/profileFocused.png") : require("../../../assets/icons/profile.png");
          }

          return <Image source={iconName} style={{ width: 27, height: 27 }} />;
        },
        tabBarLabelStyle: {
          color: 'Black'
        }
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={MainStack} 
        options={{ title: 'Рецепты' }}
      />
      <Tab.Screen 
        name="Favorites" 
        component={MainStack} 
        options={{ title: 'Избранное' }}
      />
      <Tab.Screen 
        name="Profile" 
        component={AuthStack} 
        options={{ title: 'Профиль' }}
      />
    </Tab.Navigator>
  );
}