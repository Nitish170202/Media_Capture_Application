import { CameraView, useCameraPermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import { useRef, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { firestore, storage } from '../firebase';

export default function ImageScreen() {
  const cameraRef = useRef();
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        {/* <Button onPress={requestPermission} title="grant permission" /> */}
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }
  async function captureImg(){
    try{
      const photo = await cameraRef.current.takePictureAsync();
        const fileUri = `${FileSystem.documentDirectory}${Date.now()}.jpg`;
        await FileSystem.moveAsync({
          from: photo.uri,
          to: fileUri,
        });
        console.log(fileUri)
        await uploadData(fileUri, 'photo');
      
    }catch (error) {
      console.error("Error taking picture:", error);
    }
  }

  const uploadData = async(uri , type)=>{
      
      try {
        const response = await fetch(uri);
        const blob = await response.blob();
  
        const ref = storage.ref().child(`media/${Date.now()}`);
        const snapshot = await ref.put(blob);
  
        const downloadURL = await snapshot.ref.getDownloadURL();
  
        await firestore.collection('media').add({
          type : 'photo',
          imgurl: downloadURL,
        });
  
        console.log("Image uploaded successfully: ", uri);
      } catch (error) {
        console.error("Error uploading image: ", error);
      } 
    };
  

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={captureImg}>
            <Button title='Capture' onPress={captureImg}></Button>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});