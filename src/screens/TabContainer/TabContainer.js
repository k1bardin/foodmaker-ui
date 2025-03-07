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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function CategoriesStack() {
  return (
  <Stack.Navigator>
  <Stack.Screen name="Категории" component={CategoriesScreen} />
  <Stack.Screen name="Рецепты" component={RecipesListScreen} />
  <Stack.Screen name="Рецепт" component={RecipeScreen} />
  <Stack.Screen name="Войти" component={UserStack} options={() => ({
    headerShown: false,
    headerBackVisible: false
  })} />
  <Stack.Screen name="Добавление рецепта" component={AddRecipeScreen} />
  </Stack.Navigator>
  );
 }

 function UserStack() {
  return (
  <Stack.Navigator>
  <Stack.Screen name="Вход" component={LoginScreen} />
  <Stack.Screen name="Категории" component={CategoriesStack} options={() => ({
    headerShown: false,
    headerBackVisible: false
  })} />
  </Stack.Navigator>
  );
 }

export default function TabContainer() {
return (
<Tab.Navigator
initialRouteName="Рецепты"
screenOptions={({ route}) => ({
tabBarIcon: ({ focused, color, size }) => {
let iconName;

if (route.name === 'Рецепты') { 
iconName = focused ? require("../../../assets/icons/recipesFocused.png") : require("../../../assets/icons/recipes.png");
} else if (route.name === 'Избранное') {
iconName = focused ? require("../../../assets/icons/favouriteFocused.png") : require("../../../assets/icons/favourite.png");
} else if (route.name === 'Профиль') {
iconName = focused ? require("../../../assets/icons/profileFocused.png") : require("../../../assets/icons/profile.png");
}  

return <Image source={iconName} style={{ width: 24, height: 24 }} />;
},
tabBarLabelStyle: {
  color: 'Black'
}

})}
> 
<Tab.Screen name="Рецепты" component={CategoriesStack} />
<Tab.Screen name="Избранное" component={CategoriesStack} />
<Tab.Screen name="Профиль" component={UserStack} />   
</Tab.Navigator>
);
}

