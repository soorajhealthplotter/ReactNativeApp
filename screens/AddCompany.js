import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import {
  Appbar,
  TextInput,
  Button,
  IconButton,
  Colors,
} from "react-native-paper";
import Company from "./Company";
const AddCompany = () => {
  const _goBack = () => console.log("Went back");

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content
          title='Comapany Data'
          subtitle='Acces your company here'
        />
      </Appbar.Header>
      <View style={styles.inputView}>
        <TextInput style={styles.inputBox} label='Company Name' />
        <IconButton
          icon='home-plus'
          color={Colors.purple400}
          size={30}
          onPress={() => console.log("Pressed")}
        />
      </View>

      <Company />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  inputBox: {
    flex: 1,
    margin: 10,
  },
  button: {
    marginRight: 10,
  },
});
export default AddCompany;
