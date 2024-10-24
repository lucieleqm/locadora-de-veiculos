import React from "react";
import {SafeAreaView, ScrollView, Text,TouchableOpacity} from 'react-native'
import styles from "../style";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface ClienteFormData {
    placa_moto: string;
    tipo_moto: string;
    data: string;
    custo: string;
    descricao: string;
  }

export default function FormReparos(){
    return (
        <ScrollView className="w-full flex-1 bg-slate-100 p-5">
            <SafeAreaView style={styles.formContainer}>
                <SafeAreaView style={styles.formTitle}>
                    <TouchableOpacity style={styles.boxButtonIcon}  
                                      >
                        <MaterialIcons name="arrow-back-ios" size={25} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.formTitleText}>Adicionar Reparo</Text>
                </SafeAreaView>
            </SafeAreaView>
        </ScrollView>
    )
}
