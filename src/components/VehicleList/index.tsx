import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import VehicleListItem from "../VehicleListItem";
import styles from "./style";

export default function VehicleList() {
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

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <VehicleListItem
            id={item.id}
            nome={item.name}
            preco={item.price}
            detalhes={item.details}
            imagem={item.image}
          />
        )}
        numColumns={2}
      />
    </View>
  );
}