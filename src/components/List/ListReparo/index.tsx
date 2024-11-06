import React, { useEffect, useState } from "react";
import styles from "../style";
import { Text, SafeAreaView, ActivityIndicator, FlatList } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import api from '../../../services/api';
import { theme } from '../../../styles/theme';

export default function ListReparo() {
    interface Reparo {
        id: number;
        Veiculo: {
            Modelo: {
                nome: string;
            };
            placa: string;
        };
        data: string; 
        custo: number;
        descricao: string;
    }

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<Reparo[]>([]);

    const dateFormat = (date: string) => {
        return new Date(date).toLocaleDateString("pt-br", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/reparos`);
                setData(response.data);
            } catch (error) {
                console.error("Erro ao buscar reparos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const renderItem = ({ item }: { item: Reparo }) => (
        <SafeAreaView style={styles.card}>
            <SafeAreaView>
                <Text style={styles.cardTitle}>{item.Veiculo.Modelo.nome}</Text>
                <Text style={styles.cardText}>Placa do veículo: {item.Veiculo.placa}</Text>
                <Text style={styles.cardText}>Data do reparo: {dateFormat(item.data)}</Text>
                <Text style={styles.cardText}>Custo do Reparo: R$ {item.custo}</Text>
                <Text style={styles.cardText}>Descrição: {item.descricao}</Text>
            </SafeAreaView>
        </SafeAreaView>
    );

    return (
        <SafeAreaView style={styles.listContainer}>
            {isLoading ? (
                <ActivityIndicator size="large" color={theme.colors.gray[800]} />
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    numColumns={1}
                />
            )}
        </SafeAreaView>
    );
}
