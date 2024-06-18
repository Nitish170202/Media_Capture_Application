import { useNavigation } from "expo-router";
import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
// import Button from '../components/Button';
import topVector from '../assets/images/topVector.png';




export default function Index() {

  const navigation = useNavigation();
  return (
    <View>
    <View style={styles.topImageContainer}>
        <Image
          source={topVector}
          style={styles.topImage}
        />
    </View>
      <View style={styles.aboutContainer}>
      <Text style={styles.mainHeader}>Welcome to home page of</Text>
      <Text style={styles.paraStyle}> Media Capture Application 😀 </Text>

      <View>
        <Image
          style={styles.imgStyle}
          source={{
            uri: "https://th.bing.com/th/id/R.35dd11bb483ce40ab79e899142439bc5?rik=OvBqH9zPGm83Qw&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2ftransparent-camera-logo%2ftransparent-camera-logo-9.png&ehk=uF7zgBmH%2bv7pV%2biuQH9GnVAGjfJZ9J%2bzmdwhYQGeSuE%3d&risl=&pid=ImgRaw&r=0?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
          }}
        />
      </View>
    </View>
   <View style={{marginTop:30, width:'70%', alignSelf:"center"}} >
   <Button  title="Log-In" onPress={() => navigation.navigate('Login')} /> 
   <View style={{margin:5}}>

   </View>
   <Button  title="Sign-Up" onPress={() => navigation.navigate('Signup')} />
   </View>
    </View>
    
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  aboutContainer: {
    display: "flex",
    alignItems: "center",
  },
  topImageContainer: {
  
  },
  topImage: {
    width: "100%",
    height: 130,
  },
  imgStyle: {
    width: 250,
    height: 180,
    borderRadius: 100,
  },
  mainHeader: {
    fontSize: 18,
    color: "#344055",
    textTransform: "uppercase",
    fontWeight: "500",
    // marginTop: 50,
    marginTop: 40,
    marginBottom: 10,
    fontFamily: "Nunito_700Bold",
  },
  paraStyle: {
    fontSize: 18,
    color: "#7d7d7d",
    paddingBottom: 30,
    fontFamily: "WorkSans_400Regular",
  },
});


