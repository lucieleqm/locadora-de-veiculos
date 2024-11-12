import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Text,
  SafeAreaView
} from "react-native";
import { useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { veiculoSchema } from "../../../schemas/veiculoSchemas";
import { FormInputController } from "../../../controllers/FormInputController";
import { FormPickerController } from "../../../controllers/FormPickerController";
import FormButton from "../../Button/FormButton";
import { useNavigation } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import styles from "../style";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import api from "../../../services/api";

// Interface para o tipo de dados do formulário
interface VeiculoFormData {
  tipo: number;
  placa: string;
  renavam: string;
  chassi: string;
  motor: string;
  km: number;
  cor: number;
  ano: string;
  valor: string;
  modelo: number;
  combustivel: number;
  marca: number;
}

export function FormVeiculo() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<VeiculoFormData>({
    resolver: yupResolver(veiculoSchema),
  });

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [imagens, setImagens] = useState<{ uri: string }[]>([]);
  const [tipos, setTipos] = useState<any[]>([]);
  const [cores, setCores] = useState<any[]>([]);
  const [marcas, setMarcas] = useState<any[]>([]);
  const [modelos, setModelos] = useState<any[]>([]);
  const [combustiveis, setCombustiveis] = useState<any[]>([]);

  // Observa os valores selecionados nos pickers de tipo e marca
  const tipoSelecionado = watch("tipo");
  const marcaSelecionada = watch("marca");

  // Função para abrir a câmera e tirar uma foto
  const takePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão de câmera", "Precisamos de permissão para acessar a câmera.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const { uri } = result.assets[0]; // Acessa a URI da imagem
      setImagens((prevImagens) => [...prevImagens, { uri }]);
    } else {
      console.log("Operação cancelada");
    }
  };

  // Carrega os valores iniciais de tipos e combustiveis
  useEffect(() => {
    async function fetchData() {
      try {
        const [tiposResp, coresResp, combustiveisResp] = await Promise.all([
          api.get(`/tipos`),
          api.get(`/cores`),
          api.get("/combustiveis/select"),
        ]);
        setTipos(tiposResp.data);
        setCores(coresResp.data);
        setCombustiveis(combustiveisResp.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    fetchData();
  }, []);
   
  // Filtra as marcas com base no tipo selecionado
  useEffect(() => {
    if (tipoSelecionado) {
      fetchMarcas(tipoSelecionado);
    } else {
      setMarcas([]);
      setModelos([]); 
    }
  }, [tipoSelecionado]);

  // Filtra os modelos com base na marca selecionada
  useEffect(() => {
    if (marcaSelecionada) {
      fetchModelos(marcaSelecionada);
    } else {
      setModelos([]); // Limpa os modelos se nenhuma marca for selecionada
    }
  }, [marcaSelecionada]);

  // Função para buscar as marcas com base no tipo selecionado
  async function fetchMarcas(tipoId: number) {
    try {
      const response = await api.get(`/tipos/${tipoId}/marcas`);
      setMarcas(response.data);
    } catch (error) {
      console.error("Erro ao buscar marcas:", error);
    }
  }
  
  // Função para buscar os modelos com base na marca selecionado
  async function fetchModelos(marcaId: number) {
    try {
      const response = await api.get(`/marcas/${marcaId}/modelos`);
      setModelos(response.data);
    } catch (error) {
      console.error("Erro ao buscar modelos:", error);
    }
  }

  const pickImage = async () => {
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,

      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    if (!canceled && assets) {
      setImagens([{ uri: assets[0].uri }]);
    } else {
      console.log("Operação cancelada");
    }
  };

  // Função do botão de Cadastrar
  async function cadastrarVeiculo(dados: VeiculoFormData) {
    const formData = new FormData();

    formData.append("id_tipo_veiculo", dados.tipo.toString());
    formData.append("placa", dados.placa);
    formData.append("renavam", dados.renavam);
    formData.append("chassi", dados.chassi);
    formData.append("motor", dados.motor);
    formData.append("km", dados.km.toString());
    formData.append("id_cor", dados.cor.toString());
    formData.append("ano", dados.ano);
    formData.append("valor", dados.valor.replace("R$ ", "").replace(",", ".").trim());
    formData.append("id_modelo", dados.modelo.toString());
    formData.append("id_combustivel", dados.combustivel.toString());

    imagens.forEach((imagem, index) => {
      const filename = imagem.uri.split("/").pop();
      const type = `image/${filename?.split(".").pop()}`;

      formData.append("imagens", {
        uri: imagem.uri,
        name: filename,
        type: type,
      } as any);
    });

    try {
      const response = await api.post("/veiculos/insert", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        Alert.alert("Sucesso", "Veículo cadastrado com sucesso!");
        navigation.goBack();
      } else {
        Alert.alert("Erro", "Não foi possível cadastrar o veículo.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar veículo:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao cadastrar o veículo. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  }

  const deleteImage = () => {
    setImagens([]); // Limpa o estado de imagens
  };

  return (
    <ScrollView>
      <View style={styles.formContainer}>
      <SafeAreaView style={styles.boxImageButton}>
      <SafeAreaView style={styles.boxImageLoad}>
          {/* Verifica se há imagens, caso contrário exibe a mensagem */}
          {imagens.length === 0 ? (
            <Text style={{ position: 'absolute', fontSize: 16 }}>Sem imagem</Text>
          ) : (
            imagens.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image.uri }}
                style={styles.boxImage}
              />
            ))
          )}
      </SafeAreaView>
      <SafeAreaView style={styles.boxImageSaveLoad}>
          <TouchableOpacity onPress={pickImage}>
              <SafeAreaView style={styles.boxImageSave}>
                <MaterialIcons name="add-photo-alternate" size={35} color="black" />
              </SafeAreaView>
          </TouchableOpacity>
          <TouchableOpacity onPress={takePicture}>
              <SafeAreaView style={styles.boxImageSave}>
                  <MaterialIcons name="add-a-photo" size={30} color="black" />
              </SafeAreaView>
          </TouchableOpacity>
          <TouchableOpacity onPress={deleteImage}>
              <SafeAreaView style={styles.boxImageSave}>
                <Ionicons name="trash-bin-outline" size={37} color="black" />
              </SafeAreaView>
          </TouchableOpacity>
      </SafeAreaView>
      </SafeAreaView>
        {/* Picker para Tipo de Veículo */}
        <FormPickerController
          control={control}
          name="tipo"
          label="Tipo *"
          placeholder="Selecione o Tipo"
          errors={errors}
          options={tipos.map((tipo) => ({
            key: tipo.id,
            label: tipo.tipo,
            value: tipo.id,
          }))}
        />
        {/* Picker para Marca */}
        <FormPickerController
          control={control}
          name="marca"
          label="Marca *"
          placeholder="Selecione a Marca"
          errors={errors}
          endpoint="/marcas/criar"
          additionalData={{ tipoId: tipoSelecionado }}
          setOptions={setMarcas}
          options={marcas.map((marca) => ({
            label: marca.nome,
            value: marca.id,
          }))}
        />
        {/* Picker para Modelo */}
        <FormPickerController
          control={control}
          name="modelo"
          label="Modelo *"
          placeholder="Selecione o Modelo"
          errors={errors}
          endpoint="/modelos/criar"
          additionalData={{ marcaId: marcaSelecionada }}
          setOptions={setModelos}
          options={modelos.map((modelo) => ({
            key: modelo.id,
            label: modelo.nome,
            value: modelo.id,
          }))}
        />
        {/* Picker para Cor */}
        <FormPickerController
          control={control}
          name="cor"
          label="Cor *"
          placeholder="Selecione a Cor"
          errors={errors}
          options={cores.map((cor) => ({
            key: cor.id,
            label: cor.cor,
            value: cor.id,
          }))}
        />
        {/* Picker para Combustível */}
        <FormPickerController
          control={control}
          label="Combustível *"
          name="combustivel"
          placeholder="Selecione o Combustível"
          errors={errors}
          options={combustiveis.map((combustivel) => ({
            key: combustivel.id,
            label: combustivel.tipo,
            value: combustivel.id,
          }))}
        />
        <FormInputController
          control={control}
          name="ano"
          label="Ano *"
          errors={errors}
          keyboardType="numeric"
          placeholder="Ex.: 2020"
        />
        <FormInputController
          control={control}
          name="placa"
          label="Placa *"
          errors={errors}
          placeholder="Ex.: AAA0A00"
        />
        <FormInputController
          control={control}
          name="renavam"
          label="Renavam *"
          errors={errors}
          placeholder="Ex.: 12345678901"
        />
        <FormInputController
          control={control}
          name="chassi"
          label="Chassi *"
          errors={errors}
          placeholder="Ex.: 9BWZZZ377VT004251"
        />
        <FormInputController
          control={control}
          name="motor"
          label="Motor *"
          errors={errors}
          placeholder="Ex.: ABC123456789"
        />
        <FormInputController
          control={control}
          name="km"
          label="Km *"
          errors={errors}
          keyboardType="numeric"
          placeholder="Ex.: 100"
        />
        <FormInputController
          control={control}
          name="valor"
          label="Valor de Locação *"
          errors={errors}
          keyboardType="numeric"
          placeholder="Ex.: R$ 150,00"
          maskType="money"
          maskOptions={{
            precision: 2, // Duas casas decimais
            separator: ",", // Separador de casas decimais
            delimiter: ".", // Delimitador de milhares
            unit: "R$ ", // Símbolo da moeda
            suffixUnit: "", // Sufixo (pode deixar vazio)
          }}
        />

        <FormButton
          label="Salvar"
          onPress={handleSubmit(cadastrarVeiculo)}
          disabled={loading}
        />
      </View>
    </ScrollView>
  );
}
