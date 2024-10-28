import React, { useState } from "react";
import {SafeAreaView, Text, FlatList, TouchableOpacity} from "react-native";
import { useRouter } from "expo-router";
import { Octicons } from "@expo/vector-icons";

import styles from "../../../../styles/style";

// '../../../infoClientes'

export default function Clientes(){
  const router = useRouter();
  const [clienteLoc, setClienteLoc] = useState([
    {
    id: '1',
    name: 'Gabriel',
    phone: '(11) 99999-9999',
    cpf: 'XXX.XXX.XXX-XX'
    },
    {
    id: '2',
    name: 'João',
    phone: '(11) 99999-9999',
    cpf: 'XXX.XXX.XXX-XX'
    },
    {
    id: '3',
    name: 'Lucas',
    phone: '(11) 99999-9999',
    cpf: 'XXX.XXX.XXX-XX'
    },
    {
    id: '4',
    name: 'Carlos',
    phone: '(11) 99999-9999',
    cpf: 'XXX.XXX.XXX-XX'
    },
    {
    id: '5',
    name: 'Bento',
    phone: '(11) 99999-9999',
    cpf: 'XXX.XXX.XXX-XX'
    },
    {
    id: '6',
    name: 'Benta',
    phone: '(11) 99999-9999',
    cpf: 'XXX.XXX.XXX-XX'
    }
    
])

  return (
    <SafeAreaView className="flex-1 bg-grey-500 items-center justify-center">
      <SafeAreaView style={styles.boxMain}>
        <Text style={styles.textTitle}>Clientes</Text>
          <SafeAreaView style={styles.boxFlatList}>
            <FlatList data={clienteLoc}
                      showsVerticalScrollIndicator={false}
                      keyExtractor={(item)=>item.id}
                      renderItem={({item})=>(
                        <TouchableOpacity style={styles.boxList}
                                          onPress={()=>router.push({pathname: '../../../infoClientes', params: {id: item.id}})}
                                          >
                            <Text style={styles.textListType}>{item.name}</Text>
                            <Text style={styles.textListItem}>{item.phone}</Text>
                            <Text style={styles.textListItem}>{item.cpf}</Text>
                        </TouchableOpacity>
                      )}
                      >
            </FlatList>
          </SafeAreaView>
          <SafeAreaView style={styles.boxAreaButton}>
            <TouchableOpacity style={styles.boxButton}  
                              onPress={() => router.push("../../../addCliente")}
                              >
                <Octicons name="plus" style = {styles.textButton}/>
            </TouchableOpacity>
          </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  )
}

