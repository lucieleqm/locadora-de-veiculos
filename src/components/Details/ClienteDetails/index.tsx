import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Alert,
  Switch
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import DeleteButton from "src/components/Button/DeleteButton";
import EditButton from "src/components/Button/EditButton";
import api from "../../../services/api";
import { theme } from "../../../styles/theme";
import { InfoItem, SectionCard } from "../common";
import styles from "../common/style";
import { useRouter } from "expo-router";

interface ClienteDetailsData {
  id: string;
}

export function ClienteDetails({ id }: ClienteDetailsData) {
  const [isLoading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>(null);
  const [associado, setAssociado] = useState(false); // Estado para verificar se o cliente está associado

  const router = useRouter();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await api.get(`clientes/${id}`);
        setDetails(response.data);
  
        // Atrasando a verificação de associações após a criação do cliente
        setTimeout(() => {
          checkAssociations(response.data);
        }, 1000); // Atraso de 1 segundo (ajuste conforme necessário)
      } catch (error) {
        console.error("Erro ao buscar cliente:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);
  
  // Função para verificar se o cliente está associado a locações
  const checkAssociations = async (cliente: any) => {
    try {
      const locacaoResponse = await api.get(`locacoes?cliente_id=${cliente.id}`);
      console.log("Respostas das locações:", locacaoResponse.data); // Verifique a resposta da API
      if (locacaoResponse.data.length > 0) {
        setAssociado(true); // Se tiver locação, setar associado como true
        return;
      }
      setAssociado(false); // Se não tiver locações, permitir a exclusão
    } catch (error) {
      console.error("Erro ao verificar associações:", error);
    }
  };
  

  // Função para deletar o cliente
  const handleDelete = async () => {
    console.log('Associado:', associado); // Verificar o valor do estado associado
  
    if (associado) {
      Alert.alert("Erro", "Não é possível deletar o cliente porque ele está associado a uma locação.");
      return;
    }
  
    try {
      await api.delete(`clientes/${id}`);
      Alert.alert("Sucesso", "Cliente deletado com sucesso!");
      router.back(); // Utilizando router.back() em vez de navigation.goBack()
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      Alert.alert("Erro", "Não foi possível deletar o cliente.");
    }
  };
  

  if (isLoading) {
    return <ActivityIndicator size="large" color={theme.colors.gray[800]} />;
  }

  if (!details) {
    return <Text>Detalhes não encontrados</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Switch />
          <EditButton />
          <DeleteButton onDelete={handleDelete} />
        </View>

        <SectionCard title="Pessoal" iconComponent={Feather} iconName="user">
          <InfoItem label="Nome" value={details.nome} />
          <InfoItem label="Estado Civil" value={details.estadoCivil} />
          <InfoItem label="Profissão" value={details.profissao} />
          <InfoItem label="RG" value={details.rg} />
          <InfoItem label="CPF" value={details.cpf} />
        </SectionCard>

        <SectionCard title="Contato" iconComponent={Ionicons} iconName="call-outline">
          <InfoItem label="Telefone" value={details.telefone} />
          <InfoItem label="E-mail" value={details.email} />
        </SectionCard>

        <SectionCard title="Endereço" iconComponent={Feather} iconName="map-pin">
          <InfoItem label="Cidade" value={details.Endereco?.cidade || "N/A"} />
          <InfoItem label="CEP" value={details.Endereco?.cep || "N/A"} />
          <InfoItem label="Bairro" value={details.Endereco?.bairro || "N/A"} />
          <InfoItem label="Rua" value={details.Endereco?.rua || "N/A"} />
          <InfoItem label="Número" value={details.Endereco?.numero || "N/A"} />
          <InfoItem label="Complemento" value={details.Endereco?.complemento || "N/A"} />
        </SectionCard>
      </ScrollView>
    </SafeAreaView>
  );
}
