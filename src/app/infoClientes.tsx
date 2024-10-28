import {View} from "react-native";
import React from "react";
import InfoClientes from '../components/Info/InfoClientes'

export default function AdicionarCliente(){
    return (
      <View className="flex-1 bg-grey-500 items-center justify-center">
        <InfoClientes></InfoClientes>
      </View>
    )
}