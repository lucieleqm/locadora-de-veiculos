import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Switch } from "react-native";
import EditButton from "../../Button/EditButton";
import api from "../../../services/api";
import { theme } from "../../../styles/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../common/style";
import { InfoItem, SectionCard } from "../common";
import { Feather, Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { ImageSlider } from "../../Image/ImageSlider";
import { API_URL } from "@env";

interface LocacaoDetailsData {
  id: string;
}

export function LocacaoDetails({ id }: LocacaoDetailsData) {
  const [isLoading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        console.log();
        const response = await api.get(`/locacoes/${id}`);
        setDetails(response.data);
      } catch (error) {
        console.error("Erro ao buscar locações:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);
  if (isLoading) {
    return <ActivityIndicator size="large" color={theme.colors.gray[800]} />;
  }
  if (!details) {
    console.log(id);
    return <Text>Detalhes não encontrados</Text>;
  }

  const imagens =
    details.ImagemLocacaos?.map((imagem: any) => ({
      id: imagem.id,
      url: `${API_URL}/${imagem.url}`,
    })) ?? [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.header}>
            <Text>4,5</Text>
            <EditButton />
            <Switch />
          </View>
        </View>
        <View style={styles.sectionsBox}>
          <SectionCard title="Info" iconComponent={Feather} iconName="info">
            <InfoItem label="Data de Início" value={details.dt_Inicio} />
            <InfoItem label="Data Final" value={details.dt_Final} />
            <InfoItem label="Caução" value={""} />
            <InfoItem label="Valor Total" value={""} />
          </SectionCard>

          <SectionCard
            title="Locatário"
            iconComponent={Feather}
            iconName="user"
          >
            <InfoItem label="Nome" value={details.Cliente.nome} />
            <InfoItem label="Cpf" value={details.Cliente.cpf} />
            <InfoItem label="Telefone" value={details.Cliente.telefone} />
          </SectionCard>

          <SectionCard
            title="Veículo"
            iconComponent={Ionicons}
            iconName="car-outline"
          >
            <InfoItem label="Placa" value={details.Veiculo.placa} />
            <InfoItem label="Marca" value={details.Veiculo.Modelo.Marca.nome} />
            <InfoItem label="Modelo" value={details.Veiculo.Modelo.nome} />
          </SectionCard>

          <SectionCard
            title="Estado do Veículo"
            iconComponent={Ionicons}
            iconName="sparkles-outline"
          >
            <ImageSlider images={imagens} />
          </SectionCard>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
