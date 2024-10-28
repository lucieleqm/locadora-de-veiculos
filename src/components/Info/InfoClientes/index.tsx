import React from "react";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useNavigation } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import styles from "../style";

interface Cliente {
  name: string;
  phone: string;
  cpf: string;
  profissao: string,
  estado_civil: string

}

const clientes: Record<string, Cliente> = {
  '1': { name: 'Gabriel', phone: '(11) 99999-9999', cpf: 'XXX.XXX.XXX-XX', estado_civil: 'Solteiro', profissao: 'Motoboy' },
  '2': { name: 'João', phone: '(11) 99999-9999', cpf: 'XXX.XXX.XXX-XX', estado_civil: 'Solteiro', profissao: 'Cabeleleiro' },
  '3': { name: 'Lucas', phone: '(11) 99999-9999', cpf: 'XXX.XXX.XXX-XX', estado_civil: 'Casado', profissao: 'Padeiro' },
  '4': { name: 'Carlos', phone: '(11) 99999-9999', cpf: 'XXX.XXX.XXX-XX', estado_civil: 'Solteiro', profissao: 'Motoboy' },
  '5': { name: 'Bento', phone: '(11) 99999-9999', cpf: 'XXX.XXX.XXX-XX', estado_civil: 'Casado', profissao: 'Engenheiro' },
  '6': { name: 'Benta', phone: '(11) 99999-9999', cpf: 'XXX.XXX.XXX-XX', estado_civil: 'Solteiro', profissao: 'Motoboy' }
};

export default function ClienteDetalhes() {
  const { id } = useLocalSearchParams();

  const cliente = clientes[id as string];

  if (!cliente) {
    return (
        <Text>Cliente não encontrado</Text>
    );
  }

  const navigation = useNavigation()
  return (
    <SafeAreaView className="w-full flex-1 bg-slate-100 p-5">
        <SafeAreaView style={styles.boxMain}>
          <SafeAreaView style={styles.formTitle}>
          <TouchableOpacity
            style={styles.boxButtonIcon}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back-ios" size={25} color="black" />
          </TouchableOpacity>
          <Text style={styles.formTitleText}> Cliente </Text>
          </SafeAreaView>
          <SafeAreaView style={{padding: 40}}>
          <Text style={styles.textTitle}>Detalhes do Cliente</Text>
          <Text style={styles.textTitle}>Nome: {cliente.name}</Text>
          <Text style={styles.textTitle}>Telefone: {cliente.phone}</Text>
          <Text style={styles.textTitle}>CPF: {cliente.cpf}</Text>
          <Text style={styles.textTitle}>Estado civil: {cliente.estado_civil}</Text>
          <Text style={styles.textTitle}>Profissão: {cliente.profissao}</Text>
          </SafeAreaView>
        </SafeAreaView>
    </SafeAreaView>
  );
}
