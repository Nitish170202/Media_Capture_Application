// import React from "react";
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import topVector from '../assets/images/topVector.png';
import { auth } from '../firebase';
const LoginScreen = () => {
//
  const navigation = useNavigation();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        navigation.navigate("Home");
      })
      .catch(error => alert(error.message))
  }

//


  return (
    <>
    <View style={styles.topImageContainer}>
        <Image
          source={topVector}
          style={styles.topImage}
        />
      </View>
    <View style={styles.container}>
    
      
      <View style={styles.helloContainer}>
        <Text style={styles.helloText}>Hello</Text>
      </View>
      <View>
        <Text style={styles.signInText}>Sign in to your account</Text>
      </View>

      <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        
      </View>
    </KeyboardAvoidingView>
    </View>
    </>
  );
};

export default LoginScreen;

//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topImageContainer: {},
  topImage: {
    width: "100%",
    height: 130,
  },
  helloContainer: {
    marginTop:20
  },
  helloText: {
    textAlign: "center",
    fontSize: 70,
    fontWeight: "500",
    color: "#262626",
  },
  signInText: {
    textAlign: "center",
    fontSize: 18,
    color:"#262626"
  },
  inputContainer: {
    
    width: 300
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    marginBottom:90,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})
//


// const styles = StyleSheet.create({
  // container: {
  //   backgroundColor: "#F5F5F5",
  //   flex: 1,
  // },
  // topImageContainer: {},
  // topImage: {
  //   width: "100%",
  //   height: 130,
  // },
  // helloContainer: {},
  // helloText: {
  //   textAlign: "center",
  //   fontSize: 70,
  //   fontWeight: "500",
  //   color: "#262626",
  // },
  // signInText: {
  //   textAlign: "center",
  //   fontSize: 18,
  //   color:"#262626"
  // },
// });