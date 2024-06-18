
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import topVector from '../assets/images/topVector.png';
import { auth } from '../firebase';

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        alert("Successfully signup and login ");
        navigation.replace("Home")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
        alert("Successfully signup and login ")
      })
      .catch(error => alert(error.message))
  }


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
        <Text style={styles.signInText}>Welcome to Sign-Up Page</Text>
      </View>

      <View style={styles.topImageContainer}>
        <Image
          style={styles.imgStyle}
          source={{
            uri: "https://th.bing.com/th/id/R.35dd11bb483ce40ab79e899142439bc5?rik=OvBqH9zPGm83Qw&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2ftransparent-camera-logo%2ftransparent-camera-logo-9.png&ehk=uF7zgBmH%2bv7pV%2biuQH9GnVAGjfJZ9J%2bzmdwhYQGeSuE%3d&risl=&pid=ImgRaw&r=0?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          }}
        />
      </View>

      <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>

    </View>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgStyle: {
    width: 250,
    height: 180,
    borderRadius: 100,
  },
  inputContainer: {
    marginTop:-110,
    width: '100%'
  },
  input: {
    backgroundColor: 'white',
    margin:10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,

  },
  buttonContainer: {
    width: '60%',
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
  topImageContainer: {
    marginTop:10,
  },
  topImage: {
    width: "100%",
    height: 130,
  },
  helloContainer: {
    marginTop:-20,
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
});