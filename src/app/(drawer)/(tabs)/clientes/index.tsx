import { Link } from "expo-router";
import { View, Text} from "react-native";
import React from "react";

export default function Clientes(){
    return (
      <View className="flex-1 bg-grey-500 items-center justify-center">
        <Link href={"../../../addCliente"}>Adicionar Cliente</Link>
      </View>
    )
}