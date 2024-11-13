// Essa tela é apenas um teste
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  Switch,
} from "react-native";
import EditButton from "../../Button/EditButton";
import api from "../../../services/api";
import { theme } from "../../../styles/theme";
import { Feather, Ionicons } from "@expo/vector-icons";
import { InfoItem, SectionCard } from "../common";
import styles from "../common/style";
import { ScrollView } from "react-native-gesture-handler";

interface ClienteDetailsData {
  id: string;
}

export function ClienteDetails({ id }: ClienteDetailsData) {
  const [isLoading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await api.get(`clientes/${id}`);
        console.log("Dados recebidos:", response.data);
        setDetails(response.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  useEffect(() => {
    console.log("Dados no render:", details); // Log para verificar os dados no render
  }, [details]);

  if (isLoading) {
    return <ActivityIndicator size="large" color={theme.colors.gray[800]} />;
  }
  if (!details) {
    console.log(id);
    return <Text>Detalhes não encontrados</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.header}>
            <Text>4,5</Text>
            <EditButton id={id} path={""}/>
            <Switch />
          </View>
        </View>

        <SectionCard title="Pessoal" iconComponent={Feather} iconName="user">
          <InfoItem label="Nome" value={details.nome} />
          <InfoItem label="Estado Civil" value={details.estadoCivil} />
          <InfoItem label="Profissão" value={details.profissao} />
          <InfoItem label="RG" value={details.rg} />
          <InfoItem label="CPF" value={details.cpf} />
        </SectionCard>

        <SectionCard
          title="Contato"
          iconComponent={Ionicons}
          iconName="call-outline"
        >
          <InfoItem label="Telefone:" value={details.telefone} />
          <InfoItem label="E-mail:" value={details.email} />
        </SectionCard>

        <SectionCard
          title="Endereço"
          iconComponent={Feather}
          iconName="map-pin"
        >
          <InfoItem label="Cidade" value={details.Endereco?.cidade || "N/A"} />
          <InfoItem label="CEP" value={details.Endereco?.cep || "N/A"} />
          <InfoItem label="Bairro" value={details.Endereco?.bairro || "N/A"} />
          <InfoItem label="Rua" value={details.Endereco?.rua || "N/A"} />
          <InfoItem label="Número" value={details.Endereco?.numero || "N/A"} />
          <InfoItem
            label="Complemento:"
            value={details.Endereco?.complemento || "N/A"}
          />
        </SectionCard>
      </ScrollView>
    </SafeAreaView>
  );
}
