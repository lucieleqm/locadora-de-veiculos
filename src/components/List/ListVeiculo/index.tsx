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
import { useFocusEffect, useRouter } from "expo-router";
import { TextInput } from "react-native-gesture-handler";

export default function ListVeiculo() {
  interface Veiculo {
    id: number;
    Modelo: {
      nome: string;
    };
    valor: number;
    ano: string;
    ImagemVeiculos: {
      url: string;
    }[];
  }

  const [searchText, setSearchText] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Veiculo[]>([]);
  const [lista, setLista] = useState(data);

  const fetchData = async () => {
    try {
      const response = await api.get("/veiculos");
      setData(response.data);
      setLista(response.data)
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchText === "") {
      setLista(data);
    } else {
      setLista(
        data.filter((item) => (
          item.Modelo.nome.toLowerCase().indexOf(searchText.toLowerCase())) > -1
        )
      );
    }
  }, [searchText, data]);

  const handleOnClick = () => {
    let newList = [...data];

    newList.sort((a, b) => (a.Modelo.nome > b.Modelo.nome)?1:(b.Modelo.nome > a.Modelo.nome)?-1:0);

    setLista(newList);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  const router = useRouter();

  const renderItem = ({ item }: { item: Veiculo }) => (
    <View style={styles.cardVehicle}>
      <TouchableOpacity
        onPress={() => router.push(`/details/info-veiculo/${item.id}`)}
      >
        <View>
          {item.ImagemVeiculos && item.ImagemVeiculos.length > 0 ? (
            <Image
              source={{
                uri: `http://192.168.100.13:3001/${item.ImagemVeiculos[0].url}`,
              }}
              style={styles.cardImage}
            />
          ) : (
            <Text>Sem imagem</Text>
          )}
        </View>
        <View style={styles.cardInfosContainer}>
          <Text style={styles.cardTitle}>{item.Modelo.nome}</Text>
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
        <View>
          <TextInput
            placeholder="Pesquise um veículo"
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            returnKeyType="done"
            onFocus={() => {}}
          />
          <FlatList
            data={lista}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            numColumns={2}
          />
        </View>
      )}
    </View>
  );
}
