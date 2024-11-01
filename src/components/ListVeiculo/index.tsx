import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "./style";
import axios from "axios";
import api from "../../services/api";

export default function ListVeiculo() {
  /*
    const [list, setList] = useState();

    const handleOrderClick = () => {
        let newList = [];
        
        // Ordenar a lista de a-z
        newList.sort((a, b)=> {
            if(a.name > b.name) {
                return 1;
            }else {
                if(b.name > a.name) {
                    return -1;
                }else {
                    return 0;
                }
            }
            
        });

        setList(newList);
    };
*/

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

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Veiculo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          "/veiculos/select"
        );
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar veículos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const renderItem = ({ item }: { item: Veiculo }) => (
    <View style={styles.cardVehicle}>
      <TouchableOpacity>
        <View>
          {item.ImagemVeiculos && item.ImagemVeiculos.length > 0 ? (
            <Image
              source={{ 
                uri: `http://192.168.1.48:3001/${item.ImagemVeiculos[0].url}`,
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
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  );
}
