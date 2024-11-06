import React, { useState } from "react";
import {
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "expo-router";
import api from "../../../services/api";

import FormButton from "../../Button/FormButton";
import { FormInputController } from "../../../controllers/FormInputController";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import styles from "../style";
import { reparoSchema } from "../../../schemas/reparoSchemas";

interface ReparoFormData {
  placaVeiculo: string;
  data: string;
  custo: string;
  descricao: string;
}

export default function FormReparos() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReparoFormData>({
    resolver: yupResolver(reparoSchema),
  });

  // variáveis relacionadas ao DatePicker
  const [openInicio, setOpenInicio] = useState(false);
  const [openFinal, setOpenFinal] = useState(false);

  const today = new Date();
  today.setDate(today.getDate() + 1);
  const startDate = getFormatedDate(today);

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  async function handleCadastroReparo(dados: ReparoFormData) {
    setLoading(true);
    try {
      const veiculoResponse = await api.get(
        `/veiculos/buscar-placa/${dados.placaVeiculo}`
      );

      const formData = {
        id_veiculo: veiculoResponse.data.id,
        data: dados.data,
        custo: dados.custo.replace("R$ ", "").replace(",", ".").trim(),
        descricao: dados.descricao.trim(),
      };

      console.log("FormData Enviado:", JSON.stringify(formData));

      const response = await api.post("/reparos/cadastrar", formData );

      if (response.status === 201) {
        Alert.alert("Sucesso", "Reparo adicionado com sucesso!");
        navigation.goBack();
      } else {
        Alert.alert("Erro", "Não foi possível adicionar o reparo.");
      }
    } catch (error) {
      console.error("Erro ao adicionar o reparo:", error);

      Alert.alert(
        "Erro",
        "Ocorreu um erro ao adicionar o reparo. Tente novamente."
      );
    } finally {
      setLoading(false);
    }

    console.log(dados);
    reset();
  }

  return (
    <SafeAreaView style={styles.formContainer}>
      <ScrollView>
        <FormInputController
          control={control}
          name={"placaVeiculo"}
          label={"Placa do veículo"}
          errors={errors}
          placeholder="XXX9X99"
          maskType="custom"
          maskOptions={{
            mask: "AAA9A99",
          }}
        />
        <Controller
          control={control}
          name="data"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <TouchableOpacity onPress={() => setOpenInicio(true)}>
                <Text>{value || "Selecionar a Data da Manutenção"}</Text>
              </TouchableOpacity>

              {error && <Text style={{ color: "red" }}>{error.message}</Text>}

              <Modal
                animationType="slide"
                transparent={true}
                visible={openInicio}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <DatePicker
                      mode="calendar"
                      selected={value}
                      minimumDate={startDate}
                      onDateChange={(date) => {
                        console.log(typeof date);
                        console.log(`Data Selecionada: ${date}`);
                        onChange(date);
                        setOpenInicio(false);
                      }}
                      locale="pt-br"
                    />
                    <TouchableOpacity onPress={() => setOpenInicio(false)}>
                      <Text>Fechar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </>
          )}
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
            precision: 2, // Duas casas decimais
            separator: ",", // Separador de casas decimais
            delimiter: ".", // Delimitador de milhares
            unit: "R$ ", // Símbolo da moeda
            suffixUnit: "", // Sufixo (pode deixar vazio)
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
          onPress={handleSubmit(handleCadastroReparo)}
          disabled={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
