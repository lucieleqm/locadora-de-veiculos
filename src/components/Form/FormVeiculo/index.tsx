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
import { useForm, SubmitHandler} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { veiculoSchema } from "../../../schemas/veiculoSchemas";
import { FormInputController } from "../../../controllers/FormInputController";
import { FormPickerController } from "../../../controllers/FormPickerController";
import FormButton from "../../Button/FormButton";
import { useNavigation } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import styles from "../style";
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
  valor: number;
  //status: boolean;
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
  const [imagens, setImagens] = useState<any[]>([]);
  const [tipos, setTipos] = useState<any[]>([]);
  const [cores, setCores] = useState<any[]>([]);
  const [marcas, setMarcas] = useState<any[]>([]);
  const [modelos, setModelos] = useState<any[]>([]);
  const [combustiveis, setCombustiveis] = useState<any[]>([]);

  // Observa os valores selecionados nos pickers de tipo e marca
  const tipoSelecionado = watch("tipo");
  const marcaSelecionada = watch("marca");

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
      setMarcas([]); // Limpa as marcas se nenhum tipo for selecionado
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
    formData.append("valor", dados.valor.toString());
   // formData.append("status", dados.status.toString());
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

  return (
    <ScrollView>
      <View style={styles.formContainer}>
        {/* Picker para Tipo de Veículo */}
        <FormPickerController
          control={control}
          name="tipo"
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
          placeholder="Selecione a Marca"
          errors={errors}
          options={marcas.map((marca) => ({
            label: marca.nome,
            value: marca.id,
          }))}
        />
        {/* Picker para Modelo */}
        <FormPickerController
          control={control}
          name="modelo"
          placeholder="Selecione o Modelo"
          errors={errors}
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
          placeholder="Ex.: ABC-1234"
        />
        <FormInputController
          control={control}
          name="renavam"
          label="Renavam *"
          errors={errors}
        />
        <FormInputController
          control={control}
          name="chassi"
          label="Chassi *"
          errors={errors}
        />
        <FormInputController
          control={control}
          name="motor"
          label="Motor *"
          errors={errors}
        />
        <FormInputController
          control={control}
          name="km"
          label="Km *"
          errors={errors}
          keyboardType="numeric"
        />
        <FormInputController
          control={control}
          name="valor"
          label="Valor de Locação *"
          errors={errors}
          keyboardType="numeric"
          placeholder="Ex.: 100.5"
        />
      
        <Button title="Capturar Imagens" onPress={pickImage} />
        {imagens.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image.uri }}
            style={styles.boxImageLoad}
          />
        ))}

        <FormButton
          label="Salvar"
          onPress={handleSubmit(cadastrarVeiculo)}
          disabled={loading}
        />
      </View>
    </ScrollView>
  );
}
