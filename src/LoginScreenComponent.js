import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import firebase from 'firebase';
//import Toast from 'react-native-simple-toast';

const LoginScreenComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <Text> Email: </Text>
      <TextInput
        style={styles.textInputStyle}
        autoCorrect={false}
        autoCapitalize="none"
        value={email}
        onChangeText={(currentText) => setEmail(currentText)}
      />

      <Text> Password </Text>
      <TextInput
        style={styles.textInputStyle}
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry={true}
        value={password}
        onChangeText={(currentText) => setPassword(currentText)}
      />

      <View style={styles.buttonStyle}>
        <Button
          title={'Log In'}
          onPress={() =>
            firebase
              .auth()
              .signInWithEmailAndPassword(email, password)
              .catch(() => {
                console.log('Login Error');
                //Toast.show('Login Error', Toast.SHORT);
              })
          }
        />
      </View>

      <View style={styles.buttonStyle}>
        <Button
          title={'Sign Up'}
          onPress={() => {
            firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                setEmail('');
                setPassword('');
                console.log('Signup Successful');
                //Toast.show('SignUp Successful', Toast.SHORT);
              })
              .catch(() => {
                console.log('Some error happened');
                //Toast.show('Signup Failed', Toast.SHORT);
              });
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    width: 300,
    borderWidth: 5,
    margin: 10,
    padding: 10,
    borderRadius: 3,
  },
  buttonStyle: {
    margin: 10,
  },
});

export default LoginScreenComponent;
