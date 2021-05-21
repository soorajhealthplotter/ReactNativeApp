import React, { Component } from 'react';
import { TextInput,Button } from 'react-native-paper';
import { StyleSheet, Text, View , Alert, ActivityIndicator} from 'react-native';

export default class LoginScreen extends Component {
    constructor(props) {
      super(props);
      global.baseURL = 'https://3f91b5bd395c.ngrok.io';
      this.state = {
        email: '',
        password: '',
        loading: false
      };
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

    onPressSubmitButton() {
      this.onFetchLoginRecords();
    }

    async onFetchLoginRecords() {
      this.setState({ loading: true })  
      var data = {
       email: this.state.email,
       password: this.state.password
      };
      try {
        let response = await fetch(global.baseURL+"/api/v1/sessions",{
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
         body: JSON.stringify(data)
        })
        .then(response => { return response.json();})
        .then(responseData => {
          this.setState({ loading: false })  
          global.useremail = responseData.email
          global.authenticationtoken = responseData.authentication_token
          //global.authenticationtoken = "Xx7frDtLuCNyPTHQzySc"
          if (responseData.role == 'Admin'){
            this.props.navigation.navigate('SuperAdminDashboard',{userData: responseData});
          }

          if (responseData.role == 'CompanyAdmin'){
            this.props.navigation.navigate('AdminDashboardScreen',{userData: responseData});
          }

        });
       
      } catch (errors) {
          this.setState({ loading: false })
          alert("Username and Password does not matches");
      } 
    }
      
    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.textHead}>LOGIN</Text>
            <TextInput
                style={styles.textInput}
                label="Email"
                value={this.state.email}
                onChangeText={text => this.setState({ email:text })}
                mode = "outlined"
            />
            <TextInput
                label="Password"
                value={this.state.password}
                onChangeText={text => this.setState({ password:text })}
                secureTextEntry={true}
                mode = "outlined"
            />
            <Button icon="login" mode="contained" onPress={this.onPressSubmitButton.bind(this)} style={styles.button} > Login </Button>

            {this.renderLoading()}
        </View>
        )
      }
}





const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
        margin: 'auto',
        padding: 10,
        marginTop: 40,
    },
    button: {
        borderRadius: 25,
        width: '85%',
        margin: 30,
        padding:5,
        fontSize: 25,
        color: 'red'

    },
    textHead: {
        textTransform: 'uppercase',
        fontSize: 20,
        margin: 20,
        textAlign: 'center'

    },
    textInput: {
        marginBottom: 15
    }
  });



