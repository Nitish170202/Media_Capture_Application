import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { firestore, storage } from '../firebase';

const CameraComponent = () => {
     const [recording, setRecording] = useState(false);
     const [save, setSave] = useState(false);
     const [facing, setFacing] = useState('back');
useCameraPermissions();
useMicrophonePermissions();
 
  const cameraRef = useRef(null);

  const startRecording = async () => {
   
      try {
        const video = await cameraRef.current.recordAsync({ maxDuration: 240 }); // 240 seconds = 4 minutes
        const fileUri = `${FileSystem.documentDirectory}${Date.now()}.mp4`;
        await FileSystem.moveAsync({
          from: video.uri,
          to: fileUri,
        });
        // setVideoUri(fileUri);
        await uploadToFirebase(fileUri , 'video'); // Upload to Firebase
      } catch (error) {
        console.error("Error recording video:", error);
      } finally{
        setRecording(true)
        setSave(true);
      }
    
  };

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const stopRecording = () => {
    if (cameraRef.current && recording) {
      cameraRef.current.stopRecording();
      setRecording(false);
      setSave(false)
    }
  };

  const uploadToFirebase = async (uri, type) => {
   
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const ref = storage.ref().child(`media/${Date.now()}.mp4`);
      const snapshot = await ref.put(blob);

      const downloadURL = await snapshot.ref.getDownloadURL();
      

      await firestore.collection('media').add({
        type : type, 
        vdourl: downloadURL,
      });

      console.log("Video uploaded successfully: ", downloadURL);
    } catch (error) {
      console.error("Error uploading video: ", error);
    } finally {
      setUploading(false);
    }
  };


  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={save ? stopRecording : startRecording}>
        <Text style={styles.text}>{recording ? 'Stop' : 'Record'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

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

export default CameraComponent;
