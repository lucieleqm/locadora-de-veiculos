import { API_URL } from '@env';
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator } from "react-native";
import styles from "../style";
import { TouchableOpacity } from "react-native-gesture-handler";
import api from '../../../services/api';
import { theme } from '../../../styles/theme';
import { useRouter } from 'expo-router';

export default function ListLocacao() {
  interface Locacao {
    id: number;
    Cliente: {
        nome: string;
        cpf: string;
    };
    Veiculo: {
        Modelo: {
            nome: string;
        }
        placa: string;
    };
    dt_Inicio: string;
    dt_Final: string; 
  }

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Locacao[]>([]);

  const dateFormat = (date: string) => {
    return new Date(date).toLocaleDateString("pt-br", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/locacoes`);
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar locacoes:", error,);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const router = useRouter();

  const renderItem = ({ item }: { item: Locacao }) => (
    <View style={styles.card}>
      <TouchableOpacity
      onPress={() => router.push(`/details/info-locacao/${item.id}`)}>
        <Text style={styles.cardTitle}>{item.Veiculo.Modelo.nome}</Text>
        <Text style={styles.cardText}>{item.Cliente.nome}</Text>
        <Text style={styles.cardText}>Início: {dateFormat(item.dt_Inicio)}</Text>
        <Text style={styles.cardText}>Fim: {dateFormat(item.dt_Final)}</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.listContainer}>
    {isLoading ? (
      <ActivityIndicator size="large" color={theme.colors.gray[800]}/>
    ):(
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={1}
      />
    )} 
    </View>
  );
}
