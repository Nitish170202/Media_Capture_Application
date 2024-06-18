// screens/HomeScreen.js (add logout button)
import { useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from 'react';
import { Button, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
// import Button from '../components/Button';
import { auth, firebase, firestore } from '../firebase';
import { usePermissions } from '../hooks/usePermissions';

export default function HomeScreen() {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const mediaCollection = await firestore.collection('media').get();
      const mediaData = mediaCollection.docs.map(doc => doc.data());

      const imageList = mediaData.filter(media => media.imgurl);
      const videoList = mediaData.filter(media => media.vdourl);

      setImages(imageList);
      setVideos(videoList);
    } catch (error) {
      console.error("Error fetching media:", error);
    }
  };


  // const renderImage = ({ item }) => (
  //   // console.log('url of images : ',item.imgurl)
  // //  return( <Image source={{ uri: item.imgurl }} style={styles.media} />)
  // );

  const renderVideo = ({ item }) => (
    <Video
      source={{ uri: item.vdourl }}
      rate={1.0}
      volume={1.0}
      isMuted={false}
      resizeMode="cover"
      shouldPlay
      style={styles.media}
      useNativeControls
    />
  );
 

 
  // const [type, setType] = useState(Camera.Constants.Type.back);
  // const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  const createMediaCollection = async () => {
    try {
      // Check if 'media' collection already exists
      const mediaRef = firebase.firestore().collection('media');
      const snapshot = await mediaRef.get();
  
      if (snapshot.empty) {
        // 'media' collection does not exist, create it
        await mediaRef.doc().set({
          url : 'my_url_of_image',
          type : 'photos'

        });
  
        console.log('Created new collection: media');
      } else {
        console.log('Collection already exists: media');
      }
    } catch (error) {
      console.error('Error creating collection: ', error);
    }
  };
  
  // Usage example
  createMediaCollection();
  usePermissions();
  const [media, setMedia] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMedia = async () => {
      const user = firebase.currentUser;
      console.log("username",auth.currentUser)
      if (!user) return;


      // setMedia([...photos, ...videos]);
    };

    fetchMedia();
  }, []);

  const takePicture = async () => {
    navigation.navigate("ImageScreen");
  };

  const makeVideo = async () => {
    navigation.navigate("VideoScreen");
  };



  const handleLogout = async () => {
    await auth.signOut();
    navigation.replace('Login');
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Button title="Take Picture" onPress={takePicture} />
      <View></View>
      <Button title="Make Video" onPress={makeVideo} />

      
      <View>
      <Text style={styles.heading}>Images</Text>
      <FlatList
        data={images}
        keyExtractor={(item) => item.imgurl}
        renderItem={({ item }) => (
          <Image source={{uri:item.imgurl}} style={styles.media} />
        )}
      />
      <Text style={styles.heading}>Videos</Text>
      <FlatList
        data={videos}
        renderItem={renderVideo}
        keyExtractor={(item) => item.toString()}
      />
      </View>
    



      
      <View style={{flex:1 , justifyContent:'flex-end'}}><Button title="Logout" onPress={handleLogout} /></View>
    </View>
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  
  controls: {
    flex: 0.5,
  },
  button: {
    height: 40,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  media: {
    width: 300,
    height: 600,
    marginRight: 10,
    borderRadius: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#E9730F',
    marginLeft: 10,
  },
  camera: {
    flex: 5,
    borderRadius: 20,
  },
  topControls: {
    flex: 1,
  },
  media: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
});
