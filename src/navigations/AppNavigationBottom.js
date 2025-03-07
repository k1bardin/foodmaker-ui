import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabContainer from '../screens/TabContainer/TabContainer';
import { createStackNavigator } from '@react-navigation/stack';
import RecipesListScreen from '../screens/RecipesList/RecipesListScreen';

const Tab = createStackNavigator();

export default function AppContainer() {
  return (
    <NavigationContainer>
    <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Foodmaker" component={TabContainer} />
    </Tab.Navigator>
    </NavigationContainer>
    );
}

console.disableYellowBox = true;