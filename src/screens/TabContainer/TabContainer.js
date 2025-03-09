import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

// Импортируем экраны
import CategoriesScreen from "../Categories/CategoriesScreen";
import RecipesListScreen from "../RecipesList/RecipesListScreen";
import RecipeScreen from "../Recipe/RecipeScreen";
import AddRecipeScreen from "../AddRecipe/AddRecipeScreen";
import { Image } from "react-native";
import LoginScreen from "../Login/LoginScreen";
import RegisterScreen from "../Register/RegisterScreen";
import SearchScreen from "../Search/SearchScreen";
import FavouriteRecipesListScreen from "../FavouriteRecipeList/FavouriteRecipeListScreen";
import AccountScreen from "../Account/AccountScreen";

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
          headerTintColor: "#E8B536",
          headerBackTitle: "Назад", // настраиваем текст кнопки назад
          headerBackTitleVisible: true,
        }}
      />
      <Stack.Screen
        name="RecipesList"
        component={RecipesListScreen}
        options={{
          headerTitle: () => null, // скрываем основной заголовок
          headerTintColor: "#E8B536",
          headerBackTitle: "Назад", // настраиваем текст кнопки назад
          headerBackTitleVisible: true,
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerTitle: () => null, // скрываем основной заголовок
          headerTintColor: "#E8B536",
          headerBackTitle: "Назад", // настраиваем текст кнопки назад
          headerBackTitleVisible: true,
        }}
      />
      <Stack.Screen
        name="Recipe"
        component={RecipeScreen}
        options={{
          headerTitle: () => null, // скрываем основной заголовок
          headerTintColor: "#E8B536",
          headerBackTitle: "Назад", // настраиваем текст кнопки назад
          headerBackTitleVisible: true,
        }}
      />
      <Stack.Screen
        name="AddRecipe"
        component={AddRecipeScreen}
        options={{
          headerTitle: () => null, // скрываем основной заголовок
          headerTintColor: "#E8B536",
          headerBackTitle: "Назад", // настраиваем текст кнопки назад
          headerBackTitleVisible: true,
        }}
      />
    </Stack.Navigator>
  );
}

function FavouriteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FavouriteRecipesList"
        component={FavouriteRecipesListScreen}
        options={{
          headerTitle: () => null, // скрываем основной заголовок
          headerTintColor: "#E8B536",
          headerBackTitle: "Назад", // настраиваем текст кнопки назад
          headerBackTitleVisible: true,
        }}
      />

      <Stack.Screen
        name="Recipe"
        component={RecipeScreen}
        options={{
          headerTitle: () => null, // скрываем основной заголовок
          headerTintColor: "#E8B536",
          headerBackTitle: "Назад", // настраиваем текст кнопки назад
          headerBackTitleVisible: true,
        }}
      />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RecipesList"
        component={RecipesListScreen}
        options={{
          headerTitle: () => null, // скрываем основной заголовок
          headerTintColor: "#E8B536",
          headerBackTitle: "Назад", // настраиваем текст кнопки назад
          headerBackTitleVisible: true,
        }}
      />
      <Stack.Screen
        name="Recipe"
        component={RecipeScreen}
        options={{
          headerTitle: () => null, // скрываем основной заголовок
          headerTintColor: "#E8B536",
          headerBackTitle: "Назад", // настраиваем текст кнопки назад
          headerBackTitleVisible: true,
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
        options={{
          headerTitle: () => null, // скрываем основной заголовок
          headerTintColor: "#E8B536",
          headerBackTitle: "Назад", // настраиваем текст кнопки назад
          headerBackTitleVisible: true,
        }}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function TabContainer() {
  return (
    <Tab.Navigator
      initialRouteName="Рецепты"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Рецепты") {
            iconName = focused
              ? require("../../../assets/icons/recipesFocused.png")
              : require("../../../assets/icons/recipes.png");
          } else if (route.name === "Поиск") {
            iconName = focused
              ? require("../../../assets/icons/searchFocused.png")
              : require("../../../assets/icons/search.png");
          } else if (route.name === "Избранное") {
            iconName = focused
              ? require("../../../assets/icons/favouriteFocused.png")
              : require("../../../assets/icons/favourite.png");
          } else if (route.name === "Профиль") {
            iconName = focused
              ? require("../../../assets/icons/profileFocused.png")
              : require("../../../assets/icons/profile.png");
          }

          return <Image source={iconName} style={{ width: 27, height: 27 }} />;
        },
        tabBarLabelStyle: {
          color: "Black",
        },
      })}
    >
      <Tab.Screen
        name="Рецепты"
        component={MainStack}
        options={{ headerTitle: () => null }}
      />
      <Tab.Screen
        name="Поиск"
        component={SearchStack}
        options={{ headerTitle: () => null }}
      />
      <Tab.Screen
        name="Избранное"
        component={FavouriteStack}
        options={{ unmountOnBlur: true, headerTitle: () => null }}
      />
      <Tab.Screen
        name="Профиль"
        component={AuthStack}
        options={{ headerTitle: () => null }}
      />
    </Tab.Navigator>
  );
}
