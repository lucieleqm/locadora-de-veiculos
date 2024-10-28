import { View, Text} from "react-native";
import React from "react";
import { FormVeiculo }  from "../../components/Form/FormVeiculo"
import styles from "../../styles/style";

export default function AdicionarCliente(){
    return (
      <View style={styles.container}>
        <FormVeiculo/>
      </View>
    )
}