import React, { useState } from "react";
import { SafeAreaView, Text, FlatList, TouchableOpacity } from "react-native";
import styles from "../../../../styles/style";
import { useRouter } from "expo-router"
import AddButton from "../../../../components/Button/AddButton";
import ListReparo from "../../../../components/List/ListReparo";

export default function Reparos(){
  const router = useRouter();
  const [vehicleRepair, setVehicleRepair] = useState([
      {
      id: '1',
      type: 'Honda Pop 100',
      data: '19/07/2024',
      price: '200,00',
      describe: 'Troca de bateria'
      },
      {
      id: '2',
      type: 'Yamaha Lander 250',
      data: '19/09/2024',
      price: '400,00',
      describe: 'Troca de pneu'
      },
      {
      id: '3',
      type: 'Honda Biz 125',
      data: '04/08/2024',
      price: '50,00',
      describe: 'Troca de óleo'
      },
      {
      id: '4',
      type: 'Honda Pop 100',
      data: '19/07/2024',
      price: '200,00',
      describe: 'Troca de bateria'
      },
      {
      id: '5',
      type: 'Yamaha Lander 250',
      data: '19/09/2024',
      price: '400,00',
      describe: 'Troca de pneu'
      }
  ])
    return (
      <SafeAreaView style={styles.container}>
        <AddButton onPress={()=>router.push('../../../addReparo')}/>
      </SafeAreaView>
      /*
      <SafeAreaView>
          <SafeAreaView style={styles.boxMain}> 
            <Text style={styles.textTitle}> Reparos</Text>
            <SafeAreaView style={styles.boxFlatList}>
                <FlatList data={vehicleRepair}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.id}  
                            renderItem={({item})=>(
                            <SafeAreaView style={styles.boxList}>
                                <Text style={styles.textListType}>{item.type}</Text>
                                <Text style={styles.textListItem}>{item.data}</Text>
                                <Text style={styles.textListItem}>R$ {item.price}</Text>
                                <Text style={styles.textListItem}>{item.describe}</Text>
                            </SafeAreaView>
                            )}
                            >
                </FlatList>
            </SafeAreaView>
            <SafeAreaView style={styles.boxAreaButton}>
                <TouchableOpacity style={styles.boxButton}  
                                  onPress={()=>router.push('../../../addReparo')}
                                  >
                    <Octicons name="plus" style = {styles.textButton}/>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaView>
      </SafeAreaView>
      */
    )
}