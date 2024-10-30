import React from 'react';
import { View, Button, Image, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface ImagePickerProps {
  imagens: string[];
  setImagens: React.Dispatch<React.SetStateAction<string[]>>; // Ajuste aqui
  error?: string;
}

const ImagePickerComponent: React.FC<ImagePickerProps> = ({ imagens, setImagens, error }) => {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
    });
    if (!result.canceled) {
      const imagensValidas = result.assets.map((asset) => asset.uri).filter(Boolean) as string[];
      setImagens((prevImagens) => [...prevImagens, ...imagensValidas]); 
    }
  };

  return (
    <View>
      <Button title="Capturar Imagens" onPress={pickImage} />
      {error && <Text style={{ color: 'red' }}>{error}</Text>}
      {imagens.map((image, index) => (
        <Image key={index} source={{ uri: image }} style={{ width: 100, height: 100 }} />
      ))}
    </View>
  );
};

export default ImagePickerComponent;

