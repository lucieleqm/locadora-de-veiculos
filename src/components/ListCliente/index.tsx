import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import styles from "./style";
import axios from "axios";

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
        const response = await axios.get(
          "http://192.168.1.48:3001/clientes/select"
        );
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const renderItem = ({ item }: { item: Cliente }) => (
    <View style={styles.cardCliente}>
      <Text style={styles.cardTitle}>{item.nome}</Text>
      <Text style={styles.cardClienteDetails}>{item.cpf}</Text>
      <Text style={styles.cardClienteDetails}>{item.telefone}</Text>
    </View>
  );
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  );
}
