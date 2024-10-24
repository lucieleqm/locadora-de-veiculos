import React, { useState } from "react";
import { SafeAreaView, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import styles from "../style";

export default function FormVeiculos(){
    const navigation = useNavigation()
    
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const loadImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      
        console.log(result);
      
        if (!result.canceled) {
          setSelectedImage(result.assets[0].uri);
        }
      };

    return(
        <ScrollView className="w-full flex-1 bg-slate-100 p-5">
            <SafeAreaView style={styles.formContainer}>
                <SafeAreaView style={styles.formTitle}>
                    <TouchableOpacity style={styles.boxButtonIcon}  
                                    onPress={()=>navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios" size={25} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.formTitleText}>Adicionar Veículo</Text>
                </SafeAreaView> 
            </SafeAreaView>
            <TouchableOpacity style={styles.boxImageLoad}
                                  onPress={loadImage}>
                    <Text style={styles.textImage}>Adicione imagens do veículo</Text>
                    {selectedImage && <Image source={{uri: selectedImage}} style={styles.boxImage}></Image>}
            </TouchableOpacity>
            
        </ScrollView>
    )
}