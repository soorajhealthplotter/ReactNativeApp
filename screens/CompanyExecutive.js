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

import AddExecutive from "./AddExecutive"


export class CompanyExecutive extends Component {

  constructor(props) {
      super(props);
      var companyID = props.route.params.company_id
      this.state = {
        executives: [],
        companyID: companyID,
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


  fetchExecutives = () => {
    this.setState({ loading: true });
    let url = global.baseURL+"/native/api/v1/executive/get?company_id="+this.state.companyID
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
        this.setState({ executives: data }) });

  }

  componentDidMount(){
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.fetchExecutives();
      });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }
  
  addExecutive = () => {
      this.props.navigation.navigate("AddExecutive",{company_id: this.state.companyID});
    }  

  deleteExecutive = (data) => {
      var data = data

      try {
        this.setState({ loading: true });
        let response = fetch(global.baseURL+"/native/api/v1/executive/delete",{
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
            this.fetchExecutives();
        });
       
      } catch (errors) {
          alert("Error in deleting executive");
      }

    }
  
  editExecutive = (data) => {
      this.props.navigation.navigate("AddExecutive", data);
    }  

  render(){
    return (
      <View>
        <View style={styles.inputView}>
          <IconButton
            icon='account-multiple-plus'
            color={Colors.purple400}
            size={30}
            onPress= {() => this.addExecutive()}
          />
        </View>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Exective</DataTable.Title>
          <DataTable.Title numeric>Edit</DataTable.Title>
          <DataTable.Title numeric>Delete</DataTable.Title>
        </DataTable.Header>

        {
            this.state.executives.map((item, index) => (
              <DataTable.Row key = {item._id.$oid}>
                <DataTable.Cell>{item.username}</DataTable.Cell>
                <DataTable.Cell numeric>
                  <IconButton
                    icon='file-document-edit-outline'
                    color={Colors.purple500}
                    size={30}
                    onPress={() => this.editExecutive(item)}
                  />
                </DataTable.Cell>

                <DataTable.Cell numeric>
                  <IconButton
                    icon='delete-circle-outline'
                    color={Colors.purple500}
                    size={30}
                    onPress={() => this.deleteExecutive(item)}
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
  textHead: {
        textTransform: 'uppercase',
        fontSize: 20,
        margin: 20,
        textAlign: 'center'

    },
});
export default CompanyExecutive;
