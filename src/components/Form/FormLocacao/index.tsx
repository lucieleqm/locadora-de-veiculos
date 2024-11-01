/*import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";

interface LocacaoFormData {
  dtInicio: Date;
  dtFinal: Date;
}

export function FormLocacao() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(locacaoSchema),
  });
}

const navigation = useNavigation();
const [loading, setLoading] = useState(false);
const [imagens, setImagens] = useState<any[]>([]);

// Função chamada ao precionar o Botao do Form
async function CadastrarLocaocao(dados: LocacaoFormData) {
    const formData = new FormData();

    formData.append("dt_inicio", dados.dtInicio.toDateString());
    formData.append("dt_final", dados.dtFinal.toString());

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
*/