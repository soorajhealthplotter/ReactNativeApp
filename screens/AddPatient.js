import React, { Component } from 'react'
import { StyleSheet, Text, View, Alert,Form,ActivityIndicator } from 'react-native'
import { TextInput,Button } from 'react-native-paper';

export class AddPatient extends Component {

  constructor(props) {
    super(props);
    var companyID = props.route.params.company_id

    this.state = {
      id: '',
      firstname: '',
      lastname: '',
      dob: '',
      gender: '',
      email: '',
      phonenumber: '',
      companyID: companyID,
      loading: false
      };

    if (props.route.params._id){
      this.state = {
      id: props.route.params._id,  
      firstname: props.route.params.firstname,
      lastname: props.route.params.lastname,
      dob: props.route.params.dob,
      gender: props.route.params.gender,
      email: props.route.params.email,
      phonenumber: props.route.params.phonenumber,
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
    if (this.state.firstname == ''){
      alert("Please enter a firstname")
      return
    }

    if (this.state.lastname == ''){
      alert("Please enter a lastname")
      return
    }

    if (this.state.dob == ''){
      alert("Please enter date of birth")
      return
    }

    if (this.state.gender == ''){
      alert("Please enter a gender")
      return
    }

    if (this.state.phonenumber == ''){
      alert("Please enter a phone number")
      return
    }

    if (this.state.email == ''){
      alert("Please enter a email")
      return
    }

    var data = {
      id: this.state.id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      dob: this.state.dob,
      gender: this.state.gender,
      phonenumber: this.state.phonenumber,
      email: this.state.email,
      company_id: this.state.companyID
    };

    try {
      this.setState({ loading: true });
      let response = fetch(global.baseURL+"/native/api/v1/patient/create",{
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
          this.props.navigation.navigate('AdminDashboardScreen');
      });
     
    } catch (errors) {
        alert("Error in saving patient data");
    }

  }

  render() {

    let formFields = {}

    return(
       <View style={styles.container}>
            <Text style={styles.textHead}>Add Patient</Text>
            <TextInput
              value={this.state.firstname}
              onChangeText={text => this.setState({ firstname:text })}
              label='First Name'
              style={styles.textInput}
              mode = "outlined"
            />

            <TextInput
              value={this.state.lastname}
              onChangeText={text => this.setState({ lastname:text })}
              label='Last Name'
              style={styles.textInput}
              mode = "outlined"
            />

            <TextInput
              value={this.state.dob}
              onChangeText={text => this.setState({ dob:text })}
              label='Date of Birth'
              style={styles.textInput}
              mode = "outlined"
            />

            <TextInput
              value={this.state.gender}
              onChangeText={text => this.setState({ gender:text })}
              label='Gender'
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

            <TextInput
              value={this.state.phonenumber}
              onChangeText={text => this.setState({ phonenumber:text })}
              label='Phone Number'
              style={styles.textInput}
              mode = "outlined"
            />

            <Button icon="login" mode="contained" onPress={() => this.handleSubmit()} style={styles.button} > Add Patient </Button>
            {this.renderLoading()}

       </View>
    )
  }

}

export default AddPatient

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