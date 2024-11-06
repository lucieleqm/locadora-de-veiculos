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

interface LocacaoFormData {
  cpfCliente: string;
  placaVeiculo: string;
  dtInicio: string;
  dtFinal: string;
}

export function FormLocacao() {
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

  const today = new Date();
  today.setDate(today.getDate() + 1);
  const startDate = getFormatedDate(today);

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  // Função para selecionar imagens
  const pickImage = async () => {
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      //allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!canceled && assets) {
      setImagens((prevImagens) => [...prevImagens, assets[0]]);
    } else {
      console.log("Operação cancelada");
    }
  };

  // Função do botão de cadastro do Formulário
  async function cadastrarLocacao(dados: LocacaoFormData) {
    try {
      const veiculoResponse = await api.get(
        `/veiculos/buscarPorPlaca/${dados.placaVeiculo}`
      );
      const clienteResponse = await api.get(
        `/clientes/buscarPorCpf/${dados.cpfCliente}`
      );

      const formData = new FormData();
      formData.append("id_cliente", clienteResponse.data.id);
      formData.append("id_veiculo", veiculoResponse.data.id);
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

      {/*Botão para capturar as iamgens*/}
      <Button title="Capturar Imagens" onPress={pickImage} />
      {imagens.map((image, index) => (
        <Image
          key={index}
          source={{ uri: image.uri }}
          style={styles.boxImageLoad}
        />
      ))}
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
        name="placaVeiculo"
        label="Placa do Veículo *"
        errors={errors}
        placeholder="AAA0A00"
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

            <Modal animationType="slide" transparent={true} visible={openFinal}>
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
    </SafeAreaView>
  );
}
