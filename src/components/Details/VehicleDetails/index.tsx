import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import DeleteButton from "src/components/Button/DeleteButton";
import api from "../../../services/api";
import { theme } from "../../../styles/theme";
import { InfoItem, SectionCard } from "../common";
import styles from "../common/style";
import { ImageSlider } from "../../Image/ImageSlider";
import { API_URL } from "@env";
import { useRouter } from "expo-router";

interface VeiculoDetailsData {
  id: string;
}

export function VeiculoDetails({ id }: VeiculoDetailsData) {
  const [isLoading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>(null);
  const [associado, setAssociado] = useState(false); // Adicionando estado para verificar se o veículo está associado

  // Obtendo o roteador do expo-router
  const router = useRouter();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await api.get(`veiculos/${id}`);
        setDetails(response.data);
        checkAssociations(response.data); // Verifica as associações após obter os detalhes
      } catch (error) {
        console.error("Erro ao buscar veículo:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  // Função para verificar se o veículo está associado a locação ou reparo
  const checkAssociations = async (veiculo: any) => {
    try {
      // Verificando se o veículo tem locações associadas
      const locacaoResponse = await api.get(`locacoes?veiculo_id=${veiculo.id}`);
      if (locacaoResponse.data.length > 0) {
        setAssociado(true); // Se tiver locação, setar associado como true
        return;
      }

      // Verificando se o veículo tem reparos associados
      const reparoResponse = await api.get(`reparos?veiculo_id=${veiculo.id}`);
      if (reparoResponse.data.length > 0) {
        setAssociado(true); // Se tiver reparo, setar associado como true
        return;
      }

      setAssociado(false); // Se não tiver locação ou reparo, permitir a exclusão
    } catch (error) {
      console.error("Erro ao verificar associações:", error);
    }
  };

  // Função para deletar o veículo
  const handleDelete = async () => {
    if (associado) {
      Alert.alert("Erro", "Não é possível deletar o veículo porque ele está associado a uma locação ou reparo.");
      return;
    }

    try {
      await api.delete(`veiculos/${id}`);
      Alert.alert("Sucesso", "Veículo deletado com sucesso!");
      router.back(); // Utilizando router.back() em vez de navigation.goBack()
    } catch (error) {
      console.error("Erro ao deletar veículo:", error);
      Alert.alert("Erro", "Não foi possível deletar o veículo.");
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color={theme.colors.gray[800]} />;
  }

  if (!details) {
    return <Text>Detalhes não encontrados</Text>;
  }

  const imagens =
    details.ImagemVeiculos?.map((imagem: any) => ({
      id: imagem.id,
      url: `${API_URL}/${imagem.url}`,
    })) ?? [];
  const disponibilidadeTexto = details.locado ? "Locado" : "Livre";
  const disponibilidadeCor = details.locado ? "red" : "green";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageSlider images={imagens} />

        {/* Cabeçalho com o botão de deletar */}
        <View style={styles.header}>
          <Text>
            {details.Modelo.Marca.nome} {details.Modelo.nome}
          </Text>
          {/* Utilizando o DeleteButton com a função handleDelete */}
          <DeleteButton onDelete={handleDelete} />
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