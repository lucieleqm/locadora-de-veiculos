import { View, Text} from "react-native";

import { FormCliente }  from "../components/Form/FormCliente"

export default function AdicionarCliente(){
    return (
      <View className="flex-1 bg-grey-500 items-center justify-center">
        <FormCliente/>
      </View>
    )
}