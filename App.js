import 'react-native-gesture-handler';
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Screen, screensEnabled,shouldUseActivityState } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddCompany from "./screens/AddCompany";
import SuperAdminDashboard from "./screens/SuperAdminDashboard";
import AdminDashboardScreen from "./screens/AdminDashboardScreen"; 
import AddPatient from "./screens/AddPatient"
import LoginScreen from "./screens/LoginScreen";
import AddExecutive from "./screens/AddExecutive";
import AddLocation from "./screens/AddLocation"
import CompanyExecutive from "./screens/CompanyExecutive"
import { Appbar } from 'react-native-paper';

const Stack = createStackNavigator();

function CustomNavigationBar() {
  return (
    <Appbar.Header>
      <Appbar.Content titleStyle={{textAlign: 'center'}} title="HEALTHGURU" />
    </Appbar.Header>
  );
}

const App=()=> {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: (props) => <CustomNavigationBar {...props} />,
        }}>
        <Stack.Screen style={styles.textHead} name="HEALTHGURU MOBILE APP" component={LoginScreen} />
        <Stack.Screen style={styles.textHead} name="SuperAdminDashboard" component={SuperAdminDashboard} />
        <Stack.Screen style={styles.textHead} name="AdminDashboardScreen" component={AdminDashboardScreen} />
        <Stack.Screen style={styles.textHead} name="AddCompany" component={AddCompany} />
        <Stack.Screen style={styles.textHead} name="AddLocation" component={AddLocation} />
        <Stack.Screen style={styles.textHead} name="CompanyExecutive" component={CompanyExecutive} />
        <Stack.Screen style={styles.textHead} name="AddExecutive" component={AddExecutive} />
        <Stack.Screen style={styles.textHead} name="AddPatient" component={AddPatient} />
        
      </Stack.Navigator>   
  </NavigationContainer>
  );
}
export default App;

const styles = StyleSheet.create({
    textHead: {
        textTransform: 'uppercase',
        fontSize: 20,
        margin: 40,
        textAlign: 'center'

    }
  });
