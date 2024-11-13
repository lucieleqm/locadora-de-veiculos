import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import api from "../../services/api";
import { router } from "expo-router";
import React from "react";
import styles from "./style";
import { TouchableOpacity } from "react-native-gesture-handler";
import { API_URL } from "@env";
import { ImageSlider } from "../Image/ImageSlider";

interface VeiculoEditData {
  id: string;
}

export function EditVeiculo({ id }: VeiculoEditData) {
  const [veiculo, setVeiculo] = useState<any>(null);
  const [locado, setLocado] = useState(false);
  const [ano, setAno] = useState("");
  const [valor, setValor] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await api.get(`veiculos/${id}`);
        const dados = response.data;
        setVeiculo(dados);
        setLocado(dados.locado);
        setAno(dados.ano);
        setValor(String(dados.valor));
      } catch (error) {
        console.error("Erro ao buscar detalhes do veículo:", error);
      }
    };
    fetchDetails();
  }, [id]);

  if (!veiculo) {
    console.log(id);
    return <Text>Veículo não encontrado</Text>;
  }

  const imagens = veiculo.ImagemVeiculos?.map((imagem: any) => ({ 
    id: imagem.id, 
    url: `${API_URL}/${imagem.url}`
  })) ?? [];

  const handleSave = async () => {
    try {
      await api.put(`veiculos/edit/${id}`, {
        locado,
        ano,
        valor: parseFloat(valor),
      });
      Alert.alert("Sucesso", "Veículo atualizado com sucesso!");
      router.back();
    } catch (error) {
      console.error("Erro ao atualizar veículo:", error);
      Alert.alert("Erro", "Erro ao atualizar o veículo.");
    }
  };

  if (!veiculo) {
    return <Text>Carregando...</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Editar Veículo</Text>
    
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Locado</Text>
          <Switch 
          value={locado} 
          onValueChange={setLocado} />
        </View>

        <View>
          <Text style={styles.label}>Ano</Text>
          <TextInput
            style={styles.input}
            value={ano}
            onChangeText={setAno}
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text style={styles.label}>Valor</Text>
          <TextInput
            style={styles.input}
            value={valor}
            onChangeText={setValor}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.textButton}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
