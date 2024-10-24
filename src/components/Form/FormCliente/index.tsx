import React from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { clienteSchema } from "../../../schemas/clienteSchemas";

import { FormInputController } from "../../../controllers/FormInputController";
import FormButton from "../../Button/FormButton";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from "expo-router";

import styles from "../style";

// Define a interface para o tipo de dados do formulário
interface ClienteFormData {
  nome: string;
  estado_civil: string;
  profissao: string;
  rg: string;
  cpf: string;
  email: string;
  telefone: string;
  rua: string;
  numero: string;
  bairro: string;
  complemento?: string;
  cidade: string;
  cep: string;
}

export function FormCliente() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(clienteSchema),
  });
  const navigation = useNavigation()

  // Função chamada no envio do formulário
  function handleCadastroCliente(data: ClienteFormData) {
    console.log(data);
    reset()
  }

  return (
    <ScrollView className="w-full flex-1 bg-slate-100 p-5">
      <View style={styles.formContainer}>
        <View style={styles.formTitle}>
          <TouchableOpacity style={styles.boxButtonIcon} onPress={()=> navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={25} color="black" />
          </TouchableOpacity>
          <Text style={styles.formTitleText}> Cadastrar Cliente </Text>
        </View>
        <FormInputController
          control={control}
          name={"nome"}
          label={"Nome Completo"}
          errors={errors}
          placeholder="João da Silva"
        />

        <FormInputController
          control={control}
          name={"estado_civil"}
          label={"Estado Civil"}
          errors={errors}
          placeholder="Casado"
        />

        <FormInputController
          control={control}
          name={"profissao"}
          label={"Profissão"}
          errors={errors}
          placeholder="Motoboy"
        />
        <FormInputController
          control={control}
          name={"rg"}
          label={"RG"}
          errors={errors}
          keyboardType="numeric"
        />
        <FormInputController
          control={control}
          name={"cpf"}
          label={"CPF"}
          errors={errors}
          keyboardType="numeric"
          maskType="cpf"
          placeholder="XXX.XXX.XXX-XX"
        />
        <FormInputController
          control={control}
          name={"email"}
          label={"Email"}
          errors={errors}
          placeholder="nome@exemplo.com"
        />
        <FormInputController
          control={control}
          name={"telefone"}
          label={"Telefone"}
          errors={errors}
          placeholder="(11) 99999-9999"
          keyboardType="numeric"
          maskType="cel-phone" // Máscara de telefone
          maskOptions={{
            maskType: "BRL",
            withDDD: true,
            dddMask: "(99) ",
          }}
        />
        <FormInputController
          control={control}
          name={"rua"}
          label={"Rua"}
          errors={errors}
          placeholder="Ex.: Rua das Flores"
        />
        <FormInputController
          control={control}
          name={"numero"}
          label={"Nº"}
          errors={errors}
          placeholder="Ex.: 123"
        />
        <FormInputController
          control={control}
          name={"bairro"}
          label={"Bairro"}
          errors={errors}
          placeholder="Ex.: Centro"
        />
        <FormInputController
          control={control}
          name={"complemento"}
          label={"Complemento (opcional)"}
          errors={errors}
          placeholder="Ex.: Próximo a quadra poliesportiva"
        />
        <FormInputController
          control={control}
          name={"cidade"}
          label={"Cidade"}
          errors={errors}
          placeholder="Ex.: São Luís"
        />
        <FormInputController
          control={control}
          name={"cep"}
          label={"CEP"}
          errors={errors}
          keyboardType="numeric"
          placeholder="Ex.: 12345-678"
        />
        <FormButton
          label="Salvar"
          onPress={handleSubmit(handleCadastroCliente)}
        />
      </View>
    </ScrollView>
  );
}
