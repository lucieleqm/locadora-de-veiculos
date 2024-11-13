import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Image
} from "react-native";
import { Feather } from "@expo/vector-icons";
import EditButton from "../../Button/EditButton";
import api from "../../../services/api";
import { theme } from "../../../styles/theme";
import { InfoItem, SectionCard } from "../common";
import styles from "../common/style";
import { ImageSlider } from "../../Image/ImageSlider";
import { API_URL } from "@env";
import { useFocusEffect } from "expo-router";

interface VeiculoDetailsData {
  id: string;
}

export function VeiculoDetails({ id }: VeiculoDetailsData) {
  const [isLoading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>(null);

  const fetchDetails = async () => {
    try {
      console.log();
      const response = await api.get(`veiculos/${id}`);
      console.log("Dados recebidos:", response.data);
      setDetails(response.data);
    } catch (error) {
      console.error("Erro ao buscar veículos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      fetchDetails();
    }, [])
  );


  if (isLoading) {
    return <ActivityIndicator size="large" color={theme.colors.gray[800]} />;
  }
  if (!details) {
    console.log(id);
    return <Text>Detalhes não encontrados</Text>;
  }

  const imagens = details.ImagemVeiculos?.map((imagem: any) => ({ 
    id: imagem.id, 
    url: `${API_URL}/${imagem.url}`
  })) ?? [];
  console.log("imagens:", imagens)

  const disponibilidadeTexto = details.locado ? "Locado" : "Livre";
  const disponibilidadeCor = details.locado ? "red" : "green";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        <ImageSlider images={imagens} />
        
        <View>
          <View style={styles.header}>
            <Text style={styles.titleDetails}>
              {details.Modelo.Marca.nome} {details.Modelo.nome}
            </Text>
            <EditButton id={id}  path="/details/info-veiculo"/>
          </View>
        </View>

        <SectionCard
          title="Disponibilidade"
          iconComponent={Feather}
          iconName="check-circle"
        >
          <Text style={{ color: disponibilidadeCor, fontWeight: "bold" }}>
            {disponibilidadeTexto}
          </Text>
        </SectionCard>

        <SectionCard
          title="Ficha Técnica"
          iconComponent={Feather}
          iconName="settings"
        >
          <InfoItem label="Marca" value={details.Modelo.Marca.nome} />
          <InfoItem label="Modelo" value={details.Modelo.nome} />
          <InfoItem label="Ano" value={details.ano} />
          <InfoItem label="Motor" value={details.motor} />
          <InfoItem label="Combustível" value={details.Combustivel.tipo} />
          <InfoItem label="Cor" value={details.Cor.cor} />
          <InfoItem label="Preço" value={details.valor} />
        </SectionCard>

        <SectionCard
          title="Documentação"
          iconComponent={Feather}
          iconName="file-text"
        >
          <InfoItem label="Placa" value={details.placa} />
          <InfoItem label="Renavam" value={details.renavam} />
          <InfoItem label="Chassi" value={details.chassi} />
        </SectionCard>
      </ScrollView>
    </SafeAreaView>
  );
}
