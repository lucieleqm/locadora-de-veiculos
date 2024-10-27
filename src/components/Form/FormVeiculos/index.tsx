import React, { useState } from "react";
import { SafeAreaView, Text, ScrollView, TouchableOpacity, Image } from "react-native";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from "expo-router";
import styles from "../style";

import FormButton from "../../Button/FormButton";
import { FormInputController } from "../../../controllers/FormInputController";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { veiculoSchema } from "../../../schemas/veiculoSchemas";

import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';

type ImageBox = {
  id: number;
  uri: string | null;
};

const FormVeiculos: React.FC = () => {

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

      interface VeiculoFormData {
          tipo_veiculo: string;
          marca_veiculo: string;
          modelo_veiculo: string;
          placa_veiculo: string;
          num_renavam: string;
          chassi: string;
          motor: string;
          cor: string;
          ano: string;
          combustivel: string;
          valor_semanal: string
        }

        const {
          control,
          handleSubmit,
          reset,
          formState: { errors }
        } = useForm({
          resolver: yupResolver(veiculoSchema),
        });
        
        function handleCadastroVeiculo(data: VeiculoFormData) {
          console.log(data);
          reset()
        }

        const [imageBoxes, setImageBoxes] = useState<ImageBox[]>([
          { id: 1, uri: null },
          { id: 2, uri: null },
          { id: 3, uri: null },
          { id: 4, uri: null },
        ]);

        const handleAddImage = async () => {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Desculpe, precisamos da permissão para acessar a galeria!');
            return;
          }
      
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });
      
          if (!result.canceled && result.assets?.[0].uri) {
            const uri = result.assets[0].uri;
            setSelectedImage(uri);
            setImageBoxes((prevBoxes) => {
              const updatedBoxes = [...prevBoxes];
              const emptyBoxIndex = updatedBoxes.findIndex((box) => !box.uri);
              if (emptyBoxIndex !== -1) updatedBoxes[emptyBoxIndex].uri = uri;
              return updatedBoxes;
            });
          }
        };

        const handleSelectImage = (uri: string | null) => {
          setSelectedImage(uri);
        };
      
        const handleDeleteImage = () => {
          if (!selectedImage) return;
          setImageBoxes((prevBoxes) => prevBoxes.map((box) => box.uri === selectedImage ? { ...box, uri: null } : box));
          setSelectedImage(null);
        };

    return(
        <ScrollView className="w-full flex-1 bg-slate-100 p-5">
            <SafeAreaView style={[styles.formContainer]}>
                <SafeAreaView style={styles.formTitle}>
                    <TouchableOpacity style={styles.boxButtonIcon}  
                                    onPress={()=>navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios" size={25} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.formTitleText}>Adicionar Veículo</Text>
                </SafeAreaView>

                <TouchableOpacity style={styles.boxImageLoad}
                              onPress={handleAddImage}>
                    {selectedImage ? (  
                      <Image source={{uri: selectedImage}} style={styles.boxImage}></Image>
                    ) : (
                      <Text style={styles.textImage}>Adicionar imagens do veículo</Text>
                    )}
                </TouchableOpacity>

              <SafeAreaView style={styles.boxImageSaveLoad}>
                {imageBoxes.map((box) => (
                  <TouchableOpacity key={box.id} style={styles.boxImageSave} 
                                    onPress={() => handleSelectImage(box.uri)}>
                    {box.uri ? (
                      <Image source={{ uri: box.uri }} style={styles.smallImage}></Image>
                    ) : (
                      <Text>Vazio</Text>
                    )
                    }

                  </TouchableOpacity>
                ))
                }
                <TouchableOpacity style={styles.boxImageSave} onPress={handleDeleteImage}>
                  <Ionicons name="trash-bin-outline" size={37} color="black" />
                </TouchableOpacity>
              </SafeAreaView>

              <FormInputController
                    control={control}
                    name={"tipo_veiculo"}
                    label={"Tipo do veículo"}
                    errors={errors}
                    placeholder="Motocicleta"
                    />
              <FormInputController
                    control={control}
                    name={"marca_veiculo"}
                    label={"Marca do veículo"}
                    errors={errors}
                    placeholder="Honda"
                    />
              <FormInputController
                    control={control}
                    name={"modelo_veiculo"}
                    label={"Modelo do veículo"}
                    errors={errors}
                    placeholder="Start 160"
                    />
              <FormInputController
                    control={control}
                    name={"num_renavam"}
                    label={"Número renavam"}
                    errors={errors}
                    placeholder="12345678901"
                    />
              <FormInputController
                    control={control}
                    name={"chassi"}
                    label={"Chassi"}
                    errors={errors}
                    placeholder="9BWZZZ377VT004251"
                    />
              <FormInputController
                    control={control}
                    name={"motor"}
                    label={"Motor"}
                    errors={errors}
                    placeholder="ABC123456789"
                    />
              <FormInputController
                    control={control}
                    name={"cor"}
                    label={"Cor do veículo"}
                    errors={errors}
                    placeholder="Vermelho"
                    />
              <FormInputController
                    control={control}
                    name={"ano"}
                    label={"Ano"}
                    errors={errors}
                    placeholder="2018"
                    />
              <FormInputController
                    control={control}
                    name={"combustivel"}
                    label={"Combustível"}
                    errors={errors}
                    placeholder="Gasolina comum"
                    />
              <FormInputController
                    control={control}
                    name={"valor_semanal"}
                    label={"Valor semanal"}
                    errors={errors}
                    placeholder="R$ 100,00"
                    />

              <FormButton 
                    label="Adicionar"
                    onPress={handleSubmit(handleCadastroVeiculo)}>
              </FormButton>

            </SafeAreaView>
        </ScrollView>
    )
};

export default FormVeiculos;