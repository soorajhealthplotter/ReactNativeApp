import React, { Component } from 'react'
import { StyleSheet, Text, View, Alert,Form,ActivityIndicator } from 'react-native'
import { TextInput,Button } from 'react-native-paper';

export class AddExecutive extends Component {

  constructor(props) {
    super(props);
    var companyID = props.route.params.company_id
    this.state = {
      id: '',
      title: '',
      username: '',
      email: '',
      companyID: companyID,
      loading: false
      };

    if (props.route.params._id){
      this.state = {
      id: props.route.params._id,  
      title: props.route.params.title,
      username: props.route.params.username,
      email: props.route.params.email,
      companyID: companyID,
      loading: false
      };
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

  handleSubmit = () => {
    if (this.state.title == ''){
      alert("Please enter a title")
      return
    }

    if (this.state.username == ''){
      alert("Please enter a username")
      return
    }

    if (this.state.email == ''){
      alert("Please enter a email")
      return
    }

    var data = {
      id: this.state.id,
      title: this.state.title,
      username: this.state.username,
      email: this.state.email,
      company_id: this.state.companyID
    };

    try {
      this.setState({ loading: true })
      let response = fetch(global.baseURL+"/native/api/v1/executive/create",{
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
          if (responseData.response == "User already exist"){
            alert(responseData.response);
            return
          }

          if (responseData.response != "User already exist"){
            alert(responseData.response);
            this.props.navigation.navigate('CompanyExecutive');
          }
          
      });
     
    } catch (errors) {
        alert("Error in saving executive");
    }

  }

  render() {

    let formFields = {}

    return(
       <View style={styles.container}>
            <Text style={styles.textHead}>Add Executives</Text>
            <TextInput
              value={this.state.title}
              onChangeText={text => this.setState({ title:text })}
              label='Title'
              style={styles.textInput}
              mode = "outlined"
            />

            <TextInput
              value={this.state.username}
              onChangeText={text => this.setState({ username:text })}
              label='User Name'
              style={styles.textInput}
              mode = "outlined"
            />

            <TextInput
              value={this.state.email}
              onChangeText={text => this.setState({ email:text })}
              label='Email'
              style={styles.textInput}
              mode = "outlined"
            />

            <Button icon="login" mode="contained" onPress={() => this.handleSubmit()} style={styles.button} > Add Executive </Button>
            {this.renderLoading()}

       </View>
    )
  }

}

export default AddExecutive

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