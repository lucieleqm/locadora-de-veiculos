import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import EditButton from "../../Button/EditButton";
import api from "../../../services/api";
import { theme } from "../../../styles/theme";
import styles from "../common/style";

interface ReparoDetailsData {
  id: string;
}

export function ReparoDetails({ id }: ReparoDetailsData) {
  const [isLoading, setLoading] = useState(true);
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        console.log();
        const response = await api.get(`/reparos/buscarPorId/${id}`);
        setDetails(response.data);
      } catch (error) {
        console.error("Erro ao buscar reparo:", error);
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

  return (
    <View style={styles.container}>
    </View>
  );
}
