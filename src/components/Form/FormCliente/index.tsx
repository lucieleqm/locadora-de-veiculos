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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(clienteSchema),
  });
  const navigation = useNavigation()

  // Função chamada no envio do formulário
  function handleCadastroCliente(data: ClienteFormData) {
    console.log(data);
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
        />

        <FormInputController
          control={control}
          name={"estado_civil"}
          label={"Estado Civil"}
          errors={errors}
        />

        <FormInputController
          control={control}
          name={"profissao"}
          label={"Profissão"}
          errors={errors}
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
        />
        <FormInputController
          control={control}
          name={"email"}
          label={"Email"}
          errors={errors}
        />
        <FormInputController
          control={control}
          name={"telefone"}
          label={"Telefone"}
          errors={errors}
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
        />
        <FormInputController
          control={control}
          name={"numero"}
          label={"Nº"}
          errors={errors}
        />
        <FormInputController
          control={control}
          name={"bairro"}
          label={"Bairro"}
          errors={errors}
        />
        <FormInputController
          control={control}
          name={"complemento"}
          label={"Complemento"}
          errors={errors}
        />
        <FormInputController
          control={control}
          name={"cidade"}
          label={"Cidade"}
          errors={errors}
        />
        <FormInputController
          control={control}
          name={"cep"}
          label={"CEP"}
          errors={errors}
          keyboardType="numeric"
        />
        <FormButton
          label="Salvar"
          onPress={handleSubmit(handleCadastroCliente)}
        />
      </View>
    </ScrollView>
  );
}
