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

export class AddCompany extends Component {

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
  
  navigateExecutive = () => {
      alert("Add company button clicked");
    }  

  addLocation = () => {
      console.log("AddLocation");
      this.props.navigation.navigate('AddLocation');
    }  

  companyExecutive = () => {
      console.log("CompanyExecutive");
      this.props.navigation.navigate('CompanyExecutive');
    }

  render(){
    return (
      <View>
        <View style={styles.inputView}>
          <TextInput style={styles.inputBox} label='Company Name' />
          <IconButton
            icon='home-plus'
            color={Colors.purple400}
            size={30}
            onPress= {() => this.navigateExecutive()}
          />
        </View>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Company Name</DataTable.Title>
          <DataTable.Title numeric>Location</DataTable.Title>
          <DataTable.Title numeric>Executive</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
          <DataTable.Cell>Health Guru</DataTable.Cell>
          <DataTable.Cell numeric>
            <IconButton
              icon='open-in-app'
              color={Colors.purple500}
              size={30}
              onPress={() => this.addLocation()}
            />
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <IconButton
              icon='account-multiple-plus'
              color={Colors.purple500}
              size={30}
              onPress={() => this.companyExecutive()}
            />
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Healthplotter</DataTable.Cell>
          <DataTable.Cell numeric>
            <IconButton
              icon='open-in-app'
              color={Colors.purple500}
              size={30}
              onPress={() => this.addLocation()}
            />
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <IconButton
              icon='account-multiple-plus'
              color={Colors.purple500}
              size={30}
              onPress={() => this.companyExecutive()}
            />
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>PivotXL</DataTable.Cell>
          <DataTable.Cell numeric>
            <IconButton
              icon='open-in-app'
              color={Colors.purple500}
              size={30}
              onPress={() => this.addLocation()}
            />
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <IconButton
              icon='account-multiple-plus'
              color={Colors.purple500}
              size={30}
              onPress={() => this.companyExecutive()}
            />
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Grand World</DataTable.Cell>
          <DataTable.Cell numeric>
            <IconButton
              icon='open-in-app'
              color={Colors.purple500}
              size={30}
              onPress={() => this.addLocation()}
            />
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <IconButton
              icon='account-multiple-plus'
              color={Colors.purple500}
              size={30}
              onPress={() => this.companyExecutive()}
            />
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>AstuteDoc</DataTable.Cell>
          <DataTable.Cell numeric>
            <IconButton
              icon='open-in-app'
              color={Colors.purple500}
              size={30}
              onPress={() => this.addLocation()}
            />
          </DataTable.Cell>
          <DataTable.Cell numeric>
            <IconButton
              icon='account-multiple-plus'
              color={Colors.purple500}
              size={30}
              onPress={() => this.companyExecutive()}
            />
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell>Healthplotter</DataTable.Cell>
          <DataTable.Cell numeric>
            {" "}
            <IconButton
              icon='open-in-app'
              color={Colors.purple500}
              size={30}
              onPress={() => this.addLocation()}
            />
          </DataTable.Cell>
          <DataTable.Cell numeric>
            {" "}
            <IconButton
              icon='account-multiple-plus'
              color={Colors.purple500}
              size={30}
              onPress={() => this.companyExecutive()}
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
export default AddCompany;
