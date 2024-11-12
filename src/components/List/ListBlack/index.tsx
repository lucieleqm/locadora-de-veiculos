import React, { useState } from "react";
import { Text, View, FlatList, TouchableOpacity, Alert } from "react-native";
import styles from "../style";
import api from "../../../services/api";
import { useFocusEffect, useRouter } from "expo-router";
import * as Linking from "expo-linking";

interface BlackList {
  id: number;
  nome: string;
  cpf: string;
  motivo: string;
}

export default function ListBlack() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<BlackList[]>([]);

  // Função para buscar dados do backend
  const fetchData = async () => {
    try {
      const response = await api.get(`/blacklists`);
      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar infratores:", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const router = useRouter();

  // Função para compartilhar os dados no WhatsApp
  const handleShare = async (item: BlackList) => {
    const message = `🚨 Infrator na Blacklist 🚨\n\n🆔 Nome: ${item.nome}\n📄 CPF: ${item.cpf}\n🛑 Motivo: ${item.motivo}`;
    const url = `whatsapp://send?text=${encodeURIComponent(message)}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Erro", "WhatsApp não está instalado no dispositivo");
      }
    } catch (error) {
      console.error("Erro ao compartilhar no WhatsApp:", error);
    }
  };

  // Função para deletar um infrator com confirmação
const handleDelete = async (id: number) => {
  Alert.alert(
    "Confirmação",
    "Tem certeza de que deseja excluir este infrator?",
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/blacklists/${id}`);
            Alert.alert("Sucesso", "Infrator removido com sucesso!");
            // Atualiza a lista após exclusão
            fetchData();
          } catch (error) {
            console.error("Erro ao deletar infrator:", error);
            Alert.alert("Erro", "Não foi possível deletar o infrator.");
          }
        },
      },
    ],
    { cancelable: true }
  );
};


  const renderItem = ({ item }: { item: BlackList }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.cardTitle}>{item.nome}</Text>
        <Text style={styles.cardText}>CPF: {item.cpf}</Text>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Infrações:</Text>
        <Text style={styles.cardText}>{item.motivo}</Text>
      </View>

      {/* Botão para compartilhar no WhatsApp */}
      <TouchableOpacity
        style={styles.shareButton}
        onPress={() => handleShare(item)}
      >
        <Text style={styles.shareButtonText}>Compartilhar no WhatsApp</Text>
      </TouchableOpacity>

      {/* Botão para deletar o infrator */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={1}
      />
    </View>
  );
}
