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

export class SuperAdminDashboard extends Component {

  constructor(props) {
      super(props);
      var userData = props.route.params.userData
      this.state = {
        companies: [],
        companyname: '',
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


  fetchData = () => {
    this.setState({ loading: true })
    let url = global.baseURL+"/native/api/v1/companies/get"
    fetch(url,{
      method: 'GET',
      headers: {
        "Authorization": global.useremail,
        "Accesstoken" : global.authenticationtoken
      }
    })
      .then((response) => {return response.json()})
      .then((data) => {
        this.setState({ loading: false })
        this.setState({ companies: data }) });

  }

  componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.fetchData();
      });
  }

  componentWillUnmount() {
    this._unsubscribe();
  } 

  deleteCompany = (u_id) => {

    var data = {
      company_id: u_id
    };

    try {
      this.setState({ loading: true });
      let response = fetch(global.baseURL+"/native/api/v1/companies/delete",{
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
         this.setState({ loading: false });
         this.fetchData();
      });
     
    } catch (errors) {
        alert("Error in deleting company");
    }
  }

  
  addCompany = () => {

      if (this.state.companyname == ''){
        alert("Please enter a company name")
        return
      }

      var data = {
       companyname: this.state.companyname
      };

      try {
        this.setState({ loading: true })
        let response = fetch(global.baseURL+"/native/api/v1/companies/create",{
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
            this.setState({ loading: true })
            this.setState({ companyname: '' });
            this.fetchData();
        });
       
      } catch (errors) {
          alert("Error in adding a company");
      } 
    }  

  addLocation = () => {
      console.log("AddLocation");
      this.props.navigation.navigate('AddLocation');
    }  

  companyExecutive = (company_id) => {
      this.props.navigation.navigate('CompanyExecutive',{company_id: company_id});
    }

  render(){
    return (
      <View>
        <View style={styles.inputView}>
          <TextInput 
            style={styles.inputBox} 
            label='Company Name' 
            value={this.state.companyname}
            onChangeText={text => this.setState({ companyname:text })}
            mode = "outlined"

          />
          <IconButton
            icon='home-plus'
            color={Colors.purple400}
            size={30}
            onPress= {() => this.addCompany()}
          />
        </View>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Company Name</DataTable.Title>
          <DataTable.Title numeric>Location</DataTable.Title>
          <DataTable.Title numeric>Executive</DataTable.Title>
          <DataTable.Title numeric>Action</DataTable.Title>
        </DataTable.Header>

        {
            this.state.companies.map((item, index) => (
              <DataTable.Row key = {item._id.$oid}>
                <DataTable.Cell>{item.name}</DataTable.Cell>
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
                    onPress={() => this.companyExecutive(item.u_id)}
                  />
                </DataTable.Cell>
                <DataTable.Cell numeric>
                  <IconButton
                    icon='delete'
                    color={Colors.purple500}
                    size={30}
                    onPress={() => this.deleteCompany(item.u_id)}
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
export default SuperAdminDashboard;
