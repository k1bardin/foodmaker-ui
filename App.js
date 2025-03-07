import React, { useState } from 'react';
import { AuthProvider } from './src/services/AuthContext';
import AppContainer from './src/navigations/AppNavigationBottom';
import { View, StyleSheet } from "react-native";

export default function App() {

  const [authState, setAuthState] = useState({
    userId: null,
    // другие данные
  });
  return (
    <AuthProvider value={{ ...authState }}>
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
