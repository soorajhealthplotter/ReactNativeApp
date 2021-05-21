import React , { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import {
  Appbar,
  TextInput,
  Button,
  IconButton,
  Colors, DataTable
} from "react-native-paper";


export class AddLocation extends Component {

  constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
      };
    }

  _goBack() {
      console.log("Went back");
    }
  
  addLocation = () => {
      alert("Add Location button clicked");
    }  

  deleteLocation = () => {
      alert("delete Location clicked");
    }
  
  showExecutive = () => {
      alert("showExecutive button clicked");
    }  

  render(){
    return (
      <View>
        <View style={styles.inputView}>
          <TextInput style={styles.inputBox} label='Location' />
          <IconButton
            icon='home-plus'
            color={Colors.purple400}
            size={30}
            onPress= {() => this.addLocation()}
          />
        </View>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Location</DataTable.Title>
          <DataTable.Title numeric>Delete</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>Saibaba Colony</DataTable.Cell>
          <DataTable.Cell numeric>
            <IconButton
              icon='delete-circle-outline'
              color={Colors.purple500}
              size={30}
              onPress={() => this.deleteLocation()}
            />
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>R S Puram</DataTable.Cell>
          <DataTable.Cell numeric>
            <IconButton
              icon='delete-circle-outline'
              color={Colors.purple500}
              size={30}
              onPress={() => this.deleteLocation()}
            />
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Ukkadam</DataTable.Cell>
          <DataTable.Cell numeric>
            <IconButton
              icon='delete-circle-outline'
              color={Colors.purple500}
              size={30}
              onPress={() => this.deleteLocation()}
            />
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Gandhipuram</DataTable.Cell>
          <DataTable.Cell numeric>
            <IconButton
              icon='delete-circle-outline'
              color={Colors.purple500}
              size={30}
              onPress={() => this.deleteLocation()}
            />
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Pagination
          page={1}
          numberOfPages={3}
          onPageChange={(page) => {
            console.log(page);
          }}
          label='1-6 of 12'
        />
      </DataTable>
      </View>
    );
  }
}

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
export default AddLocation;
