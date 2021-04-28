import React from 'react'
import { View,Text,StyleSheet } from 'react-native'
import { TextInput,Button } from 'react-native-paper';

const LoginScreen = () => {
    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');
    return (
        <View style={styles.container}>
            <Text style={styles.textHead}>HealthGuru MobileApp</Text>
            <TextInput
                style={styles.textInput}
                label="Email"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                label="Password"
                value={pass}
                onChangeText={text => setPass(text)}
            />
            <Button icon="login" mode="contained" onPress={() => console.log('Pressed')} style={styles.button} > Login </Button>


        </View>

        
    )
}

const styles = StyleSheet.create({
    container: {
      
      backgroundColor: '#fff',
        margin: 'auto',
        padding: 24,
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

export default LoginScreen
