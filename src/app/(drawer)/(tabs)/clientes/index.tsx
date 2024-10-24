import React from "react";
import { View, Text} from "react-native";
import { useRouter } from "expo-router";
import AddButton from "../../../../components/Button/AddButton";

export default function Clientes(){
  const router = useRouter();

    return (
      <View className="flex-1 bg-grey-500 items-center justify-center">
        <AddButton onPress={() => router.push("../../../addCliente")} />
      </View>
    )
}

