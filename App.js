import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AddCompany from "./screens/AddCompany";
import LoginScreen from "./screens/LoginScreen";

export default function App() {
  return (
    <View>
      {/* <LoginScreen /> */}
      <AddCompany />
      <StatusBar style='auto' />
    </View>
  );
}
