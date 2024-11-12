import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Text,
  View,
  Button,
  Image,
} from "react-native";
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate, getToday } from "react-native-modern-datepicker";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "expo-router";
import api from "../../../services/api";
import { FormInputController } from "../../../controllers/FormInputController";
import { locacaoSchema } from "../../../schemas/locacaoShemas";
import styles from "../style";
import FormButton from "../../Button/FormButton";
import * as ImagePicker from "expo-image-picker";
import { ScrollView } from "react-native-gesture-handler";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

interface LocacaoFormData {
  cpfCliente: string;
  caucao: string;
  valor: string;
  km: number;
  dtInicio: string;
  dtFinal: string;
}
interface FormLocacaoProps { 
  veiculoId: number; 
}

type ImageItem = {
  uri: string;
  id: number;
};

export function FormLocacao({veiculoId}: FormLocacaoProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LocacaoFormData>({
    resolver: yupResolver(locacaoSchema),
  });

  // variáveis relacionadas ao DatePicker
  const [openInicio, setOpenInicio] = useState(false);
  const [openFinal, setOpenFinal] = useState(false);

  // variáveis relacionadas ao ImagePicker
  const [imagens, setImagens] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const today = new Date();
  today.setDate(today.getDate() + 1);
  const startDate = getFormatedDate(today);

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  // Função para selecionar imagens
  const pickImage = async () => {
    if (imagens.length >= 5) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const newImage: ImageItem = {
        uri: result.assets[0].uri,
        id: new Date().getTime(),
      };
      const updatedImages = [...imagens, newImage];
      setImagens(updatedImages);
      setSelectedImage(newImage.uri);
    }
  };

  // Função para selecionar uma imagem ao clicar em um quadradinho
  const handleSelectImage = (uri: string) => {
    setSelectedImage(uri);
  };

  const handleDeleteSelectedImage = () => {
    if (!selectedImage) return;

    const updatedImages = imagens.filter((image) => image.uri !== selectedImage);
    setImagens(updatedImages);

    // Atualizar a imagem selecionada após a exclusão
    if (updatedImages.length > 0) {
      setSelectedImage(updatedImages[0].uri);
    } else {
      setSelectedImage(null);
    }
  };

  const takePhoto = async () => {
    if (imagens.length >= 5) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const newImage: ImageItem = {
        uri: result.assets[0].uri,
        id: new Date().getTime(),
      };
      const updatedImages = [...imagens, newImage];
      setImagens(updatedImages);
      setSelectedImage(newImage.uri);
    }
  }

  // Função do botão de cadastro do Formulário
  async function cadastrarLocacao(dados: LocacaoFormData) {
    try {
      const clienteResponse = await api.get(
        `/clientes/buscar-cpf/${dados.cpfCliente}`
      );

      const formData = new FormData();
      formData.append("id_cliente", clienteResponse.data.id);
      formData.append("caucao", dados.caucao.replace("R$ ", "").replace(",", ".").trim());
      formData.append("valor", dados.valor.replace("R$ ", "").replace(",", ".").trim());
      formData.append("km", dados.km.toString());
      formData.append("id_veiculo", veiculoId.toString());
      formData.append("dt_inicio", dados.dtInicio);
      formData.append("dt_final", dados.dtFinal);

      console.log("FormData Enviado:", formData);

      imagens.forEach((imagem, index) => {
        const filename = imagem.uri.split("/").pop();
        const type = `image/${filename?.split(".").pop()}`;

        formData.append("imagens", {
          uri: imagem.uri,
          name: filename,
          type: type,
        } as any);
      });

      const response = await api.post("/locacoes/cadastrar", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (response.status === 201) {
        Alert.alert("Sucesso", "Locação cadastrada com sucesso!");
        navigation.goBack();
      } else {
        Alert.alert("Erro", "Não foi possível cadastrar a locação.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar locação:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao cadastrar a locação. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.formContainer}>
      <ScrollView>
      <View style={styles.boxImageButton}>
        <SafeAreaView style={styles.boxImageLoad}>
            {/* Verifica se há imagens, caso contrário exibe a mensagem */}
            {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.boxImage} />
        ) : (
          <Text style={styles.textImage}>Imagem Principal</Text>
        )}
        </SafeAreaView>

        {/* Lista de quadradinhos abaixo da imagem principal */}
      <View style={styles.boxImageSaveLoad}>
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => imagens[index] && handleSelectImage(imagens[index].uri)}
              style={styles.boxImageSave}
              disabled={!imagens[index]} // Impede cliques em quadradinhos vazios
            >
              {imagens[index] ? (
                <Image source={{ uri: imagens[index].uri }} style={styles.boxImage} />
              ) : (
                <Text style={styles.textImage}>+</Text>
              )}
            </TouchableOpacity>
          ))}
      </View>

          {/*Botão para capturar as iamgens*/}
          <SafeAreaView style={styles.boxImageSaveLoad}>
          <TouchableOpacity onPress={pickImage}>
              <SafeAreaView style={styles.boxImageSave}>
                <MaterialIcons name="add-photo-alternate" size={35} color="black" />
              </SafeAreaView>
          </TouchableOpacity>
          <TouchableOpacity onPress={takePhoto}>
              <SafeAreaView style={styles.boxImageSave}>
                  <MaterialIcons name="add-a-photo" size={30} color="black" />
              </SafeAreaView>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDeleteSelectedImage}>
              <SafeAreaView style={styles.boxImageSave}>
                <Ionicons name="trash-bin-outline" size={37} color="black" />
              </SafeAreaView>
          </TouchableOpacity>
          </SafeAreaView>
        </View>
        <FormInputController
          control={control}
          name="cpfCliente"
          label="CPF do Locatário *"
          errors={errors}
          keyboardType="numeric"
          placeholder="000.000.000-00"
          maskType="cpf"
        />
        <FormInputController
          control={control}
          name="caucao"
          label="Caução *"
          errors={errors}
          keyboardType="numeric"
          placeholder="R$ 100,00"
          maskType="money"
          maskOptions={{
            precision: 2,
            separator: ",", 
            delimiter: ".", 
            unit: "R$ ",
            suffixUnit: "", 
          }}
        />
        <FormInputController
          control={control}
          name="valor"
          label="Valor Semanal *"
          errors={errors}
          keyboardType="numeric"
          placeholder="R$ 100,00"
          maskType="money"
          maskOptions={{
            precision: 2,
            separator: ",", 
            delimiter: ".", 
            unit: "R$ ",
            suffixUnit: "", 
          }}
        />
        <FormInputController
          control={control}
          name="km"
          label="Km Rodados"
          errors={errors}
          keyboardType="numeric"
          placeholder="0"
        />
        <Controller
          control={control}
          name="dtInicio"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <TouchableOpacity onPress={() => setOpenInicio(true)}>
                <Text>{value || "Selecionar Data de Início"}</Text>
              </TouchableOpacity>

              {error && <Text style={{ color: "red" }}>{error.message}</Text>}

              <Modal
                animationType="slide"
                transparent={true}
                visible={openInicio}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <DatePicker
                      mode="calendar"
                      selected={value}
                      minimumDate={startDate}
                      onDateChange={(date) => {
                        console.log(typeof date);
                        const formattedDate = date.replace(/\//g, "-");
                        console.log(`Data de Início Selecionada: ${date}`);
                        onChange(date);
                        setOpenInicio(false);
                      }}
                      locale="pt-br"
                    />
                    <TouchableOpacity onPress={() => setOpenInicio(false)}>
                      <Text>Fechar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </>
          )}
        />

        <Controller
          control={control}
          name="dtFinal"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <TouchableOpacity onPress={() => setOpenFinal(true)}>
                <Text>{value || "Selecionar Data de Término"}</Text>
              </TouchableOpacity>

              {error && <Text style={{ color: "red" }}>{error.message}</Text>}

              <Modal
                animationType="slide"
                transparent={true}
                visible={openFinal}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <DatePicker
                      mode="calendar"
                      selected={value}
                      minimumDate={startDate}
                      onDateChange={(date) => {
                        const formattedDate = date.replace(/\//g, "-");
                        onChange(date);
                        setOpenFinal(false);
                      }}
                      locale="pt-br"
                    />
                    <TouchableOpacity onPress={() => setOpenFinal(false)}>
                      <Text>Fechar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </>
          )}
        />

        <FormButton
          label="Salvar"
          onPress={handleSubmit(cadastrarLocacao)}
          disabled={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
