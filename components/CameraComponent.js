import * as ImagePicker from 'expo-image-picker';
import React, { useRef, useState } from 'react';
import { Button, Platform, Text, View } from 'react-native';

export default function CameraComponent(props) {

    const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const openCamera = async () => {
    if (!Platform.OS === 'web') {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
    } )
    if (!result.canceled) {
        setImage(result.uri);
      }}
  };

  return (
    <View>
    <Button title="Take Picture" onPress={openCamera} />
      <Text>CameraComponent {props.user.email} </Text>
    </View>
  )
}