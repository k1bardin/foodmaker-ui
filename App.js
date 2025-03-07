import React from 'react';
import { AuthProvider } from './src/services/AuthContext';
import AppContainer from './src/navigations/AppNavigationBottom';
import { View, StyleSheet } from "react-native";

export default function App() {
  return (
    <AuthProvider>
    <View style={styles.app}>
    <AppContainer />
  </View>
  </AuthProvider>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: 'white'
  }
});
