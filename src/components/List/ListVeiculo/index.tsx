import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import styles from "./style";
import api from "../../../services/api";
import { theme } from "../../../styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { API_URL } from "@env";

export default function ListVeiculo() {
  interface Veiculo {
    id: number;
    locado: any;
    Modelo: {
      nome: string;
      Marca: {
        nome: string;
      };
    };
    valor: number;
    ano: string;
    placa: string;
    ImagemVeiculos: {
      url: string;
    }[];
  }

  const [searchText, setSearchText] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Veiculo[]>([]);
  const [lista, setLista] = useState(data);
  const [filter, setFilter] = useState<"todos" | "locados" | "naoLocados">("todos");

  const fetchData = async () => {
    try {
      const response = await api.get("/veiculos");
      setData(response.data);
      setLista(response.data);
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filteredData = data;

    if (searchText) {
      filteredData = filteredData.filter(item =>
        item.Modelo.nome.toLowerCase().includes(searchText.toLowerCase()) ||
        item.Modelo.Marca.nome.toLowerCase().includes(searchText.toLowerCase()) ||
        item.placa.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Filtro de veículos locados
    if (filter === "locados") {
      filteredData = filteredData.filter((item) => item.locado);
    } else if (filter === "naoLocados") {
      filteredData = filteredData.filter((item) => !item.locado);
    }

  setLista(filteredData);
  }, [searchText, filter, data])

  const handleOnClick = () => {
    let newList = [...data];

    newList.sort((a, b) =>
      a.Modelo.nome > b.Modelo.nome ? 1 : b.Modelo.nome > a.Modelo.nome ? -1 : 0
    );

    setLista(newList);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const router = useRouter();

  const renderItem = ({ item }: { item: Veiculo }): JSX.Element => (
    <View style={styles.cardVehicle}>
      <TouchableOpacity
        onPress={() => router.push(`/details/info-veiculo/${item.id}`)}
      >
        <View>
          {item.ImagemVeiculos && item.ImagemVeiculos.length > 0 ? (
            <Image
              source={{
                uri: `${API_URL}/${item.ImagemVeiculos[0].url}`,
              }}
              style={styles.cardImage}
            />
          ) : (
            <Text>Sem imagem</Text>
          )}
        </View>
        <View style={styles.cardInfosContainer}>
          <Text style={styles.cardTitle}>
            {item.Modelo.Marca.nome} {item.Modelo.nome}
          </Text>
          <Text
            style={{
              color: item.locado ? "red" : "green",
              fontWeight: "bold",
            }}
          >
            {item.locado ? "Locado" : "Livre"}
          </Text>
          <Text style={styles.cardVehicleDetails}>{item.placa}</Text>
          <Text style={styles.cardVehicleDetails}>{item.ano}</Text>
          <Text style={styles.cardParagraph}>A partir de </Text>
          <Text style={styles.cardVehiclePrice}>R$ {item.valor}/Semana</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.listContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" color={theme.colors.gray[800]} />
      ) : (
        <ScrollView>
          <View style={styles.searchContainer}>
            <Ionicons
              name="search"
              size={20}
              color={theme.colors.blue}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquise um veículo"
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
              returnKeyType="done"
              onFocus={() => {}}
            />
          </View>

          {/* Filtro */}
          <View style={styles.filterContainer}>
            <TouchableOpacity
              onPress={() => setFilter("todos")}
              style={[styles.filterButton, filter === "todos" && styles.activeFilterButton]}
            >
              <Text style={styles.filterText}>Todos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFilter("locados")}
              style={[styles.filterButton, filter === "locados" && styles.activeFilterButton]}
            >
              <Text style={styles.filterText}>Locados</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFilter("naoLocados")}
              style={[styles.filterButton, filter === "naoLocados" && styles.activeFilterButton]}
              
            >
              <Text style={styles.filterText}>Não Locados</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={lista}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            numColumns={2}
            scrollEnabled={false}
          />
        </ScrollView>
      )}
    </View>
  );
}
