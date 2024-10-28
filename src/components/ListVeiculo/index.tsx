import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import styles from "./style";
import axios from "axios";

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
/*
const [vehicles, setVehicles] = useState([
    {
      id: 1,
      name: 'Fiat Toro',
      price: '100',
      details: '1.8 16V EVO Flex Endurance Manual',
      image: require('../../assets/images/car1.png'), // Ajuste a imagem conforme necessário
    },
    {
      id: 2,
      name: 'Honda Civic',
      price: '150',
      details: '2.0 DI e:HEV Touring e-CVT',
      image: require('../../assets/images/car2.png'),
    },
    
    {
      id: 4,
      name: 'Fiat Toro',
      price: '100',
      details: '1.8 16V EVO Flex Endurance Manual',
      image: require('../../assets/images/car1.png'),
    },
    {
      id: 4,
      name: 'Honda Civic',
      price: '150',
      details: '2.0 DI e:HEV Touring e-CVT',
      image: require('../../assets/images/car2.png'),
    },
    {
      id: 5,
      name: 'Honda Civic',
      price: '150',
      details: '2.0 DI e:HEV Touring e-CVT',
      image: require('../../assets/images/car2.png'),
    },
  ]);
*/

interface Veiculo {
  id: number;
  Modelo: {
    nome: string;
  } 
  valor: number;   
  ano: string;
  imagem: string;  // URL da imagem
}

const [isLoading, setLoading] = useState(true);
const [data, setData] = useState<Veiculo[]>([]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("http://192.168.1.48:3001/veiculos/select");
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
      <View style = {styles.cardVehicle}>
            <View>
                <Image source={{uri: item.imagem}} style={styles.cardImage} />
            </View>
            <View style= {styles.cardInfosContainer}>
                <Text style={styles.cardTitle}>{item.Modelo.nome}</Text>
                <Text style={styles.cardVehicleDetails}>{item.ano}</Text>
                <Text style={styles.cardParagraph}>A partir de </Text>
                <Text style={styles.cardVehiclePrice}>R$ {item.valor}/Semana</Text>
            </View>
        </View>
    )

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