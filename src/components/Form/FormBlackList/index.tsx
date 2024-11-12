import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, Alert } from "react-native";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { blacklistSchema } from "src/schemas/blacklistSchema";
import { FormInputController } from "../../../controllers/FormInputController";
import FormButton from "../../Button/FormButton";

import { useNavigation } from "expo-router";
import styles from "../style";
import api from "../../../services/api";

interface BlackListFormData{
    cpf: string;
    nome: string;
    motivo: string;
}

export function FormBlackList(){
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(blacklistSchema),
      });

    const navigation = useNavigation()
    const [loading, setLoading] = useState(false);

    // Função chamada no envio do formulário
    async function CadastroBlackList(dados: BlackListFormData) {
        setLoading(true); // Ativa o estado de carregamento

        try {
            const formData = {
              cpf: dados.cpf,
              nome: dados.nome,
              motivo: dados.motivo
            };
      
            console.log("FormData Enviado:", JSON.stringify(formData));
      
            const response = await api.post("/blacklists/cadastrar", formData );
      
            if (response.status === 201) {
              Alert.alert("Sucesso", "Infrator adicionado com sucesso!");
              navigation.goBack();
            } else {
              Alert.alert("Erro", "Não foi possível adicionar o infrator.");
            }
          } catch (error) {
            console.error("Erro ao adicionar o infrator:", error);
      
            Alert.alert(
              "Erro",
              "Ocorreu um erro ao adicionar o infrator. Tente novamente."
            );
          } finally {
            setLoading(false);
          }
      
          console.log(dados);
          reset();
        }

    return(
        <ScrollView>
            <View style={styles.formContainer}>
            <FormInputController
                control={control}
                name={"nome"}
                label={"Nome Completo *"}
                errors={errors}
                placeholder="João da Silva"
            />
            <FormInputController
                control={control}
                name={"cpf"}
                label={"CPF *"}
                errors={errors}
                keyboardType="numeric"
                maskType="cpf"
                placeholder="XXX.XXX.XXX-XX"
            />
            <FormInputController
                control={control}
                name={"motivo"}
                label={"Infração *"}
                errors={errors}
                placeholder="Ex.: Recusou o bafômetro"
            />
            <FormButton
                label="Salvar"
                onPress={handleSubmit(CadastroBlackList)}
                disabled={loading}
            />
            </View>
        </ScrollView>
    )
}