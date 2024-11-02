import { API_URL } from '@env';
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import styles from "../style";
import { TouchableOpacity } from "react-native-gesture-handler";
import api from '../../../services/api';

export default function ListCliente() {
  interface Cliente {
    id: number;
    nome: string;
    cpf: string;
    telefone: string;
  }

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Cliente[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/clientes`
        );
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error,);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const renderItem = ({ item }: { item: Cliente }) => (
    <View style={styles.card}>
      <TouchableOpacity>
        <Text style={styles.cardTitle}>{item.nome}</Text>
        <Text style={styles.cardText}>{item.cpf}</Text>
        <Text style={styles.cardText}>{item.telefone}</Text>
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