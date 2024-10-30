import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  Button,
  Image, 
  Alert,
  Switch,
} from "react-native";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { veiculoSchema } from "../../../schemas/veiculoSchemas";
import { FormInputController } from "../../../controllers/FormInputController";
import FormButton from "../../Button/FormButton";
import { useNavigation } from "expo-router";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import styles from "../style";

// Interface para o tipo de dados do formulário
interface VeiculoFormData {
  tipo: string;
  placa: string;
  renavam: string;
  chassi: string;
  motor: string;
  cor: string;
  ano: string;
  valor: number;
  status: boolean;
  modelo: number;
  combustivel: number;
}

export function FormVeiculo() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<VeiculoFormData>({
    resolver: yupResolver(veiculoSchema),
  });

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [imagens, setImagens] = useState<any[]>([]);
  const [marcas, setMarcas] = useState<any[]>([]);
  const [modelos, setModelos] = useState<any[]>([]);
  const [combustiveis, setCombustiveis] = useState<any[]>([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState<number | null>(null);
  const [modeloSelecionado, setModeloSelecionado] = useState<number | null>(null);
  const [combustivelSelecionado, setCombustivelSelecionado] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [marcasResp, combustiveisResp] = await Promise.all([
          axios.get("http://192.168.1.48:3001/marcas/select"),
          axios.get("http://192.168.1.48:3001/combustiveis/select"),
        ]);
        setMarcas(marcasResp.data);
        setCombustiveis(combustiveisResp.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }
    fetchData();
  }, []);

  async function fetchModelos(marcaId: number) {
    try {
      const response = await axios.get(
        `http://192.168.1.48:3001/marcas/${marcaId}/modelos`
      );
      setModelos(response.data);
    } catch (error) {
      console.error("Erro ao buscar modelos:", error);
    }
  }

  const pickImage = async () => {
    const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: false,
      aspect: [4, 4],
      quality: 1,
    });
    if (!canceled && assets) {
      setImagens((prevImagens) => [...prevImagens, assets[0]]);
    } else {
      console.log("Operação cancelada");
    }
  };

  async function CadastrarVeiculo(dados: VeiculoFormData) {
    const formData = new FormData();

    formData.append("tipo", dados.tipo);
    formData.append("placa", dados.placa);
    formData.append("renavam", dados.renavam);
    formData.append("chassi", dados.chassi);
    formData.append("motor", dados.motor);
    formData.append("cor", dados.cor);
    formData.append("ano", dados.ano);
    formData.append("valor", dados.valor.toString());
    formData.append("status", dados.status.toString());
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
      const response = await axios.post(
        "http://192.168.1.48:3001/veiculos/insert",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 201) {
        Alert.alert("Sucesso", "Veículo cadastrado com sucesso!");
        navigation.goBack();
      } else {
        Alert.alert("Erro", "Não foi possível cadastrar o veículo.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar veículo:", error);
      Alert.alert("Erro", "Ocorreu um erro ao cadastrar o veículo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView>
      <View style={styles.formContainer}>
        <Text style={styles.formTitleText}>Cadastrar Veículo</Text>

        <FormInputController
          control={control}
          name="tipo"
          label="Tipo"
          errors={errors}
          placeholder="Ex.: Carro, Moto, etc."
        />
        <FormInputController
          control={control}
          name="placa"
          label="Placa"
          errors={errors}
          placeholder="Ex.: ABC-1234"
        />
        <FormInputController
          control={control}
          name="renavam"
          label="Renavam"
          errors={errors}
        />
        <FormInputController
          control={control}
          name="chassi"
          label="Chassi"
          errors={errors}
        />
        <FormInputController
          control={control}
          name="motor"
          label="Motor"
          errors={errors}
        />
        <FormInputController
          control={control}
          name="cor"
          label="Cor"
          errors={errors}
          placeholder="Ex.: Preto"
        />
        <FormInputController
          control={control}
          name="ano"
          label="Ano"
          errors={errors}
          keyboardType="numeric"
          placeholder="Ex.: 2020"
        />
        <FormInputController
          control={control}
          name="valor"
          label="Valor"
          errors={errors}
          keyboardType="numeric"
          placeholder="Ex.: 50000"
        />
        
        {/* Picker para Marca */}
        <Controller
          control={control}
          name="modelo"
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => {
                onChange(itemValue);
                fetchModelos(itemValue);
              }}
            >
              <Picker.Item label="Selecione uma Marca" value={null} />
              {marcas.map((marca) => (
                <Picker.Item key={marca.id} label={marca.nome} value={marca.id} />
              ))}
            </Picker>
          )}
        />

        {/* Picker para Combustível */}
        <Controller
          control={control}
          name="combustivel"
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
            >
              <Picker.Item label="Selecione um Combustível" value={null} />
              {combustiveis.map((combustivel) => (
                <Picker.Item key={combustivel.id} label={combustivel.tipo} value={combustivel.id} />
              ))}
            </Picker>
          )}
        />

        {/* Switch para Status */}
        <Controller
          control={control}
          name="status"
          render={({ field: { onChange, value } }) => (
            <View>
              <Text>Status</Text>
              <Switch
                value={value}
                onValueChange={(status) => onChange(status)}
              />
            </View>
          )}
        />

        {/* Picker para Modelo */}
        <Controller
          control={control}
          name="modelo"
          render={({ field: { onChange, value } }) => (
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
            >
              <Picker.Item label="Selecione um Modelo" value={null} />
              {modelos.map((modelo) => (
                <Picker.Item key={modelo.id} label={modelo.nome} value={modelo.id} />
              ))}
            </Picker>
          )}
        />

        <Button title="Capturar Imagens" onPress={pickImage} />
        {imagens.map((image, index) => (
          <Image key={index} source={{ uri: image.uri }} style={{ width: 100, height: 100 }} />
        ))}

        <FormButton
          label="Salvar"
          onPress={handleSubmit(CadastrarVeiculo)}
          disabled={loading}
        />
      </View>
    </ScrollView>
  );
}
