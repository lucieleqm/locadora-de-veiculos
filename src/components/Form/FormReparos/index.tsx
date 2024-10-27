import React from "react";
import {SafeAreaView, ScrollView, Text,TouchableOpacity} from 'react-native'

import styles from "../style";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useNavigation } from "expo-router";

import FormButton from "../../Button/FormButton"
import { FormInputController } from "../../../controllers/FormInputController";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { clienteSchema } from "../../../schemas/reparoSchemas";

interface ReparoFormData {
    placa_veiculo: string;
    tipo_veiculo: string;
    data: string;
    custo: string;
    descricao: string;
  }

export default function FormReparos(){
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(clienteSchema),
      });
      
      function handleCadastroReparo(data: ReparoFormData) {
        console.log(data);
        reset()
      }

    const navigation = useNavigation()
    return (
        <ScrollView className="w-full flex-1 bg-slate-100 p-5">
            <SafeAreaView style={styles.formContainer}>
                <SafeAreaView style={styles.formTitle}>
                    <TouchableOpacity style={styles.boxButtonIcon}  
                                      onPress={()=>navigation.goBack()}>
                        <MaterialIcons name="arrow-back-ios" size={25} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.formTitleText}>Adicionar Reparo</Text>
                </SafeAreaView>
                <FormInputController
                    control={control}
                    name={"placa_veiculo"}
                    label={"Placa do veículo"}
                    errors={errors}
                    placeholder="XXX9X99"
                    maskType="custom"
                    maskOptions={{
                        mask: 'AAA9A99'
                    }}
                    />
                <FormInputController
                    control={control}
                    name={"tipo_veiculo"}
                    label={"Modelo do veículo"}
                    errors={errors}
                    placeholder="Start 160"
                    />
                <FormInputController
                    control={control}
                    name={"data"}
                    label={"Data"}
                    errors={errors}
                    keyboardType="numeric"
                    maskType="datetime"
                    placeholder="09/07/2024"
                    maskOptions={{
                        format: 'DD/MM/YYYY'
                    }}
                    />
                <FormInputController
                    control={control}
                    name={"custo"}
                    label={"Custo"}
                    errors={errors}
                    placeholder="R$ 250,00"
                    keyboardType="numeric"
                    maskType="money"
                    maskOptions={{
                        precision: 2,      // Duas casas decimais
                        separator: ',',    // Separador de casas decimais
                        delimiter: '.',    // Delimitador de milhares
                        unit: 'R$ ',        // Símbolo da moeda
                        suffixUnit: ''      // Sufixo (pode deixar vazio)
                        }}
                    />
                <FormInputController
                    control={control}
                    name={"descricao"}
                    label={"Descrição"}
                    errors={errors}
                    placeholder="Troca de óleo"
                    />
                <FormButton 
                    label="Adicionar"
                    onPress={handleSubmit(handleCadastroReparo)}>
                </FormButton>
            </SafeAreaView>
        </ScrollView>
    )
}
