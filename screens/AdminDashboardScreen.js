import React , { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView,ActivityIndicator } from "react-native";
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import {
  Appbar,
  TextInput,
  Button,
  IconButton,
  Colors, DataTable
} from "react-native-paper";

export class AdminDashboardScreen extends Component {

  constructor(props) {
      super(props);
      var userData = props.route.params.userData
      this.state = {
        patients: [],
        userData: userData,
        loading: false
       }
    }

  renderLoading() {
    if (this.state.loading) {
      return (
        <ActivityIndicator size="large"  color="black" style={{
            position:'absolute', left:0, right:0, bottom:0, top:0 }}/>        
      )
    } else {
      return null
    }
  }  


  fetchPatients = () => {
    this.setState({ loading: true });
    let url = global.baseURL+"/native/api/v1/patients/get?company_id="+this.state.userData.company_id
    fetch(url,{
      method: 'GET',
      headers: {
        "Authorization": global.useremail,
        "Accesstoken" : global.authenticationtoken
      }
    })
      .then((response) => {return response.json()})
      .then((data) => {
        this.setState({ loading: false });
        this.setState({ patients: data })});

  }

  componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.fetchPatients();
      });
  }

  componentWillUnmount() {
    this._unsubscribe();
  } 

  deletePatient = (data) => {

    var data = data
    try {
      this.setState({ loading: true });
      let response = fetch(global.baseURL+"/native/api/v1/patient/delete",{
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": global.useremail,
          "Accesstoken" : global.authenticationtoken
        },
       body: JSON.stringify(data)
      })
      .then(response => { return response.json();})
      .then(responseData => {
          this.setState({ loading: false })
          this.fetchPatients();
      });
     
    } catch (errors) {
        alert("Error in deleting patient");
    }
  }

  
  addPatient = () => {
    this.props.navigation.navigate('AddPatient',{company_id: this.state.userData.company_id})
    } 

  editPatient = (data) => {
      this.props.navigation.navigate('AddPatient',data);
    }

  render(){
    return (
      <View>
        <View style={styles.inputView}>
          <IconButton
            icon='home-plus'
            color={Colors.purple400}
            size={30}
            onPress= {() => this.addPatient()}
          />
        </View>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Patient Name</DataTable.Title>
          <DataTable.Title numeric>Edit</DataTable.Title>
          <DataTable.Title numeric>Delete</DataTable.Title>
        </DataTable.Header>

        {
            this.state.patients.map((item, index) => (
              <DataTable.Row key = {item._id.$oid}>
                <DataTable.Cell>{item.firstname} {item.lastname}</DataTable.Cell>
                <DataTable.Cell numeric>
                  <IconButton
                    icon='account-multiple-plus'
                    color={Colors.purple500}
                    size={30}
                    onPress={() => this.editPatient(item)}
                  />
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  <IconButton
                    icon='delete'
                    color={Colors.purple500}
                    size={30}
                    onPress={() => this.deletePatient(item)}
                  />
                </DataTable.Cell>
              </DataTable.Row>
           ))


        }

        <DataTable.Pagination
          page={1}
          numberOfPages={3}
          onPageChange={(page) => {
            console.log(page);
          }}
          label='1-6 of 12'
        />
      </DataTable>
      {this.renderLoading()}
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
export default AdminDashboardScreen;
