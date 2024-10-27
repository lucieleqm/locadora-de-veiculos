import {View} from "react-native";
import React from "react";
import FormVeiculos from "../components/Form/FormVeiculos"

export default function AdicionarCliente(){
    return (
      <View className="flex-1 bg-grey-500 items-center justify-center">
        <FormVeiculos/>
      </View>
    )
}