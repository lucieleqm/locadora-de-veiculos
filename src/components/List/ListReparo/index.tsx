import React, { useCallback, useState } from "react";
import styles from "../style";
import { Text, SafeAreaView, ActivityIndicator, FlatList, View } from "react-native";
import api from "../../../services/api";
import { theme } from "../../../styles/theme";
import { useFocusEffect } from "expo-router";
interface Reparo {
  id: number;
  id_veiculo: string;
  Veiculo: {
    Modelo: {
      nome: string;
      Marca: {
        nome: string;
      };
    };
    placa: string;
  };
  data: string;
  custo: number;
  descricao: string;
}
interface ListReparoProps { 
  veiculoId?: number; 
  }

export default function ListReparo({ veiculoId }: ListReparoProps) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Reparo[]>([]);

  const dateFormat = (date: string) => {
    return new Date(date).toLocaleDateString("pt-br", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const fetchData = async () => {
    try {
      const response = veiculoId
      ? await api.get(`/reparos/${veiculoId}`)
      : await api.get(`/reparos`);
      setData(response.data);
      console.log("Dados recebidos da API:", JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error("Erro ao buscar reparos:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useFocusEffect(
    useCallback(() => {
      fetchData();
      return () => setLoading(false);
    }, [veiculoId])
  );

  const renderItem = ({ item }: { item: Reparo }) => (
    <SafeAreaView style={styles.card}>
        <Text style={styles.cardTitle}>{item.Veiculo.Modelo.Marca.nome} {item.Veiculo.Modelo.nome}</Text>
        <Text style={styles.cardText}>
          Placa do veículo: {item.Veiculo.placa}
        </Text>
        <Text style={styles.cardText}>
          Data do reparo: {dateFormat(item.data)}
        </Text>
        <Text style={styles.cardText}>Custo do Reparo: R$ {item.custo}</Text>
        <Text style={styles.cardText}>Descrição: {item.descricao}</Text>
    </SafeAreaView>
  );
  
  return (
    <SafeAreaView style={styles.listContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" color={theme.colors.gray[800]} />
      ) : data.length === 0 ? (
        <Text>Nenhum reparo encontrado.</Text>
      ) : (
        <View>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={1}
        />
        </View>  
      )}
    </SafeAreaView>
  );
}
