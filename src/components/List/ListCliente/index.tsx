import { API_URL } from "@env";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import styles from "../style";
import { TouchableOpacity } from "react-native-gesture-handler";
import api from "../../../services/api";
import { useFocusEffect, useRouter } from "expo-router";
import { theme } from "src/styles/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ListCliente() {
  interface Cliente {
    id: number;
    nome: string;
    cpf: string;
    telefone1: string;
  }

  const [searchText, setSearchText] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Cliente[]>([]);
  const [lista, setLista] = useState(data);

  const fetchData = async () => {
    try {
      const response = await api.get(`/clientes`);
      setData(response.data);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchText === "") {
      setLista(data);
    } else {
      setLista(
        data.filter(
          (item) =>
            item.nome.toLowerCase().includes(searchText.toLowerCase()) ||
            item.cpf.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
  }, [searchText, data]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const router = useRouter();

  const renderItem = ({ item }: { item: Cliente }) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => router.push(`/details/info-cliente/${item.id}`)}
      >
        <Text style={styles.cardTitle}>{item.nome}</Text>
        <Text style={styles.cardText}>cpf: {item.cpf}</Text>
        <Text style={styles.cardText}>telefone: {item.telefone1}</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.listContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" color={theme.colors.gray[800]} />
      ) : (
        <View>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color={theme.colors.blue}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquise um cliente"
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
              returnKeyType="done"
              onFocus={() => {}}
            />
          </View>

          <FlatList
            data={lista}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            numColumns={1}
          />
        </View>
      )}
    </View>
  );
}
